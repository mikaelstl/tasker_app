import { useEffect, useMemo, useState } from "react";
import { ContentHeader } from "@/components/base/ContentHeader";
import { MemberCard } from "@/components/cards/MemberCard";
import { CreateButton } from "@/components/buttons/CreateButton";
import { Text } from "@/components/base/Text";
import { InviteMemberPopup } from "@/components/popups/InviteMember";
import { useOrganization } from "@/hooks/useOrganization";
import { useServices } from "@/hooks/useServices";
import { Toasts } from "@/maps/toasts";
import type { AffiliationDTO } from "@/service/types/affiliation/affiliation.dto";
import type { UserOrganizationSummaryDTO } from "@/service/types/affiliation/summary.dto";
import type { ApiError } from "@/service/types/response/error";
import { OrgRole } from "@/utils/enums/OrgRole";
import { FolderOpenIcon, UserGroupIcon, UserPlusIcon } from "@heroicons/react/16/solid";
import {
  Container,
  Content,
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

const ROLE_ORDER = [OrgRole.OWNER, OrgRole.MANAGER, OrgRole.MEMBER] as const;

const ROLE_TITLES: Record<OrgRole, string> = {
  [OrgRole.OWNER]: "Proprietário",
  [OrgRole.MANAGER]: "Gestores",
  [OrgRole.MEMBER]: "Membros",
};

function notifyError(error: unknown, fallback: string) {
  const { errors } = error as ApiError;

  if (!errors?.length) {
    Toasts.error(fallback);
    return;
  }

  errors.forEach((item) => Toasts[item.level](item.message));
}

export function Organization() {
  const { org } = useOrganization();
  const { AffiliationService } = useServices();
  const [organization, setOrganization] = useState<UserOrganizationSummaryDTO | null>(null);
  const [members, setMembers] = useState<AffiliationDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyMemberId, setBusyMemberId] = useState<string | null>(null);
  const [creatingInvite, setCreatingInvite] = useState(false);
  const [inviteLink, setInviteLink] = useState<string | null>(null);
  const [inviteModalOpen, setInviteModalOpen] = useState(false);

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
        const [organizationsResponse, membersResponse] = await Promise.all([
          AffiliationService.list(),
          AffiliationService.listByOrganization(org.orgkey),
        ]);
        const currentOrganization = organizationsResponse.data.find(
          (item) => item.orgkey === org.orgkey,
        ) ?? null;

        if (active) {
          setOrganization(currentOrganization);
          setMembers(membersResponse.data);
        }
      } catch (error) {
        notifyError(error, "Não foi possível carregar a organização.");
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
  }, [AffiliationService, org?.orgkey]);

  const membersByRole = useMemo(() => (
    ROLE_ORDER.map((role) => ({
      role,
      members: members.filter((member) => member.role === role),
    }))
  ), [members]);

  const isOwner = org?.role === OrgRole.OWNER;

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
      Toasts.info(action === "promote" ? "Membro promovido a gestor." : "Gestor rebaixado a membro.");
    } catch (error) {
      notifyError(error, "Não foi possível alterar o papel do participante.");
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
      Toasts.info("Participante removido da organização.");
    } catch (error) {
      notifyError(error, "Não foi possível remover o participante.");
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
      Toasts.info("Link de convite criado.");
    } catch (error) {
      notifyError(error, "Não foi possível criar o convite.");
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
      Toasts.info("Link de convite copiado.");
    } catch {
      Toasts.warning("Não foi possível copiar automaticamente. Selecione o link e copie manualmente.");
    }
  };

  return (
    <Container className="organization-content">
      <ContentHeader title={organization?.name ?? "Organização"}>
        {organization && (
          <HeaderStats aria-label="Resumo da organização">
            <HeaderStat>
              <UserGroupIcon />
              <Subtitle>{members.length} membros</Subtitle>
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
            <EmptyMessage>Esta organização ainda não possui participantes.</EmptyMessage>
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
