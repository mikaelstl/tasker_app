import { TextInput } from "@/components/misc/Form/TextInput";
import { useState } from "react";
import type { ApiError } from "@/service/types/response/error";
import { useOrganization } from "@/hooks/useOrganization";
import { OrgRole } from "@/utils/enums/OrgRole";
import { useNavigate } from "react-router-dom";
import { useServices } from "@/hooks/useServices";
import { Logo } from "@/components/images/Logo";
import { useToast } from "@/hooks/useToast";
import { BuildingOfficeIcon } from "@heroicons/react/16/solid";
import { SectionTitle } from "@/components/base/SectionTitle";
import {
  Container,
  Form,
  Inputs,
  SubmitButton,
} from "@/components/misc/Form/style";
import { Content, HeaderContainer } from "./style";

export function CreateOrg(): React.ReactNode {
  const navigate = useNavigate();
  const { OrganizationService } = useServices();
  const { error } = useToast();

  const { setOrg } = useOrganization();

  const [name, setName] = useState<string>("");

  const handleCreateOrg = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await OrganizationService.create({
        name,
      });

      const data = response.data;

      setOrg(data.id, OrgRole.OWNER);

      navigate("/home");
    } catch (err) {
      const { errors } = err as ApiError;

      errors?.forEach((item) => {
        error(item.message);
      });
    }
  };

  return (
    <Content>
      <HeaderContainer className="tskr-stage-header-container">
        <Logo width={182} />
        <SectionTitle>CRIE SUA ORGANIZAÇÃO</SectionTitle>
      </HeaderContainer>

      <Container className="tskr-create-org-form">
        <Form as="form" onSubmit={handleCreateOrg}>
          <Inputs className="tskr-create-org-inputs">
            <TextInput
              label="Nome da organização"
              name="name"
              type="text"
              placeholder="Nome"
              icon={<BuildingOfficeIcon style={{ width: 24, height: 24 }} />}
              value={name}
              onChange={(value) => setName(value)}
            />
          </Inputs>
          <SubmitButton type="submit">Criar organização</SubmitButton>
        </Form>
      </Container>
    </Content>
  );
}
