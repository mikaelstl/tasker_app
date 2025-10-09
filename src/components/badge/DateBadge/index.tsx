import { CalendarIcon } from "@heroicons/react/24/solid"
import { Text } from "../../base/Text"
import { Container } from "./style"

export function DateBadge() {
  return (
    <Container className="date-badge">
      <CalendarIcon width={18}/>
      <Text>00 Mon, YYYY</Text>
    </Container>
  )
}