import { useManagerDashboard } from "./useManagerDashboard";
import { ImportantDates } from "@/components/ImportantDates";
import { ItalicTitle } from "@/components/base/ItalicTitle";
import { MemberStatTile } from "@/components/tiles/MemberStatTile";
import { SectionTitle } from "@/components/base/SectionTitle";
import { Title } from "@/components/base/Title";
import { TaskCard } from "@/components/cards/TaskCard";
import { Margin } from "@/components/misc/Margin";
import { Greating, Infos, Items, Main, StateMessage } from "../style";
import type { DashboardMetricDTO } from "../services/dashboard.types";
import { TaskPriority } from "@/service/types/task/priority.dto";

function MetricList({ metrics }: { metrics: DashboardMetricDTO[] }) {
  return (
    <Infos>
      {
        metrics.map((metric) => (
          <div key={metric.label}>
            <Title>{metric.label}</Title>
            <ItalicTitle>{String(metric.value)}</ItalicTitle>
          </div>
        ))
      }
    </Infos>
  );
}

export function ManagerContent() {
  const { loading, error, data, refetch } = useManagerDashboard();

  const stats = data?.stats ?? [];
  const deadlines = data?.deadlines ?? [];
  const membersStats = data?.membersStats ?? [];
  const events = data?.events ?? [];

  if (loading) {
    return (
      <Main>
        <Greating><SectionTitle>Hello! MANAGER</SectionTitle></Greating>
        <StateMessage>Carregando métricas e prazos...</StateMessage>
      </Main>
    );
  }

  if (error) {
    return (
      <Main>
        <Greating><SectionTitle>Hello! MANAGER</SectionTitle></Greating>
        <StateMessage>
          {error}
          <button type="button" onClick={refetch}>Tentar novamente</button>
        </StateMessage>
      </Main>
    );
  }

  return (
    <>
      <Main>
        <Greating><SectionTitle>Hello! MANAGER</SectionTitle></Greating>
        {stats.length !== 0 ? <MetricList metrics={stats} /> : <ItalicTitle>Sem métricas disponíveis</ItalicTitle>}
        <Infos>
          {
            deadlines.length !== 0
              ? deadlines.map((task) => (
                <Margin key={task.id} right="12px">
                  <TaskCard
                    title={task.name}
                    due_date={task.due_date}
                    priority={task.priority ?? TaskPriority.MEDIUM}
                  />
                </Margin>
              ))
              : <ItalicTitle>Sem prazos críticos no momento</ItalicTitle>
          }
        </Infos>
        <Items>
          <Title>Members Stats</Title>
          {
            membersStats.length !== 0
              ? membersStats.map((member) => (
                <MemberStatTile
                  key={`${member.username}-${member.project}`}
                  member={member}
                />
              ))
              : <ItalicTitle>Sem estatísticas de membros</ItalicTitle>
          }
        </Items>
      </Main>
      <ImportantDates events={events} />
    </>
  );
}
