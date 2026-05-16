import { EnvelopeIcon } from "@heroicons/react/20/solid";
import { TextInput } from "../../../components/misc/Form/TextInput";
import { Text } from "../../../components/base/Text";
import { StageButton } from "../style";
import { CreateAccountStageEnum } from "../../../utils/enums/CreateAccountStage";
import validator from "validator";
import { Toasts } from "../../../maps/toasts";

interface SetEmailStageProps {
  email: string;
  setEmail: (value: string) => void;
  handleStage: (value: CreateAccountStageEnum) => void;
}

export function SetEmailStage({
  email,
  setEmail,
  handleStage
}: SetEmailStageProps) {
  return (
    <>
      <div className="tskr-stage-input">
        <TextInput
          type="email"
          placeholder="Enter your e-mail"
          value={email}
          onChange={(value) => setEmail(value)}
          icon={<EnvelopeIcon width={24} />}
        />
        <Text>Please enter an e-mail</Text>
      </div>
      <StageButton onClick={() => {
        if (validator.isEmpty('') && !validator.isEmail(email)) {
          Toasts['warning']("Please enter a valid e-mail.")
          return;
        }

        handleStage(CreateAccountStageEnum.SET_ACCOUNT)
      }}>
        <Text>Advance</Text>
      </StageButton>
    </>
  )
}