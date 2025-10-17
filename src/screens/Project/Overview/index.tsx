import { useEffect, useState } from "react";
import { Badge } from "../../../components/badge/Badge";
import { DateBadge } from "../../../components/badge/DateBadge";
import { Label } from "../../../components/base/Label";
import { Text } from "../../../components/base/Text";
import { Title } from "../../../components/base/Title";
import { CommentCard } from "../../../components/cards/CommentCard";
import { TaskCard } from "../../../components/cards/TaskCard";
import { ImportantDates } from "../../../components/ImportantDates";
import { Margin } from "../../../components/misc/Margin";
import { Scroller } from "../../../components/misc/Scroller";
import { User } from "../../../components/misc/User";
import { ProjectMenu } from "../../../components/ProjectMenu";
import { useApi } from "../../../hooks/useApi";
import { Abstract, AbstractItem, Comments, Container, Content, ImportantTasks, ProjectInfo } from "./style";
import type { ProjectDTO } from "../../../service/types/project/project.dto";
import type { ApiError } from "../../../service/types/response/error";
import { Toasts } from "../../../toasts";
import { useNavigate, useParams } from "react-router-dom";
import { DateTime } from "luxon";

export function Overview() {
  const navigate = useNavigate();

  const api = useApi();

  const { id } = useParams()

  const [project, setProject] = useState<ProjectDTO | null>(null);
  const getProject = async () => {
    try {
      const response = await api.get({ route: `/project/${id}`});

      const data: ProjectDTO = response.data;
      
      setProject(data);
    } catch (error) {
      const { errors } = error as ApiError;
    
      errors?.forEach(
        err => {
          const notify = Toasts[err.level];
          notify(err.message);
        }
      )

      navigate('..')
    }
  }

  const tasks = Array.from({length: 10}, (_, i) => i);

  useEffect(() => {
    getProject();
  },[])

  if (project === null) return <><Text>Carregando...</Text></>; 

  return (
    <Container className="overview">
      <Abstract className="abstract">
        <ProjectInfo>
          <div id="leading">
            <Title>{project?.title}</Title>
            <Text>{project?.description}</Text>
          </div>
          <Badge>{project?.progress}</Badge>
        </ProjectInfo>
        <AbstractItem className="abstract-item">
          <Label>Owner</Label>
          <User username={project?.ownerkey ?? ''}/>
        </AbstractItem>
        <AbstractItem className="abstract-item">
          <Label>Due date</Label>
          <DateBadge
            date={DateTime.fromISO(project?.due_date)}
          />
        </AbstractItem>
      </Abstract>
      <Content className="content">
        <ProjectMenu />
        <ImportantTasks className="important-tasks">
          <Title>Most important</Title>
          <Scroller className="horizontal">
            {
              tasks.map((_) => <Margin right='12px'>
                                 <TaskCard title="Task" description="Description"/>
                               </Margin>)
            }
          </Scroller>
        </ImportantTasks>
        <Comments className="overview-comments">
          <Title>Comments</Title>
          <div id="cards">
            {
              tasks.map((_) => <CommentCard/>)
            }
          </div>
        </Comments>
      </Content>
      <ImportantDates/>
    </Container>
  )
}