import { Subtitle } from "../../base/Subtitle";
import { Title } from "../../base/Title";
import { Card, Content, Footer, Leading, OpenProjectButton, Trailing } from "./style";
import { DateBadge } from "../../badge/DateBadge";
import { useNavigate } from "react-router-dom";
import { DateTime } from "luxon";
import type { ProjectStage } from "@/service/types/project/project.dto";
import type { ProjectMember } from "@/service/types/member/member.dto";
import { ProjectStageBadge } from "@/maps/project-stage";
import { Team } from "@/components/misc/Team";
import { User } from "@/components/misc/User";
import { ChevronRightIcon } from "@/components/icons/heroicons";
import { useServices } from "@/hooks/useServices";
import type { ToastNotifications } from "@/hooks/useToast";
import type { ApiError } from "@/service/types/response/error";

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  deadline: string;
  stage: ProjectStage;
  managerkey?: string | null;
  members: readonly ProjectMember[];
}

function reportApiError(
  error: unknown,
  fallback: string,
  notifications: ToastNotifications,
) {
  const { errors } = error as ApiError;

  if (!errors?.length) {
    notifications.error(fallback);
    return;
  }

  errors.forEach((item) => {
    notifications[item.level](item.message);
  });
}

export function ProjectCard({
  id,
  title,
  description,
  managerkey,
  members,
  deadline,
  stage
}: ProjectCardProps) {
  const navigate = useNavigate();

  const { AffiliationService } = useServices();

  // const loadManagerInfos = () => { 
  //   try {
  //     const response = await AffiliationService.({ username: })
  //   } catch (error) {
  //     api
  //   }
  // }
 
  const goToProjectPage = () => navigate(`/home/project/${id}/overview`)

  return (
    <Card
      key={id}
      className="tskr-project-card" onClick={goToProjectPage}
    >
      <Leading>
        {ProjectStageBadge(stage)}
      </Leading>
      <Content className="tskr-card-leading">
        <Title>{title}</Title>
        <Subtitle>{description}</Subtitle>
      </Content>
      <Footer>
        <Team members={members} />
        {managerkey && (
          <User
            username={managerkey}
            avatarSize={28}
          />
        )}
        <DateBadge
          date={DateTime.fromISO(deadline, { zone: 'utc' })}
        />
      </Footer>
      <Trailing className="tskr-card-Trailing">
        <OpenProjectButton className="tskr-open-proj-btn" type="button" aria-label={`Abrir projeto ${title}`}>
          <ChevronRightIcon width={20}/>
        </OpenProjectButton>
      </Trailing>
    </Card>
  )
}
