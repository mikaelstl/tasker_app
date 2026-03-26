import { Label } from "../Label";
import { Container, TextArea } from "./style";

interface TextAreaInput {
  label: string;
  value: string;
  onChange?: (value: string) => void;
}

export function TextAreaInput(props: TextAreaInput) {
  return (
    <Container>
      <Label htmlFor="textarea-input">{props.label}</Label>
      <TextArea name="textarea-input"
        cols={6}
        placeholder="Write here..."
        value={props.value}
        onChange={(evt) => {
            evt.preventDefault()
            props.onChange!(evt.target.value)
          }
        }
      />
    </Container>
  )
}