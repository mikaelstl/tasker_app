import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowPathIcon,
  CalendarDaysIcon,
  ExclamationTriangleIcon,
  HomeIcon,
  ShieldCheckIcon,
  UserPlusIcon,
} from "@heroicons/react/16/solid";
import { DateTime } from "luxon";
import { Logo } from "@/components/images/Logo";
import { useAuth } from "@/hooks/useAuth";
import { useOrganization } from "@/hooks/useOrganization";
import { useServices } from "@/hooks/useServices";
import {
  clearPendingInviteToken,
  savePendingInviteToken,
} from "@/config/invite";
import type { ApiError } from "@/service/types/response/error";
import type { OrganizationInvitePreviewResponse } from "@/service/types/affiliation/invite.dto";
import {
  Badge,
  CardActions,
  Container,
  Description,
  Heading,
  HelperText,
  Hero,
  IconBubble,
  InviteCard,
  InviteContent,
  MetaItem,
  MetaLabel,
  MetaValue,
  OrganizationName,
  PageShell,
  PrimaryButton,
  SecondaryButton,
  StatusNote,
} from "./style";

type InviteViewStatus =
  | "loading"
  | "available"
  | "needs-auth"
  | "accepting"
  | "rejecting"
  | "accepted"
  | "rejected"
  | "unavailable"
  | "error";

function formatDateTime(value: string): string {
  const date = DateTime.fromISO(value);

  if (!date.isValid) {
    return value;
  }

  return date.setLocale("pt-BR").toLocaleString(DateTime.DATETIME_MED);
}

function toUnavailableMessage(error: ApiError | null): string {
  if (!error) {
    return "Este link de convite não está mais disponível.";
  }

  if ([404, 409, 410].includes(error.status)) {
    return "Este link de convite não está mais disponível.";
  }

  if (error.status === 429) {
    return "Muitas tentativas em pouco tempo. Aguarde e tente novamente.";
  }

  return "Não foi possível carregar este convite no momento.";
}

