import { useEffect, useState } from "react";
import { Margin } from "../../components/misc/Margin/index.ts";
import { Categories, Content, Greating, Infos, Items, Main } from "./style.ts";
import { useAuth } from "../../hooks/useAuth.ts";
import { ItalicTitle } from "../../components/base/ItalicTitle/index.ts";
import type { TaskDTO } from "../../service/types/task/task.dto.ts";
import { TaskStage } from "../../service/types/task/stage.dto.ts";
import { TaskPriority } from "../../service/types/task/priority.dto.tsx";
import { ImportantDates } from "../../components/ImportantDates/index.tsx";
import { SectionTitle } from "../../components/base/SectionTitle/index.ts";
import { ProjectProgress, type ProjectDTO } from "../../service/types/project/project.dto.ts";
import { ProjectTile } from "../../components/tiles/ProjectTile/index.tsx";
import { Updates } from "../../components/Updates/index.tsx";
import { Title } from "../../components/base/Title/index.ts";
import { ActiveProjectsCard } from "../../components/cards/ActiveProjectsCard/index.tsx";
import { DeadlineAlertsCard } from "../../components/cards/DeadlineAlertsCard/index.tsx";
import { ShortcutsCard } from "../../components/cards/ShortcutsCard/index.tsx";
import { Divider } from "../../components/misc/Divider/index.ts";
import { MemberStatTile } from "../../components/tiles/MemberStatTile/index.tsx";
import { NextDeadlineCard } from "../../components/cards/NextDeadlineCard/index.tsx";
import { TasksProgressCard } from "../../components/cards/TasksProgressCard/index.tsx";
import { TaskCategoryAccordion } from "../../components/accordions/TaskCategoryAccordion/index.tsx";
import { useOrganization } from "@/hooks/useOrganization.ts";
import { OrgRole } from "@/utils/enums/OrgRole.ts";
import { MemberContent } from "./content/ManagerContent/index.tsx";

const OrganizerContent = () => {
  const [projects, setProjects] = useState<ProjectDTO[]>([]);

  useEffect(() => {
    setProjects([{
    id: '73187165-f888-4a26-9df6-d7c8d39a6e81',
    title: 'Projeto padrão',
    description: 'Projeto padrão para testes de interface',
    ownerkey: '',
    progress: ProjectProgress.STARTED,
    due_date: new Date().toISOString(),
  }])
  }, [])

  return (
    <>
      <Main>
        <Greating><SectionTitle>Hello! ORGANIZER</SectionTitle></Greating>
        <Infos>
          <ActiveProjectsCard />
          <DeadlineAlertsCard />
          <Divider />
          <ShortcutsCard />
        </Infos>
        <Items>
          <Title>Projects</Title>
          {
            projects.length !== 0
              ? <>
                {
                  projects.map(project => <Margin right='12px'>
                    <ProjectTile
                      key={project.id}
                      id={project.id}
                      title={project.title}
                      progress={project.progress}
                      due_date={project.due_date}
                    />
                  </Margin>)
                }
              </>
              : <ItalicTitle>Sem projetos acessados recentemente</ItalicTitle>
          }
        </Items>
      </Main>
      <Updates updates={[
        {
          id: '8c7330f3',
          content: 'Mensagem de teste',
          date: new Date().toISOString(),
          ownerkey: '',
          projectkey: ''
        }, {
          id: '8c7330f3',
          content: 'Mensagem de teste',
          date: new Date().toISOString(),
          ownerkey: '',
          projectkey: ''
        }
      ]} />
    </>
  )
}

const ManagerContent = () => {
  return (
    <>
      <Main>
        <Greating><SectionTitle>Hello! MANAGER</SectionTitle></Greating>
        <Infos>
          <TasksProgressCard />
          <NextDeadlineCard />
        </Infos>
        <Items>
          <Title>Members Stats</Title>
          <MemberStatTile
            username="mikaelst"
            project="TCC"
          />
        </Items>
      </Main>
      <ImportantDates events={[]} />
    </>
  )
}

type UserProfileContentType = {
  [k in OrgRole]: () => React.ReactNode
}

export function Workspace() {
  const { user } = useAuth();
  const { org } = useOrganization();

  const UserProfileContent: UserProfileContentType = {
    MEMBER: MemberContent,
    OWNER: OrganizerContent,
    MANAGER: ManagerContent
  }

  const WorkspaceContent = UserProfileContent[org?.role ?? OrgRole.MEMBER];

  useEffect(() => {
    console.log(org);
  }, [user, org]);

  return (
    <Content className="workspace-content">
      <WorkspaceContent />
    </Content>
  )
}