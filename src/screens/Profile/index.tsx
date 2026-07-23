import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ContentHeader } from "@/components/base/ContentHeader";
import { Subtitle } from "@/components/base/Subtitle";
import { Text } from "@/components/base/Text";
import { Title } from "@/components/base/Title";
import { CreateButton } from "@/components/buttons/CreateButton";
import { DeleteBtn } from "@/components/buttons/DeleteBtn";
import { RoleBadge } from "@/maps/role-badge";
import { useAuth } from "@/hooks/useAuth";
import { useServices } from "@/hooks/useServices";
import { useToast, type ToastNotifications } from "@/hooks/useToast";
import type { UserOrganizationSummaryDTO } from "@/service/types/affiliation/summary.dto";
import type { ApiError } from "@/service/types/response/error";
import type { UserProfileDTO } from "@/service/types/user/user.dto";
import {
  Container,
  Content,
  DangerCard,
  EmptyState,
  Identity,
  OrganizationList,
  OrganizationMeta,
  OrganizationRow,
  Section,
  Value,
} from "./style";

function notifyError(error: unknown, fallback: string, notifications: ToastNotifications) {
  const apiError = error as ApiError;
  if (!apiError.errors?.length) {
    notifications.error(fallback);
    return;
  }
  apiError.errors.forEach((item) => notifications[item.level](item.message));
}

export function Profile() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { AccountService, AffiliationService, UserService } = useServices();
  const notifications = useToast();
  const [profile, setProfile] = useState<UserProfileDTO | null>(null);
  const [organizations, setOrganizations] = useState<UserOrganizationSummaryDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  const loadProfile = useCallback(async () => {
    setLoading(true);
    try {
      const [profileResponse, organizationsResponse] = await Promise.all([
        UserService.me(),
        AffiliationService.list(),
      ]);
      setProfile(profileResponse.data);
      setOrganizations(organizationsResponse.data);
    } catch (error) {
      notifyError(error, "Não foi possível carregar o perfil.", notifications);
    } finally {
      setLoading(false);
    }
  }, [AffiliationService, UserService, notifications]);

  useEffect(() => {
    void loadProfile();
  }, [loadProfile]);

  const deleteIdentity = async () => {
    if (!profile || !window.confirm(`Excluir definitivamente a conta ${profile.email} e o perfil @${profile.username}?`)) {
      return;
    }

    setDeleting(true);
    try {
      await AccountService.delete();
      notifications.info("Conta e perfil excluídos.");
      logout();
      navigate("/login", { replace: true });
    } catch (error) {
      notifyError(error, "Não foi possível excluir sua conta.", notifications);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Container>
      <ContentHeader title="Meu perfil">
        <CreateButton type="button" onClick={() => navigate("/me/profile/edit")}>
          <Text>Editar perfil</Text>
        </CreateButton>
      </ContentHeader>

      <Content>
        <Section>
          <Title>Informações pessoais</Title>
          {loading ? (
            <EmptyState>Carregando perfil...</EmptyState>
          ) : (
            <Identity>
              <Subtitle>Nome</Subtitle>
              <Value>{profile?.name || "—"}</Value>
              <Subtitle>Usuário</Subtitle>
              <Value>@{profile?.username || "—"}</Value>
              <Subtitle>E-mail</Subtitle>
              <Value>{profile?.email || "—"}</Value>
            </Identity>
          )}
        </Section>

        <Section>
          <Title>Organizações</Title>
          <Subtitle>Organizações com as quais você possui vínculo.</Subtitle>
          {loading ? (
            <EmptyState>Carregando organizações...</EmptyState>
          ) : organizations.length === 0 ? (
            <EmptyState>Você ainda não possui vínculo com uma organização.</EmptyState>
          ) : (
            <OrganizationList>
              {organizations.map((organization) => (
                <OrganizationRow key={organization.orgkey}>
                  <div>
                    <Title>{organization.name}</Title>
                    <OrganizationMeta>
                      {organization.members} {organization.members === 1 ? "membro" : "membros"}
                      <span aria-hidden="true">•</span>
                      {organization.projects} {organization.projects === 1 ? "projeto" : "projetos"}
                    </OrganizationMeta>
                  </div>
                  {RoleBadge[organization.role]}
                </OrganizationRow>
              ))}
            </OrganizationList>
          )}
        </Section>

        <Section>
          <Title>Zona de risco</Title>
          <DangerCard>
            <div>
              <Title>Excluir conta e perfil</Title>
              <Text>
                Remove sua identidade completa. Organizações sob sua responsabilidade precisam ser
                transferidas antes da exclusão.
              </Text>
            </div>
            <DeleteBtn
              label={deleting ? "Excluindo..." : "Excluir minha conta"}
              onClick={() => void deleteIdentity()}
              disabled={deleting || !profile}
            />
          </DangerCard>
        </Section>
      </Content>
    </Container>
  );
}
