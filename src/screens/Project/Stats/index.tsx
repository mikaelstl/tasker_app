import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Text } from "../../../components/base/Text";
import { ProjectStageBadge } from "../../../maps/project-stage";
import { Subtitle } from "../../../components/base/Subtitle";
import { EditButton } from "../../../components/buttons/EditBtn";
import { CreateButton } from "../../../components/buttons/CreateButton";
import {
  Actions,
  Container,
  Content,
  Control,
  Controls,
  EmptyState,
  EventsGrid,
  Facts,
  Members,
  ProgressBar,
  ProgressCard,
  ProgressContainer,
  ProjectInfo,
  ReportDetails,
  ReportList,
  Section,
  WidgetsContainer,
} from "./style";
import { TasksInfosWidget } from "../../../widgets/cards/TasksInfosWidget";
import { DeadlineWidget } from "../../../widgets/cards/DeadlineWidget";
import { Title } from "../../../components/base/Title";
import { ProjectHealthWidget } from "../../../widgets/cards/ProjectHealthWidget";
import { PerformanceChart } from "../../../widgets/charts/PerformanceChart";
import { ProdutivityChart } from "../../../widgets/charts/ProdutivityChart";
import { MemberStatsAccordion } from "../../../components/accordions/MemberStatsAccordion";
import { EventCard } from "../../../components/cards/EventCard";
import { useServices } from "../../../hooks/useServices";
import { useToast } from "../../../hooks/useToast";
import type { ApiError } from "../../../service/types/response/error";
import {
  StatsPeriodType,
  type ProjectStats,
  type ProjectStatsReport,
} from "../../../service/types/stats/stats.types";
import { ProjectStage } from "../../../service/types/project/project.dto";

function notify(error: unknown, fallback: string, notifications: ReturnType<typeof useToast>) {
  const apiError = error as ApiError;
  if (!apiError.errors?.length) return notifications.error(fallback);
  apiError.errors.forEach((item) => notifications[item.level](item.message));
}

const localDateTimeToIso = (value: string) => {
  if (!value) return undefined;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString();
};

const formatDate = (value: string | null) => value
  ? new Intl.DateTimeFormat("pt-BR", { dateStyle: "medium" }).format(new Date(value))
  : "—";

const formatDateTime = (value: string) => new Intl.DateTimeFormat("pt-BR", {
  dateStyle: "short",
  timeStyle: "short",
}).format(new Date(value));

