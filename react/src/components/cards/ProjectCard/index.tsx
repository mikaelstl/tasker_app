import { Subtitle } from "../../base/Subtitle";
import { Title } from "../../base/Title";
import { Badge } from "../../badge/Badge";
import { Card, Leading, Trealing } from "./style";
import { DateBadge } from "../../badge/DateBadge";

interface ProjectCardProps {
  title: string;
  description: string;
}

export function ProjectCard(props: ProjectCardProps) {
  return (
    <Card className="project-card">
      <Leading className="card-leading">
        <div className="text">
          <Title>{props.title}</Title>
          <Subtitle>{props.description}</Subtitle>
        </div>
        <DateBadge />
      </Leading>
      <Trealing className="card-trealing">
        <Badge>Pending</Badge>
        {/* <team /> */}
      </Trealing>
    </Card >
  )
}