import { TaskPriority } from "@/service/types/task/priority.dto";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, Code, CodeContainer, Description, HeaderContainer, TitleContainer } from "./style";
import { CheckCircleIcon } from "@heroicons/react/16/solid";
import { PriorityBadge } from "@/maps/priority";
import { User } from "@/components/misc/User";
import { DateBadge } from "@/components/badge/DateBadge";
import { DateTime } from "luxon";

interface TaskCardProps {
  code: string;
  title: string;
  description?: string;
  priority: TaskPriority;
  owner: string;
  due_date: string;
  className?: string;
}

export function TaskCard({
  code,
  title,
  description,
  priority,
  owner,
  due_date,
}: TaskCardProps) {
  return (
    <Card className="tskr-task-card">
      <CardHeader>
        <HeaderContainer>
          <TitleContainer>
            <CodeContainer>
              <CheckCircleIcon width={16} />

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
        <User username={owner} />
        <DateBadge date={DateTime.fromISO(due_date)} />
      </CardFooter>
    </Card>
  );
}