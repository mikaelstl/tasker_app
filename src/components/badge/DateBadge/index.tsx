import { Calendar as CalendarIcon } from "@/components/icons/solar-icons"
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
      <CalendarIcon width={20} fill={Palette.gray}/>
      <Subtitle>
        {props.date.setLocale("pt-BR").toFormat("dd LLL yyyy")}
      </Subtitle>
    </Container>
  )
}
