import { Container, Input } from "./style";

interface TextInput {
  label: string;
  value: string;
  onChange?: (value: string) => void;
}

export function TextInput(props: TextInput) {
  return (
    <Container>
      <label htmlFor="text-input">{props.label}</label>
      <Input type="text" name="text-input"
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