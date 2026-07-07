import { useEffect, useState } from "react";
import type { ApiError } from "../../service/types/response/error";
import { useNavigate } from "react-router-dom";
import type { UserOrganizationSummaryDTO } from "@/service/types/affiliation/summary.dto";
import { useOrganization } from "@/hooks/useOrganization";
import { OrgRole } from "@/utils/enums/OrgRole";
import { useServices } from "@/hooks/useServices";
import { LogoIcon } from "@/components/images/logo-icon";
import Scroller from "@/components/misc/scroller";
import { OrganizationCard } from "@/components/cards/OrganizationCard";
import { toast } from "sonner";

// VIRAR TELA PROPRIA

export function ChoseWorkspace() {
  const navigate = useNavigate();
  const { AffiliationService } = useServices();

  const { defineOrg } = useOrganization();

  const [affiliations, setOrgs] = useState<UserOrganizationSummaryDTO[]>([]);
  const loadOrgs = async () => {
    try {
      const response = await AffiliationService.list();
      const data = response.data;

      console.log("DATA: " + data.length);


      if (data.length === 0) {
        toast.warning("You don't participates or have organizations. Please create a organization.");
        navigate('/org/register');
        return;
      }

      setOrgs(data);
    } catch (error) {
      const { errors } = error as ApiError;

      errors?.forEach(
        err => {
          toast.warning(err.message);
        }
      );

      navigate('/');
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
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p- md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="/login" className="flex items-center gap-2 self-center font-medium">
          <div className="flex size-6 items-center justify-center text-primary-foreground">
            <LogoIcon className="size-6" />
          </div>
          Tasker
        </a>
        <OrganizationCard
          orgkey={"abc"}
          role={OrgRole.MANAGER}
          name={"Org Teste"}
          members={0}
          projects={0}
          onSelect={handleChoseWorkspace}
        />
        <Scroller className="tskr-workspaces gap-2" orientation="vertical">
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
      </div>
    </div>
    // <Container>
    //   <Content>
    //     <HeaderContainer className="tskr-stage-header-container">
    //       <Logo />
    //       <SectionTitle>CHOSE WORKSPACE</SectionTitle>
    //     </HeaderContainer>
    //     <Scroller className="tskr-workspaces vertical">
    //       {
    //         affiliations.map(
    //           org => (
    //             <OrganizationCard
    //               key={org.orgkey}
    //               orgkey={org.orgkey}
    //               role={org.role}
    //               name={org.name ?? ''}
    //               members={org.members ?? 0}
    //               projects={org.projects ?? 0}
    //               onSelect={handleChoseWorkspace}
    //             />
    //           )
    //         )
    //       }
    //     </Scroller>
    //   </Content>
    // </Container>
  )
}