export function Stats() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { ProjectService } = useServices();
  const notifications = useToast();
  const [stats, setStats] = useState<ProjectStats | null>(null);
  const [reports, setReports] = useState<ProjectStatsReport[]>([]);
  const [selectedReport, setSelectedReport] = useState<ProjectStatsReport | null>(null);
  const [cutoff, setCutoff] = useState("");
  const [periodType, setPeriodType] = useState(StatsPeriodType.WEEK);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    if (!id) return;
    let active = true;
    setLoading(true);

    void ProjectService.stats(id)
      .then((response) => {
        if (active) setStats(response.data);
      })
      .catch((error) => notify(error, "Não foi possível carregar as estatísticas.", notifications))
      .finally(() => {
        if (active) setLoading(false);
      });

    void ProjectService.listReports(id)
      .then((response) => {
        if (active) setReports(response.data);
      })
      .catch((error) => notify(error, "Não foi possível carregar o histórico de relatórios.", notifications));

    return () => { active = false; };
  }, [ProjectService, id, notifications]);

  const refreshStats = async () => {
    if (!id) return;
    const cutoffAt = localDateTimeToIso(cutoff);
    if (cutoff && !cutoffAt) {
      notifications.error("Informe uma data de corte válida.");
      return;
    }

    setLoading(true);
    try {
      const response = await ProjectService.stats(id, { cutoffAt });
      setStats(response.data);
    } catch (error) {
      notify(error, "Não foi possível atualizar as estatísticas.", notifications);
    } finally {
      setLoading(false);
    }
  };

  const generateReport = async () => {
    if (!id) return;
    const cutoffAt = localDateTimeToIso(cutoff);
    if (cutoff && !cutoffAt) {
      notifications.error("Informe uma data de corte válida.");
      return;
    }

    setGenerating(true);
    try {
      await ProjectService.generateReport(id, { periodType, cutoffAt });
      const response = await ProjectService.listReports(id);
      setReports(response.data);
      notifications.info("Relatório gerado e baixado.");
    } catch (error) {
      notify(error, "Não foi possível gerar o relatório.", notifications);
    } finally {
      setGenerating(false);
    }
  };

  const inspectReport = async (reportkey: string) => {
    if (!id) return;
    try {
      const response = await ProjectService.findReport(id, reportkey);
      setSelectedReport(response.data);
    } catch (error) {
      notify(error, "Não foi possível consultar o relatório.", notifications);
    }
  };

  if (loading && !stats) return <Container><EmptyState><Text>Carregando estatísticas...</Text></EmptyState></Container>;
  if (!stats) return <Container><EmptyState><Text>As estatísticas deste projeto não estão disponíveis.</Text></EmptyState></Container>;

  const stage = stats.project.stage as ProjectStage;
  const badge = ProjectStageBadge[stage] ?? <Text>{stats.project.stage}</Text>;

  return (
    <Container className="tskr-proj-stats">
      <ProjectInfo>
        <Title>{stats.project.title}</Title>
        <Subtitle>
          Iniciado em: {formatDate(stats.project.startedAt)}
          {" · "}Prazo: {formatDate(stats.project.deadline)}
          {" · "}Corte: {formatDateTime(stats.cutoffAt)}
        </Subtitle>
        {badge}
        <Actions>
          <EditButton type="button" onClick={() => navigate("../edit")} />
        </Actions>
        <ProjectProgressSection progress={stats.summary.progress} />
      </ProjectInfo>

      <Content className="tskr-proj-stats-content">
        <Controls aria-label="Recorte das estatísticas e do relatório">
          <Control>
            <label htmlFor="stats-cutoff">Data de corte</label>
            <input
              id="stats-cutoff"
              type="datetime-local"
              value={cutoff}
              onChange={(event) => setCutoff(event.target.value)}
            />
          </Control>
          <Control>
            <label htmlFor="stats-period">Período do relatório</label>
            <select
              id="stats-period"
              value={periodType}
              onChange={(event) => setPeriodType(event.target.value as StatsPeriodType)}
            >
              <option value={StatsPeriodType.WEEK}>Semana</option>
              <option value={StatsPeriodType.MONTH}>Mês</option>
              <option value={StatsPeriodType.QUARTER}>Trimestre</option>
            </select>
          </Control>
          <CreateButton type="button" disabled={loading} onClick={() => void refreshStats()}>
            <Text>{loading ? "Atualizando..." : "Atualizar recorte"}</Text>
          </CreateButton>
          <CreateButton type="button" disabled={generating} onClick={() => void generateReport()}>
            <Text>{generating ? "Gerando PDF..." : "Gerar relatório PDF"}</Text>
          </CreateButton>
        </Controls>

        <WidgetsContainer className="tskr-project-infos-widget">
          <TasksInfosWidget
            total={stats.summary.totalTasks}
            done={stats.summary.doneTasks}
            started={stats.summary.startedTasks}
            delayed={stats.summary.delayedTasks}
          />
          <DeadlineWidget dueDate={stats.deadline.dueDate} daysLeft={stats.deadline.daysLeft} />
          <ProjectHealthWidget
            status={stats.health.status}
            score={stats.health.score}
            reason={stats.health.reason}
            projectedDeliveryAt={stats.health.projectedDeliveryAt}
          />
        </WidgetsContainer>

        <Facts>
          <Text><strong>{stats.summary.openTasks}</strong> abertas</Text>
          <Text><strong>{stats.summary.reviewTasks}</strong> em revisão</Text>
          <Text><strong>{stats.project.delayed ? "Sim" : "Não"}</strong> projeto atrasado</Text>
          <Text><strong>{stats.period ? `${formatDate(stats.period.start)} – ${formatDate(stats.period.end)}` : "Tempo integral"}</strong> período calculado</Text>
        </Facts>

        <WidgetsContainer className="tskr-charts">
          <PerformanceChart performance={stats.performancePerMember} />
          <ProdutivityChart productivity={stats.productivity} members={stats.members} />
        </WidgetsContainer>

        <Members>
          <Title>Membros</Title>
          <div>
            {stats.members.length === 0 ? <Text>Nenhum membro com estatísticas.</Text> : stats.members.map((member) => (
              <MemberStatsAccordion
                key={member.memberId}
                username={member.user.username}
                name={member.user.name}
                tasksDetails={member.tasks}
                tasks={{
                  started: member.startedTasks,
                  review: member.reviewTasks,
                  delayed: member.delayedTasks,
                  done: member.completedTasks,
                }}
              />
            ))}
          </div>
        </Members>

        <Section>
          <Title>Eventos no recorte</Title>
          {stats.events.length === 0 ? <Text>Nenhum evento encontrado.</Text> : (
            <EventsGrid>
              {stats.events.map((event) => (
                <EventCard
                  key={event.id}
                  title={event.title}
                  time={formatDateTime(event.date)}
                  category={event.category}
                />
              ))}
            </EventsGrid>
          )}
        </Section>

        <Section>
          <Title>Relatórios gerados</Title>
          {reports.length === 0 ? <Text>Nenhum relatório gerado.</Text> : (
            <ReportList>
              {reports.map((report) => (
                <button key={report.id} type="button" onClick={() => void inspectReport(report.id)}>
                  <span>{formatDateTime(report.generated_at)}</span>
                  <small>{report.period_type} · corte em {formatDateTime(report.cutoff_at)}</small>
                </button>
              ))}
            </ReportList>
          )}
          {selectedReport ? (
            <ReportDetails>
              <Subtitle>Relatório selecionado</Subtitle>
              <Text>ID: {selectedReport.id}</Text>
              <Text>Snapshot: {selectedReport.snapshotkey ?? "não vinculado"}</Text>
              <Text>Arquivo persistido: {selectedReport.file_url ?? "não — o backend entrega o PDF apenas na geração"}</Text>
            </ReportDetails>
          ) : null}
        </Section>
      </Content>
    </Container>
  );
}

const ProjectProgressSection = ({ progress }: { progress: number }) => {
  const normalizedProgress = Math.min(100, Math.max(0, progress));
  return (
    <ProgressCard>
      <ProgressContainer><ProgressBar progress={normalizedProgress} /></ProgressContainer>
      <Title>{Math.round(normalizedProgress)}%</Title>
    </ProgressCard>
  );
};
