import { DateTime } from "luxon"
import { CalendarDays, Clock3 } from "lucide-react"
import type { EventDTO } from "@/service/types/events/event.dto"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

interface ImportantDatesProps {
  events: EventDTO[]
}

type GroupedEvent = {
  dateKey: string
  label: string
  events: {
    id: string
    title: string
    time: string
  }[]
}

export function ImportantDates({ events }: ImportantDatesProps) {
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
          },
        ],
      })

      return acc
    }, [])

  return (
    <Card className="flex h-full min-h-0 w-sm flex-col rounded-none bg-foreground shadow-sm">
      <CardHeader className="space-y-2 border-b pb-4">
        <div className="flex items-center gap-2">
          <CalendarDays className="size-4" />
          <CardTitle className="text-base font-semibold">
            Datas importantes
          </CardTitle>
        </div>
        <p className="text-sm text-muted-foreground">
          Próximos eventos agrupados por data.
        </p>
      </CardHeader>

      <CardContent className="min-h-0 flex-1 p-4">
        <ScrollArea className="h-full pr-4">
          <div className="space-y-4">
            {groupedEvents.length > 0 ? (
              groupedEvents.map((group, groupIndex) => (
                <div key={group.dateKey} className="space-y-3">
                  {groupIndex > 0 ? <Separator /> : null}

                  <div className="flex items-center justify-between gap-3">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">
                        {group.label}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {group.events.length} evento
                        {group.events.length > 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {group.events.map((event) => (
                      <div
                        key={event.id}
                        className={cn(
                          "flex items-start gap-3 rounded-lg border bg-background/60 p-3",
                          "transition-colors hover:bg-muted/60",
                        )}
                      >
                        <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                          <Clock3 className="size-4" />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium leading-snug">
                            {event.title}
                          </p>
                          <p className="text-sm text-muted-foreground">{event.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-lg border border-dashed bg-muted/30 p-6 text-center">
                <p className="text-sm font-medium">
                  Sem datas importantes
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Quando houver eventos, eles aparecerão aqui.
                </p>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
