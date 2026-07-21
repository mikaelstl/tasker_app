import { useEffect, useMemo, useState } from "react";
import { ContentHeader } from "@/components/base/ContentHeader";
import { MemberCard } from "@/components/cards/MemberCard";
import { useOrganization } from "@/hooks/useOrganization";
import { useServices } from "@/hooks/useServices";
import { Toasts } from "@/maps/toasts";
import type { AffiliationDTO } from "@/service/types/affiliation/affiliation.dto";
import type { UserOrganizationSummaryDTO } from "@/service/types/affiliation/summary.dto";
import type { ApiError } from "@/service/types/response/error";
import { OrgRole } from "@/utils/enums/OrgRole";
import {
  Container,
  Content,
  EmptyMessage,
  GroupCount,
  GroupHeader,
  GroupTitle,
  MemberGrid,
  RoleGroup,
} from "./style";

const ROLE_ORDER = [OrgRole.OWNER, OrgRole.MANAGER, OrgRole.MEMBER] as const;

const ROLE_TITLES: Record<OrgRole, string> = {
  [OrgRole.OWNER]: "Proprietário",
  [OrgRole.MANAGER]: "Gestores",
  [OrgRole.MEMBER]: "Membros",
};

export function Organization() {
  const { org } = useOrganization();
  const { AffiliationService } = useServices();
  const [organization, setOrganization] = useState<UserOrganizationSummaryDTO | null>(null);
  const [members, setMembers] = useState<AffiliationDTO[]>([]);
  const [loading, setLoading] = useState(true);

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
        const { errors } = error as ApiError;

        errors?.forEach((item) => Toasts[item.level](item.message));
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

  return (
    <Container className="organization-content">
      <ContentHeader title={organization?.name ?? "Organização"} />
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
    </Container>
  );
}
