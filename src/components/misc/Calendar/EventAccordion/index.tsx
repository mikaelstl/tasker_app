import { Calendar as CalendarIcon, AltArrowDown as ChevronDownIcon, AltArrowUp as ChevronUpIcon } from "@/components/icons/solar-icons";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { Accordion, Activated, Content, Tag } from "./style";
import type { EventDTO } from "../../../../service/types/events/event.dto";
import { EventCard } from "@/components/cards/EventCard";
import Palette from "@/assets/palette";

interface EventAccordionProps {
  day: string,
  month: string | undefined,
  year: string,
  today: boolean,
  events: EventDTO[]
}

export function EventAccordion(props: EventAccordionProps) {
  const today = DateTime.local().setLocale('pt-BR');
  const [contentOn, setContentOn] = useState(false);

  const showContent = () => {
    setContentOn(!contentOn);
  }

  const isToday = (): boolean => {
    return (props.day === today.day.toString()
      &&
      sameMonth())
      ||
      (props.events.length !== 0)
      ? true
      : false
  }

  const sameMonth = (): boolean => {
    return props.month === today.monthShort
      ? true
      : false
  }

  useEffect(() => {
    setContentOn(isToday())
  }, []);

  return (
    <Tag id="day">
      <Accordion id="accordion" onClick={showContent}>
        <Activated activated={isToday()}>
          <CalendarIcon width='20' color={`${isToday() ? Palette.white : Palette.gray}`}/>
          {props.day} {props.month} {props.year}
        </Activated>
        {contentOn ? <ChevronUpIcon width="22"/> : <ChevronDownIcon width="22" />}
      </Accordion>
      {
        contentOn
          ? <Content id="tskr-accordion-content">
            {
              props.events.map((evt) => <EventCard
                                          title={evt.title}
                                          category={evt.category}
                                          time={evt.date}
                                        />)
            }
          </Content>
          : <></>
      }
    </Tag >
  )
}
