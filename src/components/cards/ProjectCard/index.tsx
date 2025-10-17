import { Subtitle } from "../../base/Subtitle";
import { Title } from "../../base/Title";
import { Badge } from "../../badge/Badge";
import { Card, Leading, Trailing } from "./style";
import { DateBadge } from "../../badge/DateBadge";
import { useNavigate } from "react-router-dom";
import { DateTime } from "luxon";
import type { ProjectProgress } from "../../../service/types/project/project.dto";

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  due_date: string;
  progress: ProjectProgress;
}

export function ProjectCard(props: ProjectCardProps) {
  const navigate = useNavigate();

  const goToProjectPage = () => navigate(`/home/project/${props.id}/overview`)

  return (
    <Card className="project-card" onClick={goToProjectPage}>
      <Leading className="card-leading">
        <div className="text">
          <Title>{props.title}</Title>
          <Subtitle>{props.description}</Subtitle>
        </div>
        <DateBadge
          date={DateTime.fromISO(props.due_date)}
        />
      </Leading>
      <Trailing className="card-Trailing">
        <Badge>{props.progress}</Badge>
        {/* <team /> */}
      </Trailing>
    </Card >
  )
}