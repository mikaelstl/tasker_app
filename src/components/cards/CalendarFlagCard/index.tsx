import { Bell as BellIcon, Clipboard as ClipboardIcon20 } from "@/components/icons/solar-icons";
import { Container } from "./style";

type CalendarFlagType = 'event' | 'tasks';

const CalendarFlagIcon = {
  'event': <BellIcon width={16}/>,
  'tasks': <ClipboardIcon20 width={16}/>
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
