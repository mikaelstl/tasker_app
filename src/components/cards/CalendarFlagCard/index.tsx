import { BellIcon, ClipboardIcon } from "@heroicons/react/20/solid";
import { Container } from "./style";

type CalendarFlagType = 'event' | 'tasks';

const CalendarFlagIcon = {
  'event': <BellIcon width={16}/>,
  'tasks': <ClipboardIcon width={16}/>
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