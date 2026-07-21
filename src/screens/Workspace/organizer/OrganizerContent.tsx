import { ActiveProjectsCard } from "@/components/cards/ActiveProjectsCard";
import { DeadlineAlertsCard } from "@/components/cards/DeadlineAlertsCard";
import { ShortcutsCard } from "@/components/cards/ShortcutsCard";
import { ItalicTitle } from "@/components/base/ItalicTitle";
import { SectionTitle } from "@/components/base/SectionTitle";
import { Text } from "@/components/base/Text";
import { Title } from "@/components/base/Title";
import { Button } from "@/components/buttons/Button";
import { Divider } from "@/components/misc/Divider";
import { Margin } from "@/components/misc/Margin";
import { ProjectTile } from "@/components/tiles/ProjectTile";
import { Updates } from "@/components/Updates";
import { useOrganization } from "@/hooks/useOrganization";
import { Greating, Infos, Items, Main } from "../style";
import { useOrganizerDashboard } from "./useOrganizerDashboard";

interface OrganizerContentProps {
  username: string;
}

export function OrganizerContent({ username }: OrganizerContentProps) {
  const { org } = useOrganization();
  const { loading, error, data, refetch } = useOrganizerDashboard(org?.orgkey);

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
        <Button type="button" onClick={() => void refetch()}>Tentar novamente</Button>
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
          <ShortcutsCard />
        </Infos>
        <Items>
          <Title>Projetos</Title>
          {data.projects.length > 0 ? (
            data.projects.map((project) => (
              <Margin key={project.id} right="12px">
                <ProjectTile
                  id={project.id}
                  title={project.title}
                  progress={project.progress}
                  due_date={project.due_date}
                />
              </Margin>
            ))
          ) : (
            <ItalicTitle>Nenhum projeto encontrado</ItalicTitle>
          )}
        </Items>
      </Main>
      <Updates updates={data.updates} />
    </>
  );
}
