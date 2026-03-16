import { Title } from "../../base/Title";
import { DateBadge } from "../../badge/DateBadge";
import { Avatar } from "../../misc/Avatar";
import { Card, Leading } from "./style";
import { DateTime } from "luxon";
import { PriorityBadge } from "../../../maps/priority";
import type { TaskPriority } from "../../../service/types/task/priority.dto";

interface TaskCardProps {
  title: string;
  due_date: string;
  priority: TaskPriority;
}

export function TaskCard(props: TaskCardProps) {
  return (
    <Card className="task-card">
      <Leading/>
      <Title>{props.title}</Title>
      <div className="tskr-priority">
        {PriorityBadge[props.priority]}
      </div>
      <Avatar online={false} size="small" image="" />
      <div className="tskr-date">
        <DateBadge date={DateTime.fromISO(props.due_date, { zone: 'utc' })}/>
      </div>
    </Card>
  )
}