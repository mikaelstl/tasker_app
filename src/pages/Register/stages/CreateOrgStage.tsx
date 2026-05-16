import { BuildingOfficeIcon } from "@heroicons/react/20/solid";
import { Text } from "../../../components/base/Text";
import { TextInput } from "../../../components/misc/Form/TextInput";
import { Actions, StageButton } from "../style";
import { BackStageBtn } from "../../../components/buttons/BackStageBtn/BackStageBtn";
import { CreateAccountStageEnum } from "../../../utils/enums/CreateAccountStage";

interface CreateOrgStageProps {
  handleStage: (value: CreateAccountStageEnum) => void
}

export function CreateOrgStage({
  handleStage
}: CreateOrgStageProps): React.ReactNode {
  return (
    <>
      <div className="tskr-stage-input">
        <Text>Give a name for your organization</Text>
        <TextInput
          type="text"
          placeholder="Name"
          icon={<BuildingOfficeIcon width={24} />}
        />
      </div>
      <Actions>
        <StageButton onClick={() => console.log("DO LOGIN")}>
          <Text>Create organization</Text>
        </StageButton>
        <BackStageBtn handleStage={() => handleStage(CreateAccountStageEnum.USE_SYSTEM)} />
      </Actions>
    </>
  )
}