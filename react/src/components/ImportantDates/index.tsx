import { Subtitle } from "../base/Subtitle"
import { Text } from "../base/Text"
import { Title } from "../base/Title"
import { Scroller } from "../misc/Scroller"
import { Container, Day, Event, Month, Name } from "./style"

export function ImportantDates() {
  const events = Array.from({length: 4}, (_,i)=>i);
  const months: { events: number[] }[] = [
    {
      events: events
    },
    {
      events: events
    },
    {
      events: events
    },
    {
      events: events
    }
  ]

  return (
    <Container className="important-dates">
      <Title>Important dates</Title>

      <Scroller className="vertical">
        {
          months.map((day) => 
            <Month id="month">
              <Subtitle>Month, YYYY</Subtitle>

              {
                day.events.map(
                  (_) => <Event id="event">
                          <Day id="day">
                            <Text>Day</Text>
                            <Text>00</Text>
                          </Day>
                          <Name>Title</Name>
                        </Event>
                )
              }
            </Month>
          )
        }
      </Scroller>
    </Container>
  )
}