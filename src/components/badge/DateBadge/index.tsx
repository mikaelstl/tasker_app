import { Container } from "./style"
import type { DateTime } from "luxon";
import Palette from "../../../assets/palette";
import { Subtitle } from "../../base/Subtitle";
import { Calendar } from "@/components/icons";

interface DateBadgeProps {
  date: DateTime
}

export function DateBadge(props: DateBadgeProps) {
  return (
    <Container className="tskr-date-badge">
      <Calendar color={Palette.gray}/>
      <Subtitle>
        {props.date.day} {props.date.monthShort} {props.date.year}
      </Subtitle>
    </Container>
  )
}