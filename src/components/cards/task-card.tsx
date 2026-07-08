import { DateTime } from "luxon";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import type { TaskPriority } from "@/service/types/task/priority.dto";
import { User } from "../misc/User";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils"
import { DateBadge } from "../badge/DateBadge";

const priorityVariantMap: Record<TaskPriority, "destructive" | "warning" | "info" | "outline"> = {
  EXTREME: "destructive",
  HIGH: "warning",
  MEDIUM: "info",
  LOW: "outline",
}

interface TaskCardProps {
  code: string;
  title: string;
  description?: string;
  // status: TaskStatus
  priority: TaskPriority;
  due_date: string;
  owner: string;
  className?: string;
}

export function TaskCard({
  title,
  priority,
  due_date,
  code,
  owner,
  className,
}: TaskCardProps) {
  return (
    <Card
      className={cn(
        "group cursor-pointer rounded-xl border bg-card transition-all w-sm",
        "hover:border-primary hover:shadow-sm",
        className
      )}
    >
      <CardHeader className="space-y-3 pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <div className="flex gap-1 text-ring">
              <CheckCircle2 className="size-4 text-ring" />
              <p className="text-xs font-medium text-muted-foreground">
                {code}
              </p>
            </div>

            <CardTitle className="line-clamp-2 text-base font-semibold leading-snug">
              {title}
            </CardTitle>
          </div>

          <Badge
            variant={priorityVariantMap[priority]}
            className={cn("rounded-md")}
          >
            {priority}
          </Badge>
        </div>
      </CardHeader>
      <CardFooter className="flex items-center justify-between border-t pt-4">
        <User username={owner} />
        <DateBadge date={DateTime.fromISO(due_date)} />
      </CardFooter>
    </Card>
  )
}