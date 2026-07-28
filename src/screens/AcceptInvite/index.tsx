import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowPathIcon,
  ExclamationTriangleIcon,
  HomeIcon,
  UserGroupIcon,
  UserPlusIcon,
  XMarkIcon,
} from "@heroicons/react/16/solid";
import { DateTime } from "luxon";
import { Logo } from "@/components/images/Logo";
import { useAuth } from "@/hooks/useAuth";
import { useOrganization } from "@/hooks/useOrganization";
import { useServices } from "@/hooks/useServices";
import {
  buildInviteUrl,
  clearPendingInviteToken,
  savePendingInviteToken,
} from "@/config/invite";
import type { ApiError } from "@/service/types/response/error";
import type { OrganizationInvitePreviewResponse } from "@/service/types/affiliation/invite.dto";
import {
  AsideCard,
  Badge,
  Card,
  CardActions,
  CardBody,
  CardFooter,
  CardHeader,
  Container,
  Description,
  Heading,
  HelperText,
  Hero,
  IconBubble,
  LinkButton,
  MetaGrid,
  MetaItem,
  MetaLabel,
  MetaValue,
  PageShell,
  PrimaryButton,
  SecondaryButton,
  SplitLayout,
  StatusNote,
} from "./style";

type InviteViewState =
  | { kind: "loading" }
  | { kind: "available"; token: string; organization: { id: string; name: string }; expiresAt: string }
  | { kind: "needs-auth"; token: string; organization: { id: string; name: string }; expiresAt: string }
  | { kind: "accepting"; token: string; organization: { id: string; name: string }; expiresAt: string }
  | { kind: "rejecting"; token: string; organization: { id: string; name: string }; expiresAt: string }
  | { kind: "accepted" }
  | { kind: "rejected" }
  | { kind: "unavailable" }
  | { kind: "error"; message: string };

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

  const [state, setState] = useState<InviteViewState>({ kind: "loading" });

  useEffect(() => {
    if (!token) {
      clearPendingInviteToken();
      setState({ kind: "unavailable" });
      return;
    }

    if (authenticating) {
      setState({ kind: "loading" });
      return;
    }

    let active = true;

    const previewInvite = async () => {
      setState({ kind: "loading" });

      try {
        const response = await AffiliationService.previewInvite(token);
        const preview: OrganizationInvitePreviewResponse = response.data;

        if (!active) {
          return;
        }

        if (!preview.valid) {
          clearPendingInviteToken();
          setState({ kind: "unavailable" });
          return;
        }

        const nextState = authenticated
          ? { kind: "available", token, organization: preview.organization, expiresAt: preview.expiresAt }
          : { kind: "needs-auth", token, organization: preview.organization, expiresAt: preview.expiresAt };

        setState(nextState);
      } catch (caughtError) {
        if (!active) {
          return;
        }

        const error = caughtError as Partial<ApiError>;

        if ([404, 409, 410].includes(error.status ?? 0)) {
          clearPendingInviteToken();
          setState({ kind: "unavailable" });
          return;
        }

        setState({
          kind: "error",
          message: toUnavailableMessage(error as ApiError),
        });
      }
    };

    void previewInvite();

    return () => {
      active = false;
    };
  }, [AffiliationService, authenticated, authenticating, token]);

  const inviteInfo = useMemo(() => {
    if (
      state.kind === "available"
      || state.kind === "needs-auth"
      || state.kind === "accepting"
      || state.kind === "rejecting"
    ) {
      return {
        organization: state.organization,
        expiresAt: state.expiresAt,
        token: state.token,
      };
    }

    return null;
  }, [state]);

  const handleAuthCta = (target: "/login" | "/register") => {
    if (!token) {
      navigate(target);
      return;
    }

    savePendingInviteToken(token);
    navigate(target);
  };

  const finalizeAction = async (action: "accept" | "reject") => {
    if (!inviteInfo) {
      return;
    }

    setState(
      action === "accept"
        ? { kind: "accepting", ...inviteInfo }
        : { kind: "rejecting", ...inviteInfo },
    );

    try {
      if (action === "accept") {
        const response = await AffiliationService.acceptInvite(inviteInfo.token);

        defineOrg(response.data.orgkey, response.data.role);
        await AffiliationService.list();
        clearPendingInviteToken();
        setState({ kind: "accepted" });
        navigate("/home/organization", { replace: true });
        return;
      }

      await AffiliationService.rejectInvite(inviteInfo.token);
      clearPendingInviteToken();
      setState({ kind: "rejected" });
    } catch (caughtError) {
      const error = caughtError as Partial<ApiError>;

      if (error.status === 401) {
        setState({ kind: "needs-auth", ...inviteInfo });
        return;
      }

      if ([404, 409, 410].includes(error.status ?? 0)) {
        clearPendingInviteToken();
        setState({ kind: "unavailable" });
        return;
      }

      setState({
        kind: "error",
        message: error.errors?.[0]?.message ?? "Não foi possível concluir a ação.",
      });
    }
  };

  const previewDate = inviteInfo ? formatDateTime(inviteInfo.expiresAt) : null;

  return (
    <PageShell>
      <Container>
        <Hero>
          <Logo width={168} />
          <Heading>Convite para organização</Heading>
          <Description>
            Acesse o convite por link, confira a organização antes de entrar e
            conclua o aceite somente com sua sessão autenticada.
          </Description>
        </Hero>

        <SplitLayout>
          <Card>
            <CardHeader>
              <IconBubble>
                <UserGroupIcon />
              </IconBubble>
              <div>
                <Badge>Link de convite</Badge>
                <Heading as="h1">
                  {state.kind === "available" || state.kind === "needs-auth" || state.kind === "accepting" || state.kind === "rejecting"
                    ? inviteInfo?.organization.name
                    : state.kind === "accepted"
                      ? "Convite aceito"
                      : state.kind === "rejected"
                        ? "Convite rejeitado"
                        : "Verificando convite"}
                </Heading>
              </div>
            </CardHeader>

            <CardBody>
              {(state.kind === "available" || state.kind === "needs-auth" || state.kind === "accepting" || state.kind === "rejecting") && inviteInfo && (
                <>
                  <Description>
                    Este convite concede acesso como <strong>MEMBER</strong> na organização abaixo.
                  </Description>

                  <MetaGrid>
                    <MetaItem>
                      <MetaLabel>Organização</MetaLabel>
                      <MetaValue>{inviteInfo.organization.name}</MetaValue>
                    </MetaItem>
                    <MetaItem>
                      <MetaLabel>Expira em</MetaLabel>
                      <MetaValue>{previewDate}</MetaValue>
                    </MetaItem>
                    <MetaItem>
                      <MetaLabel>URL</MetaLabel>
                      <MetaValue>{buildInviteUrl(inviteInfo.token)}</MetaValue>
                    </MetaItem>
                  </MetaGrid>
                </>
              )}

              {state.kind === "accepted" && (
                <StatusNote>
                  Convite aceito. Você já pode acessar a organização.
                </StatusNote>
              )}

              {state.kind === "rejected" && (
                <StatusNote>
                  Convite rejeitado. O link não pode mais ser usado nesta sessão.
                </StatusNote>
              )}

              {state.kind === "unavailable" && (
                <StatusNote>
                  Este link não está mais disponível.
                </StatusNote>
              )}

              {state.kind === "error" && (
                <StatusNote>
                  {state.message}
                </StatusNote>
              )}
            </CardBody>

            <CardFooter>
              {state.kind === "loading" && (
                <HelperText>
                  Carregando dados do convite...
                </HelperText>
              )}

              {(state.kind === "available" || state.kind === "accepting" || state.kind === "rejecting") && inviteInfo && (
                <CardActions>
                  <PrimaryButton
                    type="button"
                    onClick={() => void finalizeAction("accept")}
                    disabled={state.kind !== "available"}
                  >
                    {state.kind === "accepting" ? "Aceitando..." : "Aceitar convite"}
                  </PrimaryButton>
                  <SecondaryButton
                    type="button"
                    onClick={() => void finalizeAction("reject")}
                    disabled={state.kind !== "available"}
                  >
                    {state.kind === "rejecting" ? "Rejeitando..." : "Rejeitar convite"}
                  </SecondaryButton>
                </CardActions>
              )}

              {state.kind === "needs-auth" && (
                <CardActions>
                  <PrimaryButton type="button" onClick={() => handleAuthCta("/login")}>
                    <UserPlusIcon width={16} />
                    Entrar
                  </PrimaryButton>
                  <SecondaryButton type="button" onClick={() => handleAuthCta("/register")}>
                    Criar conta
                  </SecondaryButton>
                </CardActions>
              )}

              {state.kind === "accepted" && (
                <CardActions>
                  <PrimaryButton type="button" onClick={() => navigate("/home/organization", { replace: true })}>
                    Ir para a organização
                  </PrimaryButton>
                </CardActions>
              )}

              {state.kind === "rejected" && (
                <CardActions>
                  <PrimaryButton type="button" onClick={() => navigate("/workspaces", { replace: true })}>
                    Voltar aos espaços
                  </PrimaryButton>
                </CardActions>
              )}

              {state.kind === "unavailable" && (
                <CardActions>
                  <PrimaryButton type="button" onClick={() => navigate("/workspaces", { replace: true })}>
                    <HomeIcon width={16} />
                    Ir para início
                  </PrimaryButton>
                </CardActions>
              )}

              {state.kind === "error" && (
                <CardActions>
                  <PrimaryButton type="button" onClick={() => window.location.reload()}>
                    <ArrowPathIcon width={16} />
                    Tentar novamente
                  </PrimaryButton>
                </CardActions>
              )}
            </CardFooter>
          </Card>

          <AsideCard>
            <IconBubble>
              <ExclamationTriangleIcon />
            </IconBubble>
            <Heading as="h2">Fluxo seguro</Heading>
            <Description>
              O token fica apenas nesta rota e, se você precisar autenticar,
              ele é guardado temporariamente em `sessionStorage` até voltar ao convite.
            </Description>
            <HelperText>
              Depois do aceite, a lista de organizações é atualizada e a organização ativa é definida com o vínculo recém-criado.
            </HelperText>
            <LinkButton
              type="button"
              onClick={() => navigate("/login")}
            >
              <XMarkIcon width={16} />
              Sair do fluxo
            </LinkButton>
          </AsideCard>
        </SplitLayout>
      </Container>
    </PageShell>
  );
}
