import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { CalendarIcon } from "@heroicons/react/24/solid";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { Accordion, Activated, Content, Tag } from "./style";
import { CalendarTag } from "../CalendarTag";

interface EventAccordionProps {
  day: string,
  month: string | undefined,
  year: string,
  today: boolean
}

export function EventAccordion(props: EventAccordionProps) {
  const today = DateTime.local();
  const [contentOn, setContentOn] = useState(false);

  const showContent = () => {
    setContentOn(!contentOn);
  }

  const isToday = (): boolean => {
    return props.day === today.day.toString()
            &&
           sameMonth()
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
          <CalendarIcon width='20'/>
          {props.day} {props.month} {props.year}
        </Activated>
        <ChevronDownIcon width="22" color="blue" />
      </Accordion>
      {
        contentOn
          ? <Content id="accordion-content">
            <CalendarTag />
            <CalendarTag type="event" />
          </Content>
          : <></>
      }
    </Tag >
  )
}