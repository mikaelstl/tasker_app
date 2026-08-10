import { Actions, Content, CreateOrganizationButton, HeaderContainer, WorkspaceScroller } from "./style";
import { Logo } from "../../components/images/Logo";
import { SectionTitle } from "../../components/base/SectionTitle";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/useToast";
import type { ApiError } from "../../service/types/response/error";
import { useNavigate } from "react-router-dom";
import { OrganizationCard } from "../../components/cards/OrganizationCard";
import type { UserOrganizationSummaryDTO } from "../../service/types/affiliation/summary.dto";
import { useServices } from "../../hooks/useServices";
import { useOrganization } from "../../hooks/useOrganization";
import { Separator } from "@/components/LoginForm/CreateAccount/style";
import { Divider } from "@/components/base/Divider";
import { Text } from "@/components/base/Text";

// VIRAR TELA PROPRIA

export function ChoseWorkspace() {
  const navigate = useNavigate();
  const notifications = useToast();

  const { AffiliationService } = useServices();
  const { defineOrg } = useOrganization();

  const [workspaces, setWorkspaces] = useState<UserOrganizationSummaryDTO[]>([]);
  const loadOrgs = async () => {
    try {
      const response = await AffiliationService.list();

      const data = response.data;

      if (data.length === 0) {
        notifications.warning("Você não participa nem possui organizações. Crie uma organização para continuar.");
        navigate('/org/register');
        return;
      }

      setWorkspaces(data);
    } catch (error) {
      const { errors } = error as ApiError;

      

      errors?.forEach(
        err => {
          notifications.warning(err.message);
        }
      )
    }
  }

  useEffect(() => {
    loadOrgs();
  }, [])

  const selectWorkspace = (workspace: UserOrganizationSummaryDTO) => {
    defineOrg(workspace.orgkey, workspace.role, workspace.affiliationId);
    navigate('/home');
  };

  return (
    <Content>
      <HeaderContainer className="tskr-stage-header-container">
        <Logo width={182} />
        <SectionTitle>ESCOLHA UMA ÁREA DE TRABALHO</SectionTitle>
      </HeaderContainer>
      <WorkspaceScroller className="tskr-workspaces" orientation="vertical">
        {
          workspaces.map(
            workspace => (
              <OrganizationCard
                key={workspace.orgkey}
                name={workspace.name}
                members={workspace.members}
                projects={workspace.projects}
                role={workspace.role}
                onClick={() => selectWorkspace(workspace)}
              />
            )
          )
        }
      </WorkspaceScroller>
      <Actions>
        <Separator className="tskr-saparator">
          <Divider />
          <Text>OU</Text>
          <Divider />
        </Separator>
        <CreateOrganizationButton className="tskr-create-org-btn" onClick={() => navigate("/org/register")}>
          Criar organização
        </CreateOrganizationButton>
      </Actions>
    </Content>
  )
}
