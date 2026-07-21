import Palette from "../../../assets/palette";
import { Text } from "../../../components/base/Text";
import { Title } from "../../../components/base/Title";
import { BackStageBtn } from "../../../components/buttons/BackStageBtn/BackStageBtn";
import { Button } from "../../../components/buttons/Button";
import { CreateAccountStageEnum } from "../../../utils/enums/CreateAccountStage";
import { Actions } from "../style";

interface UseSystemStageProps {
  login: () => void;
  createOrg: () => void;
  handleStage: (value: CreateAccountStageEnum) => void;
}

export function UseSystemStage({
  login,
  createOrg,
  handleStage
}: UseSystemStageProps) {
  return (
    <>
      <Title>O que você deseja fazer agora?</Title>
      <Actions>
        <div className="tskr-use-system-stage-btns">
          <Button onClick={createOrg}><Text>Criar organização</Text></Button>
          <Button onClick={login} color={Palette.details}><Text>Usar o sistema</Text></Button>
        </div>
        <BackStageBtn handleStage={() => handleStage(CreateAccountStageEnum.SET_ACCOUNT)} />
      </Actions>
    </>
  )
}
