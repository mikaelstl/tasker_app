import { Text } from "@/components/base/Text";
import { TextInput } from "@/components/misc/Form/TextInput";
import { Logo } from "@/components/images/logo";
import { Title } from "@/components/base/Title";
import { Button } from "@/components/buttons/Button";
import { useState } from "react";
import { Toasts } from "@/maps/toasts";
import type { ApiError } from "@/service/types/response/error";
import { Building2 } from "@/components/icons";
import { useOrganization } from "@/hooks/useOrganization";
import { OrgRole } from "@/utils/enums/OrgRole";
import { useNavigate } from "react-router-dom";
import { useServices } from "@/hooks/useServices";


export function CreateOrg(): React.ReactNode {
  const navigate = useNavigate();
  const { OrganizationService } = useServices();

  const { setOrg } = useOrganization();

  const [ name, setName ] = useState<string>('');

  const hendleCreateOrg = async () => {
    try {
      const response = await OrganizationService.create({
        name,
      });

      const data = response.data;

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
    <div>
      <Logo />
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
      <div>
        <Button onClick={hendleCreateOrg}>
          <Text>Create organization</Text>
        </Button>
      </div>
    </div>
  )
}
