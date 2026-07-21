import { Subtitle } from "../../base/Subtitle";
import { Title } from "../../base/Title";
import { Card, Content, Footer, Leading, OpenProjectButton, Trailing } from "./style";
import { DateBadge } from "../../badge/DateBadge";
import { useNavigate } from "react-router-dom";
import { DateTime } from "luxon";
import type { ProjectProgress } from "../../../service/types/project/project.dto";
import type { ProjectMember } from "../../../service/types/member/member.dto";
import { ProjectStageBadge } from "../../../maps/project-stage";
import { Team } from "@/components/misc/Team";
import { ChevronRightIcon } from "@heroicons/react/16/solid";

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  deadline: string;
  stage: ProjectProgress;
  members: readonly ProjectMember[];
}

export function ProjectCard({
  id,
  title,
  description,
  members,
  deadline,
  stage
}: ProjectCardProps) {
  const navigate = useNavigate();

  const goToProjectPage = () => navigate(`/home/project/${id}/overview`)

  return (
    <Card
      key={id}
      className="tskr-project-card" onClick={goToProjectPage}
    >
      <Leading>
        {ProjectStageBadge[stage]}
      </Leading>
      <Content className="tskr-card-leading">
        <Title>{title}</Title>
        <Subtitle>{description}</Subtitle>
      </Content>
      <Footer>
        <Team members={members} />
        <DateBadge
          date={DateTime.fromISO(deadline, { zone: 'utc' })}
        />
      </Footer>
      <Trailing className="tskr-card-Trailing">
        <OpenProjectButton type="button" aria-label={`Abrir projeto ${title}`}>
          <ChevronRightIcon aria-hidden="true" />
        </OpenProjectButton>
      </Trailing>
    </Card>
  )
}
