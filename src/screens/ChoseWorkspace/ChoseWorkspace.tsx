import { Container, Content, HeaderContainer } from "./style";
import { Logo } from "../../components/images/Logo";
import { SectionTitle } from "../../components/base/SectionTitle";
import { useEffect, useState } from "react";
import { useApi } from "../../hooks/useApi";
import { Toasts } from "../../maps/toasts";
import type { ApiError } from "../../service/types/response/error";
import { Scroller } from "../../components/misc/Scroller";
import { useNavigate } from "react-router-dom";
import { OrganizationCard } from "../../components/cards/OrganizationCard";
import type { UserOrganizationSummaryDTO } from "@/service/types/affiliation/summary.dto";
import { useOrganization } from "@/hooks/useOrganization";
import { OrgRole } from "@/utils/enums/OrgRole";

// VIRAR TELA PROPRIA

export function ChoseWorkspace() {
  const navigate = useNavigate();

  const api = useApi();
  const { defineOrg } = useOrganization();

  const [affiliations, setOrgs] = useState<UserOrganizationSummaryDTO[]>([]);
  const loadOrgs = async () => {
    try {
      const response = await api.get({ route: `/affiliations` });

      const data: UserOrganizationSummaryDTO[] = response.data;

      console.log("DATA: " + data.length);


      if (data.length === 0) {
        Toasts['warning']("You don't participates or have organizations. Please create a organization.");
        navigate('/org/register');
        return;
      }

      setOrgs(data);
    } catch (error) {
      const { errors } = error as ApiError;

      errors?.forEach(
        err => {
          const notify = Toasts[err.level];
          notify(err.message);
        }
      );

      navigate('/org/register');
    }
  }

  const handleChoseWorkspace = (orgkey: string, role: OrgRole) => {
    defineOrg(orgkey, role);
    navigate('/home');
  }

  useEffect(() => {
    loadOrgs();
  }, [])

  return (
    <Container>
      <Content>
        <HeaderContainer className="tskr-stage-header-container">
          <Logo width={182} />
          <SectionTitle>CHOSE WORKSPACE</SectionTitle>
        </HeaderContainer>
        <Scroller className="tskr-workspaces vertical">
          {
            affiliations.map(
              org => (
                <OrganizationCard
                  key={org.orgkey}
                  orgkey={org.orgkey}
                  role={org.role}
                  name={org.name ?? ''}
                  members={org.members ?? 0}
                  projects={org.projects ?? 0}
                  onSelect={handleChoseWorkspace}
                />
              )
            )
          }
        </Scroller>
      </Content>
    </Container>
  )
}
