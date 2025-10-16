import { Container, Input } from "./style";

interface CalendarInputProps {
  label: string;
  value: string;
  onChange?: (value: string) => void;
}

export function CalendarInput(props: CalendarInputProps) {
  return (
    <Container>
      <label htmlFor="text-input">{props.label}</label>
      <Input type="date" name="calendar-input"
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