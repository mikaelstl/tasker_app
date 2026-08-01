import { BellIcon, ClipboardIcon20 } from "@/components/icons/heroicons";
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
