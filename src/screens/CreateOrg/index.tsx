import { Text } from "@/components/base/Text";
import { TextInput } from "@/components/misc/Form/TextInput";
import { Actions, Content } from "@/pages/Register/style";
import { Logo } from "@/components/images/Logo";
import { Title } from "@/components/base/Title";
import { Button } from "@/components/buttons/Button";
import { useState } from "react";
import { Toasts } from "@/maps/toasts";
import type { ApiError } from "@/service/types/response/error";
import { Building2 } from "@/components/icons";
import { useOrganization } from "@/hooks/useOrganization";
import { OrgRole } from "@/utils/enums/OrgRole";
import { useNavigate } from "react-router-dom";
import OrganizationService from "@/service/modules/organization/organization.service";

interface CreateOrgStageProps {
}

export function CreateOrg({
}: CreateOrgStageProps): React.ReactNode {
  const navigate = useNavigate();

  const { setOrg } = useOrganization();

  const [ name, setName ] = useState<string>('');

  const hendleCreateOrg = async () => {
    try {
      const data = await OrganizationService.create({
        name,
      });

      setOrg(data.id, OrgRole.OWNER);

      navigate('/home');
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

  return (
    <Content>
      <Logo width={182}/>
      <Title>CREATE YOUR ORGANIZATION</Title>
      <div className="tskr-stage-input">
        <Text>Give a name for your organization</Text>
        <TextInput
          type="text"
          placeholder="Name"
          icon={<Building2 />}
          onChange={(value) => setName(value)}
        />
      </div>
      <Actions>
        <Button onClick={hendleCreateOrg}>
          <Text>Create organization</Text>
        </Button>
      </Actions>
    </Content>
  )
}
