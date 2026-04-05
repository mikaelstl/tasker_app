import { DateTime } from "luxon"
import type { EventDTO } from "../../service/types/events/event.dto"
import { Subtitle } from "../base/Subtitle"
import { Text } from "../base/Text"
import { Margin } from "../misc/Margin"
import { Scroller } from "../misc/Scroller"
import { Container, Day, Event, Month, Name } from "./style"
import { formatNumber } from "../../utils/formatNumber"
// import { useEffect, useState } from "react"
import { SectionTitle } from "../base/SectionTitle"

interface ImportantDatesProps {
  events: EventDTO[]
}

// type DateType = {
//   date: DateTime,
//   events: EventDTO[]
// }

export function ImportantDates({
  events
}: ImportantDatesProps) {
  // const [ dates, setDates ] = useState<DateType[]>([]);
  
  // useEffect(() => {
  //   events.map(
  //     (evt) => {
  //       const date = DateTime.fromISO(evt.date, { zone: 'utc' });
  //     }
  //   )
  // }, [])

  return (
    <Container className="important-dates">
      <SectionTitle>Important dates</SectionTitle>

      <Scroller className="vertical">
        {
          events.map((event) =>{
            const eventDate = DateTime.fromISO(event.date, { zone: 'utc' });

            const sameDateEvents = events.filter(evt => DateTime.fromISO(evt.date, { zone: 'utc' }).hasSame(eventDate, 'day'));

            return <Margin bottom="20px">
              <Month id="month">
                <Subtitle>{eventDate.monthShort} {eventDate.day}, {eventDate.year}</Subtitle>
                {
                  sameDateEvents
                  .map(
                    (evt) => {
                    const date = DateTime.fromISO(evt.date, { zone: 'utc' });
                    return <Event id="event">
                      <Day id="day">
                        <Text>{formatNumber(date.hour)}:{formatNumber(date.minute)}</Text>
                      </Day>
                      <Name>{evt.title}</Name>
                    </Event>}
                  )
                }
              </Month>
            </Margin>}
          )
        }
      </Scroller>
    </Container>
  )
}