import { DateTime } from "luxon";
import { Container, Input } from "./style";

interface CalendarInputProps {
  label: string;
  value: string;
  onChange?: (value: string) => void;
}

export function CalendarInput(props: CalendarInputProps) {
  const now = DateTime.local();
  
  return (
    <Container>
      <label htmlFor="text-input">{props.label}</label>
      <Input name="calendar-input"
        type="datetime-local"
        min={now.toFormat("yyyy-LL-dd'T'HH:mm")}
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