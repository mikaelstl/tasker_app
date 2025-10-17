import { CalendarIcon } from "@heroicons/react/24/solid"
import { Text } from "../../base/Text"
import { Container } from "./style"
import type { DateTime } from "luxon";

interface DateBadgeProps {
  date: DateTime
}

export function DateBadge(props: DateBadgeProps) {
  return (
    <Container className="date-badge">
      <CalendarIcon width={18} />
      <Text>
        {props.date.day} {props.date.monthShort} {props.date.year}
      </Text>
    </Container>
  )
}