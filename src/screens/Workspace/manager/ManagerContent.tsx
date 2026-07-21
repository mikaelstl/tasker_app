import { ImportantDates } from "@/components/ImportantDates";
import { ItalicTitle } from "@/components/base/ItalicTitle";
import { SectionTitle } from "@/components/base/SectionTitle";
import { Text } from "@/components/base/Text";
import { Title } from "@/components/base/Title";
import { Button } from "@/components/buttons/Button";
import { NextDeadlineCard } from "@/components/cards/NextDeadlineCard";
import { TasksProgressCard } from "@/components/cards/TasksProgressCard";
import { MemberStatTile } from "@/components/tiles/MemberStatTile";
import { useOrganization } from "@/hooks/useOrganization";
import { Greating, Infos, Items, Main } from "../style";
import { useManagerDashboard } from "./useManagerDashboard";

interface ManagerContentProps {
  username: string;
}

export function ManagerContent({ username }: ManagerContentProps) {
  const { org } = useOrganization();
  const { loading, error, data, loadDashboard } = useManagerDashboard(org?.orgkey);

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
          <TasksProgressCard stats={data.stats} />
          {data.deadlines[0] ? (
            <NextDeadlineCard deadline={data.deadlines[0]} />
          ) : (
            <ItalicTitle>Nenhum prazo encontrado</ItalicTitle>
          )}
        </Infos>
        <Items>
          <Title>Estatísticas dos membros</Title>
          {data.membersStats.length > 0 ? (
            data.membersStats.map((member) => (
              <MemberStatTile
                key={`${member.username}-${member.project}`}
                username={member.username}
                project={member.project}
                started={member.started}
                done={member.done}
                overdue={member.overdue}
              />
            ))
          ) : (
            <ItalicTitle>Nenhuma estatística de membro encontrada</ItalicTitle>
          )}
        </Items>
      </Main>
      <ImportantDates events={data.events} />
    </>
  );
}
