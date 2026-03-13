import { CalendarIcon } from "@heroicons/react/24/solid"
import { Container } from "./style"
import type { DateTime } from "luxon";
import Palette from "../../../assets/palette";
import { Subtitle } from "../../base/Subtitle";

interface DateBadgeProps {
  date: DateTime
}

export function DateBadge(props: DateBadgeProps) {
  return (
    <Container className="tskr-date-badge">
      <CalendarIcon width={18} fill={Palette.gray}/>
      <Subtitle>
        {props.date.day} {props.date.monthShort} {props.date.year}
      </Subtitle>
    </Container>
  )
}