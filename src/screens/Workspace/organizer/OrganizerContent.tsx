import { useOrganizerDashboard } from "./useOrganizerDashboard";
import { ActiveProjectsCard } from "@/components/cards/ActiveProjectsCard";
import { DeadlineAlertsCard } from "@/components/cards/DeadlineAlertsCard";
import { ShortcutsCard } from "@/components/cards/ShortcutsCard";
import { Divider } from "@/components/misc/Divider";
import { ItalicTitle } from "@/components/base/ItalicTitle";
import { ProjectTile } from "@/components/tiles/ProjectTile";
import { Title } from "@/components/base/Title";
import { Updates } from "@/components/Updates";
import { Margin } from "@/components/misc/Margin";
import { Greating, Infos, Items, Main, StateMessage } from "../style";
import { SectionTitle } from "@/components/base/SectionTitle";
import { Subtitle } from "@/components/base/Subtitle";
import { Scroller } from "@/components/misc/Scroller";

export function OrganizerContent() {
  const { 
    loading,
    projects,
    refetch
  } = useOrganizerDashboard();

  if (loading) {
    return (
      <Main>
        <Greating><SectionTitle>Hello! ORGANIZER</SectionTitle></Greating>
        <StateMessage>Carregando projetos e atualizações...</StateMessage>
      </Main>
    );
  }

  // if (hasError) {
  //   return (
  //     <Main>
  //       <Greating><SectionTitle>Hello! ORGANIZER</SectionTitle></Greating>
  //       <StateMessage>
  //         <Subtitle>Não foi possivel carregar suas informações.</Subtitle>
  //         <button type="button" onClick={refetch}>Tentar novamente</button>
  //       </StateMessage>
  //     </Main>
  //   );
  // }

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
          <Scroller className="tskr-projects-scroller" orientation="horizontal">
            {
            projects.length !== 0
              ? projects.map((project) => (
                <Margin key={project.id} right="12px">
                  <ProjectTile
                    id={project.id}
                    title={project.title}
                    progress={project.progress}
                    due_date={project.due_date}
                  />
                </Margin>
              ))
              : <ItalicTitle>Sem projetos acessados recentemente</ItalicTitle>
          }
          </Scroller>
        </Items>
      </Main>
      {/* <Updates updates={updates} /> */}
    </>
  );
}
