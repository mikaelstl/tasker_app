import { Button } from "../../components/buttons/Button";
import { Content, HeaderContainer } from "./style";
import { Logo } from "../../components/images/Logo";
import { SectionTitle } from "../../components/base/SectionTitle";
import { useEffect, useState } from "react";
import { useApi } from "../../hooks/useApi";
import { Toasts } from "../../maps/toasts";
import type { ApiError } from "../../service/types/response/error";
import { Scroller } from "../../components/misc/Scroller";
import { useNavigate } from "react-router-dom";
import { OrganizationCard } from "../../components/cards/OrganizationCard";
import type { AffiliationDTO } from "../../service/types/affiliation/affiliation.dto";

// VIRAR TELA PROPRIA

export function ChoseWorkspace() {
  const navigate = useNavigate();

  const api = useApi();
  
  const [affiliations, setOrgs] = useState<AffiliationDTO[]>([]);
  const loadOrgs = async () => {
    try {
      const response = await api.get({ route: `/affiliations` });

      const data: AffiliationDTO[] = response.data;

      console.log(data);
      

      if (data.length === 0) {
        Toasts['warning']("You don't participates or have organizations. Please create a organization.");
        navigate('/register');
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
        {/* TO-DO ITERAR EM affiliations E ADICIONAR UM CARD PARA ORGANIZAÇÕES */}
        {
          affiliations.map(
            aff => <OrganizationCard name={aff.org?.name ?? ''} members={aff.org?.members?.length ?? 0} projects={aff.org?.projects?.length ?? 0}/>
          )
        }
      </Scroller>
      <Button onClick={() => console.log("Chosed")}>Chose</Button>
    </Content>
  )
}