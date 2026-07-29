import { DateTime } from "luxon"
import type { EventCategory, EventDTO } from "@/service/types/events/event.dto"
import type { ProjectDTO } from "@/service/types/project/project.dto"
import { SectionTitle } from "../base/SectionTitle"
import { EventCard } from "../cards/EventCard"
import {
  Container,
  DateInfo,
  DateLabel,
  EmptyDescription,
  EmptyState,
  EmptyTitle,
  EventCount,
  EventList,
  EventsScroller,
  Group,
  GroupDivider,
  GroupHeader,
  Groups,
} from "./style"

interface ImportantDatesProps {
  events: EventDTO[]
  projects: ProjectDTO[]
}

type GroupedEvent = {
  dateKey: string
  label: string
  events: {
    id: string
    title: string
    time: string
    category: EventCategory
    projectTitle: string
  }[]
}

export function ImportantDates({ events, projects }: ImportantDatesProps) {
  const projectTitles = new Map(projects.map((project) => [project.id, project.title]))
  const groupedEvents = events
    .slice()
    .sort(
      (a, b) =>
        DateTime.fromISO(a.date, { zone: "utc" }).toMillis() -
        DateTime.fromISO(b.date, { zone: "utc" }).toMillis(),
    )
    .reduce<GroupedEvent[]>((acc, event) => {
      const eventDate = DateTime.fromISO(event.date, { zone: "utc" })
      const dateKey = eventDate.toISODate() ?? event.date

      const time = `${String(eventDate.hour).padStart(2, "0")}:${String(eventDate.minute).padStart(2, "0")}`
      const label = eventDate.toFormat("LLL dd, yyyy")
      const currentGroup = acc.find((group) => group.dateKey === dateKey)

      if (currentGroup) {
        currentGroup.events.push({
          id: event.id,
          title: event.title,
          time,
          category: event.category,
          projectTitle: projectTitles.get(event.projectkey) ?? "Projeto não encontrado",
        })

        return acc
      }

      acc.push({
        dateKey,
        label,
        events: [
          {
            id: event.id,
            title: event.title,
            time,
            category: event.category,
            projectTitle: projectTitles.get(event.projectkey) ?? "Projeto não encontrado",
          },
        ],
      })

      return acc
    }, [])

  return (
    <Container>
      <SectionTitle>Datas importantes</SectionTitle>

      <EventsScroller orientation="vertical">
        <Groups>
          {groupedEvents.length > 0 ? (
            groupedEvents.map((group, groupIndex) => (
              <Group key={group.dateKey}>
                {groupIndex > 0 ? <GroupDivider /> : null}

                <GroupHeader>
                  <DateInfo>
                    <DateLabel>{group.label}</DateLabel>
                    <EventCount>
                      {group.events.length} evento
                      {group.events.length > 1 ? "s" : ""}
                    </EventCount>
                  </DateInfo>
                </GroupHeader>

                <EventList>
                  {group.events.map((event) => (
                    <EventCard
                      key={event.id}
                      title={event.title}
                      time={event.time}
                      category={event.category}
                      projectTitle={event.projectTitle}
                    />
                  ))}
                </EventList>
              </Group>
            ))
          ) : (
            <EmptyState>
              <EmptyTitle>Sem datas importantes</EmptyTitle>
              <EmptyDescription>
                Quando houver eventos, eles aparecerão aqui.
              </EmptyDescription>
            </EmptyState>
          )}
        </Groups>
      </EventsScroller>
    </Container>
  )
}
