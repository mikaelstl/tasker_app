import { IdentificationIcon, KeyIcon, UserIcon } from "@heroicons/react/20/solid";
import { TextInput } from "../../../components/misc/Form/TextInput";
import { CreateAccountStageEnum } from "../../../utils/enums/CreateAccountStage";
import { Text } from "../../../components/base/Text";
import { Actions, StageButton } from "../style";
import { BackStageBtn } from "../../../components/buttons/BackStageBtn/BackStageBtn";

interface SetAccountStageProps {
  username: string;
  name: string;
  password: string;
  setName: (value: string) => void;
  setUsername: (value: string) => void;
  setPassword: (value: string) => void;
  handleStage: (value: CreateAccountStageEnum) => void;
  createAccount: () => void;
}

export function SetAccountStage({
  username,
  name,
  password,
  setName,
  setUsername,
  setPassword,
  handleStage,
  createAccount
}: SetAccountStageProps) {
  return (
    <>
      <div className="task-stage-inputs">
        <div className="tskr-stage-input">
          <TextInput
            type="text"
            placeholder="Nome de usuário"
            value={username}
            onChange={(value) => setUsername(value)}
            icon={<UserIcon width={24} />}
          />
          <Text>Informe um nome de usuário</Text>
        </div>
        <div className="tskr-stage-input">
          <TextInput
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(value) => setName(value)}
            icon={<IdentificationIcon width={24} />}
          />
          <Text>Informe seu nome</Text>
        </div>
        <div className="tskr-stage-input">
          <TextInput
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(value) => setPassword(value)}
            icon={<KeyIcon width={24} />}
          />
          <Text>Informe uma senha</Text>
        </div>
      </div>
      <Actions>
        <StageButton onClick={createAccount}>
          <Text>Finalizar</Text>
        </StageButton>
        <BackStageBtn handleStage={() => handleStage(CreateAccountStageEnum.EMAIL)} />
      </Actions>
    </>
  )
}
