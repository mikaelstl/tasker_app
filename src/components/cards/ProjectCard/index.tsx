import { Subtitle } from "../../base/Subtitle";
import { Title } from "../../base/Title";
import { Badge } from "../../badge/Badge";
import { Card, Leading, Trealing } from "./style";
import { DateBadge } from "../../badge/DateBadge";
import { useNavigate } from "react-router-dom";

interface ProjectCardProps {
  title: string;
  description: string;
}

export function ProjectCard(props: ProjectCardProps) {
  const navigate = useNavigate();

  const goToProjectPage = () => navigate('/home/project/overview')

  return (
    <Card className="project-card" onClick={goToProjectPage}>
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