export function AcceptInvite() {
  const navigate = useNavigate();
  const { token: rawToken } = useParams();
  const token = useMemo(() => rawToken?.trim() ?? "", [rawToken]);

  const { authenticated, authenticating } = useAuth();
  const { defineOrg } = useOrganization();
  const { AffiliationService } = useServices();

  const [status, setStatus] = useState<InviteViewStatus>("loading");
  const [invite, setInvite] = useState<OrganizationInvitePreviewResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!token) {
      clearPendingInviteToken();
      setInvite(null);
      setStatus("unavailable");
      return;
    }

    if (authenticating) {
      setStatus("loading");
      return;
    }

    let active = true;

    const previewInvite = async () => {
      setStatus("loading");

      try {
        const response = await AffiliationService.previewInvite(token);
        const preview: OrganizationInvitePreviewResponse = response.data;

        if (!active) {
          return;
        }

        if (!preview.valid) {
          clearPendingInviteToken();
          setInvite(null);
          setStatus("unavailable");
          return;
        }

        setInvite(preview);
        setStatus(authenticated ? "available" : "needs-auth");
      } catch (caughtError) {
        if (!active) {
          return;
        }

        const error = caughtError as ApiError;

        if ([404, 409, 410].includes(error.status ?? 0)) {
          clearPendingInviteToken();
          setInvite(null);
          setStatus("unavailable");
          return;
        }

        setErrorMessage(toUnavailableMessage(error));
        setStatus("error");
      }
    };

    void previewInvite();

    return () => {
      active = false;
    };
  }, [AffiliationService, authenticated, authenticating, token]);

  const handleAuthCta = (target: "/login" | "/register") => {
    if (!token) {
      navigate(target);
      return;
    }

    savePendingInviteToken(token);
    navigate(target);
  };

  const finalizeAction = async (action: "accept" | "reject") => {
    if (!invite || !token) {
      return;
    }

    setStatus(action === "accept" ? "accepting" : "rejecting");

    try {
      if (action === "accept") {
        const response = await AffiliationService.acceptInvite(token);

        defineOrg(response.data.orgkey, response.data.role);
        await AffiliationService.list();
        clearPendingInviteToken();
        setStatus("accepted");
        navigate("/home/organization", { replace: true });
        return;
      }

      await AffiliationService.rejectInvite(token);
      clearPendingInviteToken();
      setStatus("rejected");
    } catch (caughtError) {
      const error = caughtError as ApiError;

      if (error.status === 401) {
        setStatus("needs-auth");
        return;
      }

      if ([404, 409, 410].includes(error.status ?? 0)) {
        clearPendingInviteToken();
        setInvite(null);
        setStatus("unavailable");
        return;
      }

      setErrorMessage(error.errors?.[0]?.message ?? "Não foi possível concluir a ação.");
      setStatus("error");
    }
  };

  const previewDate = invite ? formatDateTime(invite.expiresAt) : null;

  return (
    <PageShell>
      <Container>
        <Hero>
          <Logo width={182} />
          <Heading>CONVITE PARA ORGANIZAÇÃO</Heading>
          <Description>
            Confira os detalhes abaixo para entrar na área de trabalho.
          </Description>
        </Hero>

        {invite && (
          <InviteCard>
            <IconBubble aria-hidden="true">
              {invite.organization.name.trim().charAt(0).toUpperCase() || "T"}
            </IconBubble>
            <InviteContent>
              <OrganizationName>{invite.organization.name}</OrganizationName>
              <MetaItem>
                <CalendarDaysIcon />
                <span>
                  <MetaLabel>Convite válido até</MetaLabel>
                  <MetaValue>{previewDate}</MetaValue>
                </span>
              </MetaItem>
            </InviteContent>
            <Badge>MEMBER</Badge>
          </InviteCard>
        )}

        {status === "loading" && (
          <StatusNote>
            <ArrowPathIcon className="spin" />
            <span>
              <strong>Verificando convite</strong>
              <HelperText>Carregando os dados da organização...</HelperText>
            </span>
          </StatusNote>
        )}

        {status === "accepted" && (
          <StatusNote>
            <ShieldCheckIcon />
            <span>
              <strong>Convite aceito</strong>
              <HelperText>Você já pode acessar a organização.</HelperText>
            </span>
          </StatusNote>
        )}

        {status === "rejected" && (
          <StatusNote>
            <ExclamationTriangleIcon />
            <span>
              <strong>Convite rejeitado</strong>
              <HelperText>Este convite não pode mais ser utilizado.</HelperText>
            </span>
          </StatusNote>
        )}

        {status === "unavailable" && (
          <StatusNote>
            <ExclamationTriangleIcon />
            <span>
              <strong>Convite indisponível</strong>
              <HelperText>Este link expirou ou já foi utilizado.</HelperText>
            </span>
          </StatusNote>
        )}

        {status === "error" && (
          <StatusNote>
            <ExclamationTriangleIcon />
            <span>
              <strong>Não foi possível carregar o convite</strong>
              <HelperText>{errorMessage}</HelperText>
            </span>
          </StatusNote>
        )}

        {(status === "available" || status === "accepting" || status === "rejecting") && invite && (
          <CardActions>
            <PrimaryButton
              type="button"
              onClick={() => void finalizeAction("accept")}
              disabled={status !== "available"}
            >
              {status === "accepting" ? "Aceitando..." : "Aceitar convite"}
            </PrimaryButton>
            <SecondaryButton
              type="button"
              onClick={() => void finalizeAction("reject")}
              disabled={status !== "available"}
            >
              {status === "rejecting" ? "Rejeitando..." : "Recusar convite"}
            </SecondaryButton>
          </CardActions>
        )}

        {status === "needs-auth" && (
          <>
            <HelperText>Entre na sua conta para aceitar este convite.</HelperText>
            <CardActions>
              <PrimaryButton type="button" onClick={() => handleAuthCta("/login")}>
                <UserPlusIcon />
                Entrar
              </PrimaryButton>
              <SecondaryButton type="button" onClick={() => handleAuthCta("/register")}>
                Criar conta
              </SecondaryButton>
            </CardActions>
          </>
        )}

        {status === "accepted" && (
          <CardActions>
            <PrimaryButton type="button" onClick={() => navigate("/home/organization", { replace: true })}>
              Ir para a organização
            </PrimaryButton>
          </CardActions>
        )}

        {status === "rejected" && (
          <CardActions>
            <PrimaryButton type="button" onClick={() => navigate("/workspaces", { replace: true })}>
              Voltar aos espaços
            </PrimaryButton>
          </CardActions>
        )}

        {status === "unavailable" && (
          <CardActions>
            <PrimaryButton type="button" onClick={() => navigate("/workspaces", { replace: true })}>
              <HomeIcon />
              Ir para o início
            </PrimaryButton>
          </CardActions>
        )}

        {status === "error" && (
          <CardActions>
            <PrimaryButton type="button" onClick={() => window.location.reload()}>
              <ArrowPathIcon />
              Tentar novamente
            </PrimaryButton>
          </CardActions>
        )}
      </Container>
    </PageShell>
  );
}
