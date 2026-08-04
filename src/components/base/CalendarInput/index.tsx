import { DateTime } from "luxon";
import { Container, Input } from "./style";
import { Label } from "../Label";

interface CalendarInputProps {
  label: string;
  value: string;
  onChange?: (value: string) => void;
}

export function CalendarInput(props: CalendarInputProps) {
  const now = DateTime.local();
  
  return (
    <Container>
      <Label htmlFor="text-input">{props.label}</Label>
      <Input name="calendar-input"
        type="datetime-local"
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