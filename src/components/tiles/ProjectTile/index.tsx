import { useNavigate } from "react-router-dom";
import type { ProjectProgress } from "../../../service/types/project/project.dto";
import { Badge } from "../../badge/Badge";
import { Title } from "../../base/Title";
import { User } from "../../misc/User";
import { Card, Details, Leading, Trailing } from "./style";
import { Subtitle } from "../../base/Subtitle";
import { DateBadge } from "../../badge/DateBadge";
import { DateTime } from "luxon";

interface ProjectTileProps {
  id: string;
  title: string;
  description: string;
  progress: ProjectProgress;
  owner: string;
  due_date: string;
}

export function ProjectTile(props: ProjectTileProps) {
  const navigate = useNavigate();

  const goToProjectPage = () => navigate(`/home/project/${props.id}/overview`)

  return (
    <Card id="project-tile" onClick={goToProjectPage}>
      <Leading>
        <Details>
          <Title>{props.title}</Title>
          <Subtitle>{props.description}</Subtitle>
        </Details>
        <User username={props.owner}/>
      </Leading>
      <Trailing>
        <Badge>{props.progress}</Badge>
        <DateBadge date={DateTime.fromISO(props.due_date, { zone: 'utc' })}/>
      </Trailing>
    </Card >
  )
}