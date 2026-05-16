import Palette from "../../../assets/palette";
import { Text } from "../../../components/base/Text";
import { Title } from "../../../components/base/Title";
import { BackStageBtn } from "../../../components/buttons/BackStageBtn/BackStageBtn";
import { Button } from "../../../components/buttons/Button";
import { CreateAccountStageEnum } from "../../../utils/enums/CreateAccountStage";
import { Actions } from "../style";

interface UseSystemStageProps {
  createOrg: () => void;
  handleStage: (value: CreateAccountStageEnum) => void;
}

export function UseSystemStage({
  createOrg,
  handleStage
}: UseSystemStageProps) {
  return (
    <>
      <Title>What you want to do now?</Title>
      <Actions>
        <div className="tskr-use-system-stage-btns">
          <Button onClick={createOrg}><Text>Create Organization</Text></Button>
          <Button onClick={() => console.log("TO SELECT WORKSPACE SCREEN")} color={Palette.details}><Text>Use system</Text></Button>
        </div>
        <BackStageBtn handleStage={() => handleStage(CreateAccountStageEnum.SET_ACCOUNT)} />
      </Actions>
    </>
  )
}