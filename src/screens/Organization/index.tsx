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
import type { UserOrganizationSummaryDTO } from "@/service/types/affiliation/summary.dto";
import type { ApiError } from "@/service/types/response/error";
import { OrgRole } from "@/utils/enums/OrgRole";
import { FolderOpenIcon, UserGroupIcon, UserPlusIcon } from "@heroicons/react/16/solid";
import {
  AddMemberForm,
  Container,
  Content,
  EmptyMessage,
  FormActions,
  FormControl,
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

const ROLE_ORDER = [OrgRole.OWNER, OrgRole.MANAGER, OrgRole.MEMBER] as const;

const ROLE_TITLES: Record<OrgRole, string> = {
  [OrgRole.OWNER]: "Proprietário",
  [OrgRole.MANAGER]: "Gestores",
  [OrgRole.MEMBER]: "Membros",
};

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
  const [organization, setOrganization] = useState<UserOrganizationSummaryDTO | null>(null);
  const [members, setMembers] = useState<AffiliationDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyMemberId, setBusyMemberId] = useState<string | null>(null);
  const [creatingInvite, setCreatingInvite] = useState(false);
  const [inviteLink, setInviteLink] = useState<string | null>(null);
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [newMemberRole, setNewMemberRole] = useState(OrgRole.MEMBER);
  const [addingMember, setAddingMember] = useState(false);
  const [deletingOrganization, setDeletingOrganization] = useState(false);

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
        const organizationsResponse = await AffiliationService.list();
        const currentOrganization = organizationsResponse.data.find(
          (item) => item.orgkey === org.orgkey,
        ) ?? null;

        if (active) {
          setOrganization(currentOrganization);
          // O backend não publica uma rota para listar as afiliações de uma
          // organização. Não inventamos GET /affiliations/:orgkey aqui.
          setMembers([]);
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
  }, [AffiliationService, notifications, org?.orgkey]);

  const membersByRole = useMemo(() => (
    ROLE_ORDER.map((role) => ({
      role,
      members: members.filter((member) => member.role === role),
    }))
  ), [members]);

  const isOwner = org?.role === OrgRole.OWNER;

  const addMember = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userkey = username.trim();
    if (!org?.orgkey || !userkey) {
      notifications.validation("Informe o username do participante.");
      return;
    }

    setAddingMember(true);
    try {
      const response = await AffiliationService.create({
        orgkey: org.orgkey,
        userkey,
        role: newMemberRole,
      });
      setMembers((current) => (
        current.some((member) => member.id === response.data.id)
          ? current
          : [...current, response.data]
      ));
      setOrganization((current) => current ? { ...current, members: current.members + 1 } : current);
      setUsername("");
      setNewMemberRole(OrgRole.MEMBER);
      notifications.info("Participante adicionado à organização.");
    } catch (error) {
      notifyError(error, "Não foi possível criar a afiliação.", notifications);
    } finally {
      setAddingMember(false);
    }
  };

  const deleteOrganization = async () => {
    if (!org?.orgkey || !organization) return;
    if (!window.confirm(`Excluir definitivamente a organização ${organization.name}?`)) return;

    setDeletingOrganization(true);
    try {
      await OrganizationService.delete(org.orgkey);
      clearOrg();
      notifications.info("Organização excluída.");
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
      setInviteLink(`${window.location.origin}/invite/${encodeURIComponent(response.data.token)}`);
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
            onClick={() => void deleteOrganization()}
          />
        )}
      </ContentHeader>
      <Content>
        {organization && (
          <>
          <AddMemberForm onSubmit={addMember}>
            <FormControl>
              <label htmlFor="affiliation-username">Username</label>
              <input
                id="affiliation-username"
                value={username}
                placeholder="ex.: ana"
                onChange={(event) => setUsername(event.target.value)}
                disabled={addingMember}
              />
            </FormControl>
            <FormControl>
              <label htmlFor="affiliation-role">Papel inicial</label>
              <select
                id="affiliation-role"
                value={newMemberRole}
                onChange={(event) => setNewMemberRole(event.target.value as OrgRole)}
                disabled={addingMember}
              >
                <option value={OrgRole.MEMBER}>Membro</option>
                <option value={OrgRole.MANAGER}>Gestor</option>
                <option value={OrgRole.OWNER}>Proprietário</option>
              </select>
            </FormControl>
            <FormActions>
              <CreateButton type="submit" disabled={addingMember || !username.trim()}>
                <UserPlusIcon width={16} />
                <Text>{addingMember ? "Adicionando..." : "Adicionar participante"}</Text>
              </CreateButton>
            </FormActions>
          </AddMemberForm>
          <EmptyMessage>
            O backend não oferece listagem completa de afiliações; novos participantes aparecem nesta sessão a partir da resposta do POST.
          </EmptyMessage>
          </>
        )}
        {loading ? (
          <EmptyMessage>Carregando organização...</EmptyMessage>
        ) : organization ? (
          members.length > 0 ? (
            membersByRole.map(({ role, members: roleMembers }) => (
              <RoleGroup key={role} aria-labelledby={`organization-role-${role}`}>
                <GroupHeader>
                  <GroupTitle id={`organization-role-${role}`}>
                    {ROLE_TITLES[role]}
                  </GroupTitle>
                  <GroupCount>{roleMembers.length}</GroupCount>
                </GroupHeader>

                {roleMembers.length > 0 ? (
                  <MemberGrid>
                    {roleMembers.map((member) => (
                      <MemberCard
                        key={member.id}
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
    </Container>
  );
}
