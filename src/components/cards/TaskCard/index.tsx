import { Subtitle } from "../../base/Subtitle";
import { Title } from "../../base/Title";
import { DateBadge } from "../../badge/DateBadge";
import { Avatar } from "../../misc/Avatar";
import { Card, Content, Flag, Indicator, Leading } from "./style";
import { DateTime } from "luxon";

interface TaskCardProps {
  title: string;
  description: string;
  date: string;
}

export function TaskCard(props: TaskCardProps) {
  return (
    <Card className="task-card">
      <Indicator className="indicator">
        <Flag className="flag"></Flag>
      </Indicator>
      <Content id="content">
        <Leading id="leading">
          <div id="text">
            <Title>{props.title}</Title>
            <Subtitle>{props.description}</Subtitle>
          </div>
          <DateBadge date={DateTime.fromISO(props.date, { zone: 'utc' })}/>
        </Leading>
        <Avatar online={false} size="small" image="" />
      </Content>
    </Card>
  )
}