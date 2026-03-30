import { useNavigate } from "react-router-dom";
import { ProjectProgress } from "../../../service/types/project/project.dto";
import { Title } from "../../base/Title";
import { Card, HealthyIndicator } from "./style";
import { DateBadge } from "../../badge/DateBadge";
import { DateTime } from "luxon";
import { ProgressBadge } from "../../../maps/progress";
import { ProjectHealthIcon } from "../../../maps/project_healthy";
import { Team } from "../../misc/Team";

interface ProjectTileProps {
  id: string;
  title: string;
  progress: ProjectProgress;
  due_date: string;
}

export function ProjectTile(props: ProjectTileProps) {
  const navigate = useNavigate();

  const goToProjectPage = () => navigate(`/home/project/${props.id}/overview`)

  return (
    <Card className="tskr-project-tile" onClick={goToProjectPage}>
      <Title>{props.title}</Title>
      <Team/>
      <HealthyIndicator>
        {ProjectHealthIcon['SAFE']}
      </HealthyIndicator>
      {ProgressBadge[props.progress]}
      <DateBadge date={DateTime.fromISO(props.due_date, { zone: 'utc' })}/>
    </Card >
  )
}