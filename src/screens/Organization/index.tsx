import { useEffect, useMemo, useState } from "react";
import { ContentHeader } from "@/components/base/ContentHeader";
import { MemberCard } from "@/components/cards/MemberCard";
import { CreateButton } from "@/components/buttons/CreateButton";
import { Text } from "@/components/base/Text";
import { InviteMemberPopup } from "@/components/popups/InviteMember";
import { useOrganization } from "@/hooks/useOrganization";
import { useServices } from "@/hooks/useServices";
import { useToast, type ToastNotifications } from "@/hooks/useToast";
import type { AffiliationDTO } from "@/service/types/affiliation/affiliation.dto";
import type { ApiError } from "@/service/types/response/error";
import { OrgRole } from "@/utils/enums/OrgRole";
import { FolderOpenIcon, UserGroupIcon, UserPlusIcon } from "@/components/icons/heroicons";
import {
  Container,
  Content,
  DeleteDialog,
  DeleteDialogActions,
  DeleteDialogPrimaryButton,
  DeleteDialogHeader,
  DeleteDialogMessage,
  DeleteDialogSecondaryButton,
  DeleteDialogTitle,
  DeleteOverlay,
  EmptyMessage,
  GroupCount,
  GroupHeader,
  GroupTitle,
  HeaderStat,
  HeaderStats,
  MemberGrid,
  RoleGroup,
} from "./style";
import { Subtitle } from "@/components/base/Subtitle";
import { DeleteBtn } from "@/components/buttons/DeleteBtn";
import { useNavigate } from "react-router-dom";
import type { OrganizationSummaryDTO } from "@/service/types/organization/summary.dto";
import { buildInviteUrl } from "@/config/invite";

const ROLE_ORDER: OrgRole[] = [OrgRole.OWNER, OrgRole.MANAGER, OrgRole.MEMBER];

function roleTitle(role: OrgRole): string {
  switch (role) {
    case OrgRole.OWNER: return "Proprietário";
    case OrgRole.MANAGER: return "Gestores";
    case OrgRole.MEMBER:
    default:
      return "Membros";
  }
}

function notifyError(
  error: unknown,
  fallback: string,
  notifications: ToastNotifications,
) {
  const { errors } = error as ApiError;

  if (!errors?.length) {
    notifications.error(fallback);
    return;
  }

  errors.forEach((item) => notifications[item.level](item.message));
}

