import { useEffect, useRef, useState } from "react";
import { DateTime, Info, Interval } from 'luxon';
import { Title } from "../../base/Title";
import { ChevronLeftIcon, ChevronRightIcon, ClipboardIcon, FlagIcon } from "@heroicons/react/16/solid";
import { Active, Container, Day, Today, Weekday, Header, Weeks, Weekdays, Events } from "./style";
import Palette from "../../../assets/palette";
import { EventAccordion } from "./EventAccordion";

type Month = {
  name: string;
  short: string;
}

interface DayCardProps {
  isToday: boolean;
  isActive: boolean;
  content: number;
  haveTasks: Function;
  haveEvents: Function;
}

function DayCard(props: DayCardProps) {
  return (
    <Day>
      { props.isToday
        ? <Today>{props.content}</Today>
        : <Active isActive={props.isActive}>{props.content}</Active>
      }
      {<div id="indicators">
        {
          props.haveTasks() ? <ClipboardIcon width={16} /> : <></>
        }
        {
          props.haveEvents() ? <FlagIcon width={16} /> : <></>
        }
      </div>}
    </Day>
  )
}

export function Calendar() {
  const [today, setToday] = useState<DateTime>(DateTime.local());
  const [month, setMonth] = useState<Month>();
  const [days, setDays] = useState<DateTime[]>();
  const [weekdays, setWeekdays] = useState<string[]>();
  const [firstDay, setFirstDay] = useState<DateTime>(today.startOf('month'));

  const containerRef = useRef<HTMLDivElement>(null);

  const haveTasks = () => {
    return false;
  }

  const haveEvents = () => {
    return false;
  }

  const isToday = () => {
    return today.hasSame(today, 'day');
  }

  const prevMonth = () => {
    setFirstDay(firstDay?.minus({ month: 1 }));
  }

  const nextMonth = () => {
    setFirstDay(firstDay?.plus({ month: 1 }));
  }

  const updateMonth = () => {
    const name = firstDay?.monthLong as string;

    const short = firstDay?.monthShort as string;

    setMonth({
      name: name[0].toUpperCase() + name.substring(1).toLowerCase(),
      short: short[0]
    });
  }
  useEffect(updateMonth, [firstDay]);

  const updateDays = () => {
    const d = Interval.fromDateTimes(
      firstDay?.startOf('week'),
      firstDay?.endOf('month').endOf('week')
    ).splitBy({ day: 1 }).map(
      (day) => {
        if (day.start === null) {
          throw new Error('Wrong dates')
        }
        return day.start;
      }
    );
    setDays(d);
  }
  useEffect(updateDays, [month]);

  useEffect(() => {
    if (containerRef.current) {
      const todayElement = containerRef.current.querySelector("[today='true']");
      if (todayElement) {
        (todayElement as HTMLElement).scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      }
    }

    const weeks = Info.weekdays('short').map(
      (weekday) => weekday[0].toUpperCase() + weekday.substring(1).toLowerCase().replace('.', '')
    )
    setWeekdays(
      weeks
    );
    updateMonth()
  }, [])

  return (
    <Container className="calendar">
      <Header id="calendar-header">
        <Title>{month?.name}, {firstDay?.year}</Title>
        <div id="actions">
          <button type="button" onClick={prevMonth}>
            <ChevronLeftIcon width="32" fill={Palette.gray}/>
          </button>
          <button type="button" onClick={nextMonth}>
            <ChevronRightIcon width="32" fill={Palette.gray}/>
          </button>
        </div>
      </Header >
      <Weeks id="weeks">
        <Weekdays id="weekdays">
          {
            weekdays?.map(
              (weekday, i) => <Weekday key={i}>
                {weekday}
                {days?.map(
                  (day, index) => 
                    day.weekday === (weekdays.indexOf(weekday) + 1) ? 
                    <DayCard key={index}
                      isToday={day.day === today?.day && day.month === today?.month}
                      isActive={day.month === firstDay?.month}
                      content={day.day}
                      haveEvents={haveEvents}
                      haveTasks={haveTasks}
                    /> : <></>
                )}
              </Weekday>
            )
          }
        </Weekdays>
      </Weeks>
      <Events
        id="events"
        ref={containerRef}
      >
        {
          days?.map((date) => <EventAccordion key={date.toMillis()}
                                today={isToday()}
                                day={date.day.toString()}
                                month={date.monthShort ?? month?.short}
                                year={firstDay.year.toString()}
                              />)
        }
      </Events>
    </Container >
  )
}