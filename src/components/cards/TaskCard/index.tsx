import { TaskPriority } from "@/service/types/task/priority.dto";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, Code, CodeContainer, Description, HeaderContainer, TitleContainer } from "./style";
import { CheckCircle } from "@/components/icons/solar-icons";
import { PriorityBadge } from "@/maps/priority";
import { User } from "@/components/misc/User";
import { DateBadge } from "@/components/badge/DateBadge";
import { DateTime } from "luxon";
import { useLocation, useNavigate } from "react-router-dom";
import Palette from "@/assets/palette";

interface TaskCardProps {
  projectkey: string;
  code: string;
  title: string;
  description?: string;
  priority: TaskPriority;
  owner: string;
  deadline: string;
  className?: string;
  onClick?: () => void;
}

export function TaskCard({
  projectkey,
  code,
  title,
  description,
  priority,
  owner,
  deadline,
  onClick,
}: TaskCardProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const openTask = () => {
    if (onClick) {
      onClick();
      return;
    }

    navigate(
      `/home/project/${encodeURIComponent(projectkey)}/task/${encodeURIComponent(code)}`,
      { state: { backgroundLocation: location } },
    );
  };

  return (
    <Card
      className="tskr-task-card"
      role="link"
      tabIndex={0}
      aria-label={`Abrir tarefa ${code}: ${title}`}
      onClick={openTask}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openTask();
        }
      }}
    >
      <CardHeader>
        <HeaderContainer>
          <TitleContainer>
            <CodeContainer>
              <CheckCircle width={16}  fill={Palette.lightBlue}/>

              <Code>{code}</Code>
            </CodeContainer>

            <CardTitle>{title}</CardTitle>
          </TitleContainer>

          {PriorityBadge[priority]}
        </HeaderContainer>
      </CardHeader>

      {description && (
        <CardContent>
          <Description>{description}</Description>
        </CardContent>
      )}

      <CardFooter>
        <User affiliationId={owner} />
        <DateBadge date={DateTime.fromISO(deadline)} />
      </CardFooter>
    </Card>
  );
}