export function Organization() {
  const navigate = useNavigate();
  const { org, clearOrg } = useOrganization();
  const { AffiliationService, OrganizationService } = useServices();
  const notifications = useToast();
  
  const [organization, setOrganization] = useState<OrganizationSummaryDTO | null>(null);
  const [members, setMembers] = useState<AffiliationDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyMemberId, setBusyMemberId] = useState<string | null>(null);
  const [creatingInvite, setCreatingInvite] = useState(false);
  const [inviteLink, setInviteLink] = useState<string | null>(null);
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [deletingOrganization, setDeletingOrganization] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  useEffect(() => {
    if (!deleteModalOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !deletingOrganization) {
        setDeleteModalOpen(false);
      }
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [deletingOrganization, deleteModalOpen]);

  useEffect(() => {
    let active = true;

    const loadOrganization = async () => {
      if (!org?.orgkey) {
        setOrganization(null);
        setMembers([]);
        setLoading(false);
        return;
      }

      setOrganization(null);
      setMembers([]);
      setLoading(true);

      try {
        const membersResponse = await AffiliationService.listByOrganization(org.orgkey);

        const organizationResponse = await OrganizationService.summary(org.orgkey);
        
        if (active) {
          setOrganization(organizationResponse.data);
          // O backend não publica uma rota para listar as afiliações de uma
          // organização. Não inventamos GET /affiliations/:orgkey aqui.
          setMembers(membersResponse.data);
        }
      } catch (error) {
        notifyError(error, "Não foi possível carregar a organização.", notifications);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    void loadOrganization();

    return () => {
      active = false;
    };
  }, [AffiliationService, OrganizationService, notifications, org?.orgkey]);

  const membersByRole = useMemo(() => (
    ROLE_ORDER.map((role) => ({
      role,
      members: members.filter((member) => member.role === role),
    }))
  ), [members]);

  const isOwner = org?.role === OrgRole.OWNER;

  const deleteOrganization = async () => {
    if (!org?.orgkey || !organization) return;
    setDeletingOrganization(true);
    try {
      await OrganizationService.delete(org.orgkey);
      clearOrg();
      notifications.info("Organização excluída.");
      setDeleteModalOpen(false);
      navigate("/workspaces", { replace: true });
    } catch (error) {
      notifyError(error, "Não foi possível excluir a organização.", notifications);
    } finally {
      setDeletingOrganization(false);
    }
  };

  const changeMemberRole = async (
    member: AffiliationDTO,
    action: "promote" | "demote",
  ) => {
    setBusyMemberId(member.id);

    try {
      if (action === "promote") {
        await AffiliationService.promote(member.id);
      } else {
        await AffiliationService.demote(member.id);
      }

      setMembers((current) => current.map((item) => (
        item.id === member.id
          ? {
              ...item,
              role: action === "promote" ? OrgRole.MANAGER : OrgRole.MEMBER,
            }
          : item
      )));
      notifications.info(action === "promote" ? "Membro promovido a gestor." : "Gestor rebaixado a membro.");
    } catch (error) {
      notifyError(error, "Não foi possível alterar o papel do participante.", notifications);
    } finally {
      setBusyMemberId(null);
    }
  };

  const removeMember = async (member: AffiliationDTO) => {
    const memberName = member.user?.name ?? member.userkey;

    if (!window.confirm(`Remover ${memberName} da organização?`)) {
      return;
    }

    setBusyMemberId(member.id);

    try {
      await AffiliationService.delete(member.id);
      setMembers((current) => current.filter((item) => item.id !== member.id));
      notifications.info("Participante removido da organização.");
    } catch (error) {
      notifyError(error, "Não foi possível remover o participante.", notifications);
    } finally {
      setBusyMemberId(null);
    }
  };

  const createInvite = async () => {
    if (!org?.orgkey) return;

    setCreatingInvite(true);

    try {
      const response = await AffiliationService.createInvite(org.orgkey);
      setInviteLink(buildInviteUrl(response.data.token));
      notifications.info("Link de convite criado.");
    } catch (error) {
      notifyError(error, "Não foi possível criar o convite.", notifications);
    } finally {
      setCreatingInvite(false);
    }
  };

  const openInviteModal = () => {
    setInviteModalOpen(true);

    if (!inviteLink) {
      void createInvite();
    }
  };

  const copyInvite = async () => {
    if (!inviteLink) return;

    try {
      await navigator.clipboard.writeText(inviteLink);
      notifications.info("Link de convite copiado.");
    } catch {
      notifications.warning("Não foi possível copiar automaticamente. Selecione o link e copie manualmente.");
    }
  };

  return (
    <Container className="organization-content">
      <ContentHeader title={organization?.name ?? "Organização"}>
        {organization && (
          <HeaderStats aria-label="Resumo da organização">
            <HeaderStat>
              <UserGroupIcon />
              <Subtitle>{organization.members} membros</Subtitle>
            </HeaderStat>
            <HeaderStat>
              <FolderOpenIcon />
              <Subtitle>{organization.projects} projetos</Subtitle>
            </HeaderStat>
          </HeaderStats>
        )}
        {isOwner && (
          <CreateButton type="button" onClick={openInviteModal}>
            <UserPlusIcon width={16} />
            <Text>Convidar membro</Text>
          </CreateButton>
        )}
        {organization && (
          <DeleteBtn
            label={deletingOrganization ? "Excluindo..." : "Excluir organização"}
            disabled={deletingOrganization}
            onClick={() => setDeleteModalOpen(true)}
          />
        )}
      </ContentHeader>
      <Content>
        {loading ? (
          <EmptyMessage>Carregando organização...</EmptyMessage>
        ) : organization ? (
          members.length > 0 ? (
            membersByRole.map(({ role, members: roleMembers }) => (
              <RoleGroup key={role} aria-labelledby={`organization-role-${role}`}>
                <GroupHeader>
                  <GroupTitle id={`organization-role-${role}`}>
                    {roleTitle(role)}
                  </GroupTitle>
                  <GroupCount>{roleMembers.length}</GroupCount>
                </GroupHeader>

                {roleMembers.length > 0 ? (
                  <MemberGrid>
                    {roleMembers.map((member) => (
                      <MemberCard
                        key={member.id}
                        affiliationId={member.id}
                        name={member.user?.name ?? member.userkey}
                        username={member.user?.username ?? member.userkey}
                        role={member.role}
                        disabled={busyMemberId === member.id}
                        onPromote={isOwner && member.role === OrgRole.MEMBER
                          ? () => changeMemberRole(member, "promote")
                          : undefined}
                        onDemote={isOwner && member.role === OrgRole.MANAGER
                          ? () => changeMemberRole(member, "demote")
                          : undefined}
                        onRemove={isOwner && member.role !== OrgRole.OWNER
                          ? () => removeMember(member)
                          : undefined}
                      />
                    ))}
                  </MemberGrid>
                ) : (
                  <EmptyMessage>Nenhum participante com este papel.</EmptyMessage>
                )}
              </RoleGroup>
            ))
          ) : (
            <EmptyMessage>
              O resumo informa {organization.members} participante(s), mas o backend ainda não expõe a listagem de afiliações da organização.
            </EmptyMessage>
          )
        ) : (
          <EmptyMessage>Não foi possível encontrar a organização selecionada.</EmptyMessage>
        )}
      </Content>
      <InviteMemberPopup
        open={inviteModalOpen}
        inviteLink={inviteLink}
        loading={creatingInvite}
        onClose={() => setInviteModalOpen(false)}
        onCopy={copyInvite}
        onGenerate={createInvite}
      />
      {deleteModalOpen && organization && (
        <DeleteOverlay
          role="dialog"
          aria-modal="true"
          aria-labelledby="organization-delete-title"
          onMouseDown={() => {
            if (!deletingOrganization) setDeleteModalOpen(false);
          }}
        >
          <DeleteDialog onMouseDown={(event) => event.stopPropagation()}>
            <DeleteDialogHeader>
              <DeleteDialogTitle id="organization-delete-title">
                Excluir organização
              </DeleteDialogTitle>
              <DeleteDialogMessage>
                Deseja apagar definitivamente a organização {organization.name}?
                Esta ação não pode ser desfeita.
              </DeleteDialogMessage>
            </DeleteDialogHeader>

            <DeleteDialogActions>
              <DeleteDialogSecondaryButton
                type="button"
                disabled={deletingOrganization}
                onClick={() => setDeleteModalOpen(false)}
              >
                Cancelar
              </DeleteDialogSecondaryButton>
              <DeleteDialogPrimaryButton
                type="button"
                disabled={deletingOrganization}
                onClick={() => void deleteOrganization()}
              >
                {deletingOrganization ? "Excluindo..." : "Confirmar exclusão"}
              </DeleteDialogPrimaryButton>
            </DeleteDialogActions>
          </DeleteDialog>
        </DeleteOverlay>
      )}
    </Container>
  );
}
