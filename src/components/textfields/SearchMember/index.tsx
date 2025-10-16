import { XMarkIcon } from "@heroicons/react/16/solid";
import { Close, Container, Field } from "./style";

interface SearchMemberProps {
  onClose?: () => void
}

export function SearchMember(props: SearchMemberProps) {
  return (
    <Container>
      <Field/>
      <Close onClick={props.onClose}><XMarkIcon width={24}/></Close>
    </Container>
  )
}