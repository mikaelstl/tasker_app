import { Container, TextArea } from "./style";

interface TextAreaInput {
  label: string;
  value: string;
  onChange?: (value: string) => void;
}

export function TextAreaInput(props: TextAreaInput) {
  return (
    <Container>
      <label htmlFor="text-input">{props.label}</label>
      <TextArea name="textarea-input"
        cols={5}
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