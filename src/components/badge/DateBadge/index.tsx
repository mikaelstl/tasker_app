import type { DateTime } from "luxon";
import { CalendarDays } from "lucide-react";

interface DateBadgeProps {
  date: DateTime
}

export function DateBadge({ date }: DateBadgeProps) {
  return (
    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
      <CalendarDays className="h-3.5 w-3.5" />
      <span>{date.day} {date.monthShort} {date.hour}:{date.minute}</span>
    </div>
  )
}