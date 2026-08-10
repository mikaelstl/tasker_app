import { useCallback, useEffect, useState } from "react";
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
  Members,
  ProgressBar,
  ProgressCard,
  ProgressContainer,
  ProjectInfo,
  WidgetsContainer,
} from "./style";
import { TasksInfosWidget } from "../../../widgets/cards/TasksInfosWidget";
import { DeadlineWidget } from "../../../widgets/cards/DeadlineWidget";
import { Title } from "../../../components/base/Title";
import { ProjectHealthWidget } from "../../../widgets/cards/ProjectHealthWidget";
import { PerformanceChart } from "../../../widgets/charts/PerformanceChart";
import { ProdutivityChart } from "../../../widgets/charts/ProdutivityChart";
import { MemberStatTile } from "../../../components/tiles/MemberStatTile";
import { useServices } from "../../../hooks/useServices";
import { useToast, type ToastNotifications } from "../../../hooks/useToast";
import type { ApiError } from "../../../service/types/response/error";
import {
  type MemberStats,
  type ProjectMemberPerformance,
  type ProjectStats,
  type ProjectStatsReport,
} from "../../../service/types/stats/stats.types";
import { ProjectStage } from "../../../service/types/project/project.dto";
import { useAccessControl } from "../../../hooks/useAccessControl";

function notify(error: unknown, fallback: string, notifications: ToastNotifications) {
  const apiError = error as ApiError;
  if (!apiError.errors?.length) return notifications.error(fallback);
  apiError.errors.forEach((item) => notifications[item.level](item.message));
}

const formatDate = (value: string | null) => value
  ? new Intl.DateTimeFormat("pt-BR", { dateStyle: "medium" }).format(new Date(value))
  : "—";

const currentMonth = () => {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
};

const monthFromDate = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return currentMonth();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
};

