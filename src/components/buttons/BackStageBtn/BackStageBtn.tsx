import { ArrowLeftIcon } from "@heroicons/react/20/solid"
import { Text } from "../../base/Text"
import { BackButton } from "./style"

export function BackStageBtn(props: {
  handleStage: (value: CreateAccountStageEnum) => void;
}): React.ReactNode {
  return (
    <BackButton onClick={() => props.handleStage()}>
      <ArrowLeftIcon width={20} />
      <Text>Back stage</Text>
    </BackButton>
  )
}