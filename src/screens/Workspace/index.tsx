import { useEffect, useState } from "react";
import { Title } from "../../components/base/Title/index.ts";
import { ProjectCard } from "../../components/cards/ProjectCard/index.tsx";
import { TaskCard } from "../../components/cards/TaskCard/index.tsx";
import { Margin } from "../../components/misc/Margin/index.ts";
import { Scroller } from "../../components/misc/Scroller/index.ts";
import { User } from "../../components/misc/User/index.tsx";
import { useApi } from "../../hooks/useApi.ts";
import { Content, Friends, Recent, ToThisWeek } from "./style.ts";
import { useAuth } from "../../hooks/useAuth.ts";
import type { ProjectDTO } from "../../service/types/project/project.dto.ts";
import { ItalicTitle } from "../../components/base/ItalicTitle/index.ts";
import type { TaskDTO } from "../../service/types/task/task.dto.ts";

export function Workspace() {
  const api = useApi();

  const { user } = useAuth();

  const [projects, setProjects] = useState<ProjectDTO[]>([]);
  const [tasks, setTasks] = useState<TaskDTO[]>([]);
  const users = Array.from({ length: 30 }, (_, i) => i);

  useEffect(() => {
    api.get({
      route: '/project/list',
      headers: {
        'user': user?.username
      }
    }).then(
      (result) => {
        setProjects(result.data);
      }
    );

    /* api.get({
      route: `/tasks?ownerkey: user?.username`
    }).then(
      (result) => {
        setTasks(result.data);
      }
    ); */
  }, []);

  return (
    <Content className="workspace-content">
      <Recent className="recent">
        <Title>Recent</Title>
        {
          projects.length !== 0
            ? <Scroller className="horizontal">
              {
                projects.map(project => <Margin right='12px'>
                  <ProjectCard
                    key={project.id}
                    id={project.id}
                    title={project.title}
                    description={project.description}
                    progress={project.progress}
                    due_date={project.due_date}
                  />
                </Margin>)
              }
            </Scroller>
            : <ItalicTitle>Sem projetos acessados recentemente</ItalicTitle>
        }
      </Recent>

      <Friends className="friends">
        <Title>Online</Title>
        <Scroller className="vertical">
          {
            users.map(_ => <Margin bottom='12px'>
              <User online username="username"/>
            </Margin>)
          }
        </Scroller>
      </Friends>

      <ToThisWeek className="this-week">
        <Title>To this Week</Title>
        <Scroller className="vertical">
          {
            tasks.length !== 0
              ? tasks.map(task => <Margin bottom='12px'>
                <TaskCard key={task.id} title={task.name} description={task.description} date={task.due_date} />
              </Margin>)
              : <ItalicTitle>Without tasks to this week</ItalicTitle>
          }
        </Scroller>
      </ToThisWeek>
    </Content>
  )
}