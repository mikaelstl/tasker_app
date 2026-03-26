import { Label } from "../Label";
import { Container, Input } from "./style";

interface TextInput {
  label: string;
  value: string;
  onChange?: (value: string) => void;
}

export function TextInput(props: TextInput) {
  return (
    <Container className="tskr-input">
      <Label htmlFor="text-input">{props.label}</Label>
      <Input type="text" name="text-input"
        value={props.value}
        placeholder="Write here..."
        onChange={(evt) => {
            evt.preventDefault()
            props.onChange!(evt.target.value)
          }
        }
      />
    </Container>
  )
}