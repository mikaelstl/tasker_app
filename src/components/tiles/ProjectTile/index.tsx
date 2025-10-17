import { useNavigate } from "react-router-dom";
import type { ProjectProgress } from "../../../service/types/project/project.dto";
import { Badge } from "../../badge/Badge";
import { Title } from "../../base/Title";
import { User } from "../../misc/User";
import { Card } from "./style";

interface ProjectTileProps {
  id: string;
  title: string;
  progress: ProjectProgress;
  owner: string;
}

export function ProjectTile(props: ProjectTileProps) {
  const navigate = useNavigate();

  const goToProjectPage = () => navigate(`/home/project/${props.id}/overview`)

  return (
    <Card id="project-tile" onClick={goToProjectPage}>
      <Title>{props.title}</Title>
      <User username={props.owner}/>
      <Badge>{props.progress}</Badge>
      <span>000/000</span>
      {/* <team /> */}
    </Card >
  )
}