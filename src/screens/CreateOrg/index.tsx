import { Text } from "@/components/base/Text";
import { TextInput } from "@/components/misc/Form/TextInput";
import { Actions, Content } from "@/pages/Register/style";
import { Logo } from "@/components/images/Logo";
import { Title } from "@/components/base/Title";
import { Button } from "@/components/buttons/Button";
import { useState } from "react";
import { Toasts } from "@/maps/toasts";
import type { ApiError } from "@/service/types/response/error";
import { useApi } from "@/hooks/useApi";
import type { OrganizationCreateDTO } from "@/service/types/organization/create.dto";
import type { OrganizationDTO } from "@/service/types/organization/organization.dto";

interface CreateOrgStageProps {
}

export function CreateOrg({
}: CreateOrgStageProps): React.ReactNode {
  const api = useApi();

  const [ name, setName ] = useState<string>('');

  const createOrg = async () => {
    try {
      const response = await api.post<OrganizationCreateDTO>({ 
        route: `/org`,
        data: {
          name
        }
      });
      
      const data: OrganizationDTO = response.data;

      
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
          icon={<BuildingOfficeIcon width={24} />}
          onChange={(value) => setName(value)}
        />
      </div>
      <Actions>
        <Button onClick={() => console.log("DO LOGIN")}>
          <Text>Create organization</Text>
        </Button>
      </Actions>
    </Content>
  )
}