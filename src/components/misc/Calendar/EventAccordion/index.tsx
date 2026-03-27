import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/16/solid";
import { CalendarIcon } from "@heroicons/react/24/solid";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { Accordion, Activated, Content, Tag } from "./style";
import type { EventDTO } from "../../../../service/types/events/event.dto";
import { CalendarFlagCard } from "../../../cards/CalendarFlagCard";
import { Text } from "../../../base/Text";
import { Subtitle } from "../../../base/Subtitle";

interface EventAccordionProps {
  day: string,
  month: string | undefined,
  year: string,
  today: boolean,
  events: EventDTO[]
}

export function EventAccordion(props: EventAccordionProps) {
  const today = DateTime.local();
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
          <CalendarIcon width='20'/>
          {props.day} {props.month} {props.year}
        </Activated>
        {contentOn ? <ChevronUpIcon width="22" color="blue" /> : <ChevronDownIcon width="22" color="blue" />}
      </Accordion>
      {
        contentOn
          ? <Content id="tskr-accordion-content">
            {
              props.events.map((evt) => <CalendarFlagCard type="event">
                                          <div>
                                            <Text>{evt.title}</Text>
                                            <Subtitle>Description</Subtitle>
                                          </div>
                                        </CalendarFlagCard>)
            }
          </Content>
          : <></>
      }
    </Tag >
  )
}