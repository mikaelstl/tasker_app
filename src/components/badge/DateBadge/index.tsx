import type { DateTime } from "luxon";
import { CalendarClock } from "lucide-react";
import { formatNumber } from "@/utils/formatNumber";

interface DateBadgeProps {
  date: DateTime
}

export function DateBadge({ date }: DateBadgeProps) {
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <CalendarClock className="size-4" />
      <span className="tskr-date-label">{formatNumber(date.day)} {date.monthShort} {formatNumber(date.hour)}:{formatNumber(date.minute)}</span>
    </div>
  )
}