import { ActiveProjectsCard } from "@/components/cards/ActiveProjectsCard";
import { DeadlineAlertsCard } from "@/components/cards/DeadlineAlertsCard";
import { ItalicTitle } from "@/components/base/ItalicTitle";
import { SectionTitle } from "@/components/base/SectionTitle";
import { Text } from "@/components/base/Text";
import { Title } from "@/components/base/Title";
import { Button } from "@/components/buttons/Button";
import { Divider } from "@/components/misc/Divider";
import { Margin } from "@/components/misc/Margin";
import { Updates } from "@/components/Updates";
import { useOrganization } from "@/hooks/useOrganization";
import { Greating, Infos, Items, Main, SeeMoreBtn } from "../style";
import { useOrganizerDashboard } from "./useOrganizerDashboard";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { useNavigate } from "react-router-dom";
import { ChevronRightIcon } from "@heroicons/react/16/solid";

interface OrganizerContentProps {
  username: string;
}

export function OrganizerContent({ username }: OrganizerContentProps) {
  const navigate = useNavigate();
  const { org } = useOrganization();
  const {
    loading,
    error,
    data,
    loadDashboard,
    loadingMore,
    updatesError,
    loadMoreUpdates,
    hasMoreUpdates,
  } = useOrganizerDashboard(org?.orgkey);

  if (loading) {
    return (
      <Main>
        <Greating><SectionTitle>Olá, {username}!</SectionTitle></Greating>
        <Text>Carregando dashboard...</Text>
      </Main>
    );
  }

  if (error) {
    return (
      <Main>
        <Greating><SectionTitle>Olá, {username}!</SectionTitle></Greating>
        <Text>{error}</Text>
        <Button type="button" onClick={() => void loadDashboard()}>Tentar novamente</Button>
      </Main>
    );
  }

  return (
    <>
      <Main>
        <Greating><SectionTitle>Olá, {username}!</SectionTitle></Greating>
        <Infos>
          <ActiveProjectsCard {...data.projectSummary} />
          <DeadlineAlertsCard deadlines={data.deadlineAlerts} />
          <Divider />
          {/* <ShortcutsCard /> */}
        </Infos>
        <Items className="tskr-owner-projects-list">
          <Title>Projetos</Title>
          {data.projects.length > 0 ? (
            <>
              {data.projects.slice(0, 4).map((project) => (
                <Margin key={project.id} right="12px">
                  <ProjectCard
                    id={project.id}
                    title={project.title}
                    description={project.description}
                    stage={project.stage}
                    managerkey={project.managerkey}
                    deadline={project.deadline}
                    members={project.members}
                  />
                </Margin>
              ))}
              <SeeMoreBtn type="button" onClick={() => navigate("/home/projects")}>
                Ver mais
                <ChevronRightIcon width={20}/>
              </SeeMoreBtn>
            </>
          ) : (
            <ItalicTitle>Nenhum projeto encontrado</ItalicTitle>
          )}
        </Items>
      </Main>
      <Updates
        updates={data.updates}
        hasMore={hasMoreUpdates}
        loadingMore={loadingMore}
        error={updatesError}
        onLoadMore={() => void loadMoreUpdates()}
      />
    </>
  );
}
