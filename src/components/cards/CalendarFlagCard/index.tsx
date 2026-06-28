import { Bell, Clipboard } from "@/components/icons";
import { Container } from "./style";

type CalendarFlagType = 'event' | 'tasks';

const CalendarFlagIcon = {
  'event': <Bell/>,
  'tasks': <Clipboard/>
}

export function CalendarFlagCard(props: {
  type: CalendarFlagType,
  children: React.ReactNode
}) {
  return (
    <Container className="tskr-calendar-flag-card">
      {CalendarFlagIcon[props.type]}
      {props.children}
    </Container>
  )
}