import { Title } from "../../components/base/Title";
import { ProjectCard } from "../../components/cards/ProjectCard";
import { TaskCard } from "../../components/cards/TaskCard/index.tsx";
import { Margin } from "../../components/misc/Margin/index.ts";
import { Scroller } from "../../components/misc/Scroller/index.ts";
import { User } from "../../components/misc/User/index.tsx";
import { Content, Friends, Recent, ToThisWeek } from "./style.ts";

export function Workspace() {
  const projects = Array.from({ length: 10 }, (_, i) => i);
  const users = Array.from({ length: 30 }, (_, i) => i);

  return (
    <Content className="workspace-content">
      <Recent className="recent">
        <Title>Recent</Title>
        <Scroller className="horizontal">
          {
            projects.map(_ => <Margin right='12px'>
                                 <ProjectCard title="Project" description="Description" />
                               </Margin>)
          }
        </Scroller>
      </Recent>

      <Friends className="friends">
        <Title>Online</Title>
        <Scroller className="vertical">
          {
            users.map(_ => <Margin bottom='12px'>
                              <User online/>
                           </Margin>)
          }
        </Scroller>
      </Friends>

      <ToThisWeek className="this-week">
        <Title>To this Week</Title>
        <Scroller className="vertical">
          {
            projects.map(_ => <Margin bottom='12px'>
                                <TaskCard title="Task" description="Description"/>
                              </Margin>)
          }
        </Scroller>
      </ToThisWeek>
    </Content>
  )
}