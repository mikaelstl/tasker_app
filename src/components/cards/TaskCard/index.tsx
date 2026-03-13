import { Title } from "../../base/Title";
import { DateBadge } from "../../badge/DateBadge";
import { Avatar } from "../../misc/Avatar";
import { Card, Leading } from "./style";
import { DateTime } from "luxon";
import { Badge } from "../../badge/Badge";

interface TaskCardProps {
  title: string;
  due_date: string;
  priority: string;
}

export function TaskCard(props: TaskCardProps) {
  return (
    <Card className="task-card">
      <Leading/>
      <Title>{props.title}</Title>
      <div className="tskr-priority">
        <Badge>LOW</Badge>
      </div>
      <Avatar online={false} size="small" image="" />
      <div className="tskr-date">
        <DateBadge date={DateTime.fromISO(props.due_date, { zone: 'utc' })}/>
      </div>
    </Card>
  )
}