export function Stats() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { ProjectService } = useServices();
  const notifications = useToast();
  const { canEditProject, canGenerateProjectStatsReport } = useAccessControl();
  const [stats, setStats] = useState<ProjectStats | null>(null);
  const [memberPerformance, setMemberPerformance] = useState<ProjectMemberPerformance | null>(null);
  const [memberStats, setMemberStats] = useState<MemberStats[]>([]);
  const [reports, setReports] = useState<ProjectStatsReport[]>([]);
  const [selectedReport, setSelectedReport] = useState<ProjectStatsReport | null>(null);
  const [month, setMonth] = useState(currentMonth);
  const [projectCreatedAt, setProjectCreatedAt] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  const loadProject = useCallback(async () => {
    if (!id) return null;

    const response = await ProjectService.find(id);
    return response.data;
  }, [ProjectService, id]);

  const loadReports = useCallback(async () => {
    if (!id) return null;

    const response = await ProjectService.listReports(id);
    return response.data;
  }, [ProjectService, id]);

  const loadStats = useCallback(async () => {
    if (!id) return null;

    const response = await ProjectService.stats(id, { month });
    return response.data;
  }, [ProjectService, id, month]);

  const loadMemberStats = useCallback(async () => {
    if (!id) return null;

    const response = await ProjectService.getProjectMemberStats(id, { month });
    return response.data;
  }, [ProjectService, id, month]);

  const loadMemberPerformance = useCallback(async () => {
    if (!id) return null;

    const response = await ProjectService.getProjectMemberPerformance(id, { month });
    return response.data;
  }, [ProjectService, id, month]);

  const loadReport = useCallback(async (reportkey: string) => {
    if (!id) return null;

    const response = await ProjectService.findReport(id, reportkey);
    return response.data;
  }, [ProjectService, id]);

  useEffect(() => {
    let active = true;

    void loadProject()
      .then((project) => {
        if (active && project) setProjectCreatedAt(project.created_at);
      })
      .catch((error) => notify(error, "Não foi possível carregar os dados do projeto.", notifications));

    return () => { active = false; };
  }, [loadProject, notifications]);

  useEffect(() => {
    let active = true;

    void loadReports()
      .then((projectReports) => {
        if (active && projectReports) setReports(projectReports);
      })
      .catch((error) => notify(error, "Não foi possível carregar o histórico de relatórios.", notifications));

    return () => { active = false; };
  }, [loadReports, notifications]);

  useEffect(() => {
    let active = true;
    setLoading(true);

    void loadStats()
      .then((projectStats) => {
        console.log("[Stats] retorno das estatísticas do projeto", projectStats);
        if (active && projectStats) setStats(projectStats);
      })
      .catch((error) => {
        if (active) notify(error, "Não foi possível carregar as estatísticas.", notifications);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => { active = false; };
  }, [loadStats, notifications]);

  useEffect(() => {
    let active = true;

    void loadMemberStats()
      .then((members) => {
        console.log("[Stats] retorno das estatísticas dos membros", members);
        if (active && members) setMemberStats(members);
      })
      .catch((error) => {
        if (active) notify(error, "Não foi possível carregar as estatísticas dos membros.", notifications);
      });

    return () => { active = false; };
  }, [loadMemberStats, notifications]);

  useEffect(() => {
    let active = true;

    void loadMemberPerformance()
      .then((performance) => {
        console.log("[Stats] retorno do desempenho dos membros", performance);
        if (active && performance) setMemberPerformance(performance);
      })
      .catch((error) => {
        if (active) notify(error, "Não foi possível carregar o desempenho dos membros.", notifications);
      });

    return () => { active = false; };
  }, [loadMemberPerformance, notifications]);

  const generateReport = async () => {
    if (!id) return;
    setGenerating(true);
    try {
      await ProjectService.generateReport(id, { month });
      const projectReports = await loadReports();
      if (projectReports) setReports(projectReports);
      notifications.info("Relatório gerado e baixado.");
    } catch (error) {
      notify(error, "Não foi possível gerar o relatório.", notifications);
    } finally {
      setGenerating(false);
    }
  };

  const inspectReport = async (reportkey: string) => {
    try {
      const report = await loadReport(reportkey);
      if (report) setSelectedReport(report);
    } catch (error) {
      notify(error, "Não foi possível consultar o relatório.", notifications);
    }
  };

  if (loading && !stats) return <Container><EmptyState><Text>Carregando estatísticas...</Text></EmptyState></Container>;
  if (!stats) return <Container><EmptyState><Text>As estatísticas deste projeto não estão disponíveis.</Text></EmptyState></Container>;

  const stage = stats.project.stage as ProjectStage;
  const badge = ProjectStageBadge(stage);
  const minimumMonth = projectCreatedAt ? monthFromDate(projectCreatedAt) : undefined;
  const maximumMonth = currentMonth();

  const selectMonth = (value: string) => {
    if (minimumMonth && value < minimumMonth) {
      notifications.error("Selecione um mês a partir da criação do projeto.");
      return;
    }
    if (value > maximumMonth) {
      notifications.error("Selecione o mês atual ou meses anteriores.");
      return;
    }
    setMonth(value);
  };

  return (
    <Container className="tskr-proj-stats">
      <ProjectInfo>
        <Title>{stats.project.title}</Title>
        <Subtitle>
          Iniciado em: {formatDate(stats.project.startedAt)}
          {" · "}Prazo: {formatDate(stats.project.deadline)}
          {" · "}Mês: {stats.month}
        </Subtitle>
        {badge}
        <Actions>
          {canEditProject() && <EditButton type="button" onClick={() => navigate("../edit")} />}
        </Actions>
        <ProjectProgressSection progress={stats.summary.progress} />
      </ProjectInfo>

      <Content className="tskr-proj-stats-content">
        <Controls aria-label="Mês das estatísticas e do relatório">
          <Control>
            <label htmlFor="stats-month">Mês</label>
            <input
              id="stats-month"
              type="month"
              value={month}
              min={minimumMonth}
              max={maximumMonth}
              onChange={(event) => selectMonth(event.target.value)}
            />
          </Control>
          {canGenerateProjectStatsReport() && (
            <CreateButton type="button" disabled={generating} onClick={() => void generateReport()}>
              <Text>{generating ? "Gerando PDF..." : "Gerar relatório PDF"}</Text>
            </CreateButton>
          )}
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

        <WidgetsContainer className="tskr-charts">
          <PerformanceChart performance={memberPerformance?.members ?? stats.performancePerMember} />
          <ProdutivityChart productivity={stats.productivity} members={stats.members} />
        </WidgetsContainer>

        <Members>
          <Title>Membros</Title>
          <div>
            {memberStats.length === 0 ? <Text>Nenhum membro com estatísticas.</Text> : memberStats.map((member) => (
              <MemberStatTile
                key={member.memberId}
                project={stats.project.title}
                affiliationId={member.user.affiliationId}
                started={member.startedTasks}
                done={member.completedTasks}
                overdue={member.delayedTasks}
                review={member.reviewTasks}
                tasks={member.tasks}
              />
            ))}
          </div>
        </Members>
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
