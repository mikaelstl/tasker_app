import { Button } from "../../components/buttons/Button";
import { Content, HeaderContainer } from "./style";
import { Logo } from "../../components/images/Logo";
import { SectionTitle } from "../../components/base/SectionTitle";
import { useEffect, useState } from "react";
import { Toasts } from "../../maps/toasts";
import type { ApiError } from "../../service/types/response/error";
import { Scroller } from "../../components/misc/Scroller";
import { useNavigate } from "react-router-dom";
import { OrganizationCard } from "../../components/cards/OrganizationCard";
import type { UserOrganizationSummaryDTO } from "../../service/types/affiliation/summary.dto";
import { useServices } from "../../hooks/useServices";

// VIRAR TELA PROPRIA

export function ChoseWorkspace() {
  const navigate = useNavigate();

  const { AffiliationService } = useServices();
  
  const [workspaces, setWorkspaces] = useState<UserOrganizationSummaryDTO[]>([]);
  const loadOrgs = async () => {
    try {
      const response = await AffiliationService.list();

      const data = response.data;
      

      if (data.length === 0) {
        Toasts['warning']("You don't participates or have organizations. Please create a organization.");
        navigate('/register');
        return;
      }

      setWorkspaces(data);
    } catch (error) {
      const { errors } = error as ApiError;

      errors?.forEach(
        err => {
          const notify = Toasts[err.level];
          notify(err.message);
        }
      )
    }
  }

  useEffect(() => {
    loadOrgs();
  }, [])

  return (
    <Content>
      <HeaderContainer className="tskr-stage-header-container">
        <Logo width={182} />
        <SectionTitle>CHOSE WORKSPACE</SectionTitle>
      </HeaderContainer>
      <Scroller className="tskr-workspaces vertical">
        {
          workspaces.map(
            workspace => <OrganizationCard key={workspace.orgkey} name={workspace.name} members={workspace.members} projects={workspace.projects}/>
          )
        }
      </Scroller>
      <Button onClick={() => console.log("Chosed")}>Chose</Button>
    </Content>
  )
}
