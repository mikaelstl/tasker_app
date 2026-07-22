import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Text } from "../../../components/base/Text";
import { ProjectStageBadge } from "../../../maps/project-stage";
import { Subtitle } from "../../../components/base/Subtitle";
import { EditButton } from "../../../components/buttons/EditBtn";
import { CreateButton } from "../../../components/buttons/CreateButton";
import { Actions, Container, ProgressBar, ProgressCard, ProgressContainer, ProjectInfo, Content, WidgetsContainer, Members } from "./style";
import { TasksInfosWidget } from "../../../widgets/cards/TasksInfosWidget";
import { DeadlineWidget } from "../../../widgets/cards/DeadlineWidget";
import { Title } from "../../../components/base/Title";
import { ProjectHealthWidget } from "../../../widgets/cards/ProjectHealthWidget";
import { PerformanceChart } from "../../../widgets/charts/PerformanceChart";
import { ProdutivityChart } from "../../../widgets/charts/ProdutivityChart";
import { MemberStatsAccordion } from "../../../components/accordions/MemberStatsAccordion";
import { useServices } from "../../../hooks/useServices";
import { useToast } from "../../../hooks/useToast";
import type { ApiError } from "../../../service/types/response/error";
import type { ProjectStats, ProjectStatsReport } from "../../../service/types/stats/stats.types";
import { ProjectStage } from "../../../service/types/project/project.dto";

function notify(error: unknown, fallback: string, notifications: ReturnType<typeof useToast>) {
  const apiError = error as ApiError;
  if (!apiError.errors?.length) return notifications.error(fallback);
  apiError.errors.forEach((item) => notifications[item.level](item.message));
}

export function Stats() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { ProjectService } = useServices();
  const notifications = useToast();
  const [stats, setStats] = useState<ProjectStats | null>(null);
  const [reports, setReports] = useState<ProjectStatsReport[]>([]);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    if (!id) return;
    let active = true;

    void Promise.all([ProjectService.stats(id), ProjectService.listReports(id)])
      .then(([statsResponse, reportsResponse]) => {
        if (!active) return;
        setStats(statsResponse.data);
        setReports(reportsResponse.data);
      })
      .catch((error) => notify(error, "Não foi possível carregar as estatísticas.", notifications));

    return () => { active = false; };
  }, [ProjectService, id]);

  const generateReport = async () => {
    if (!id) return;
    setGenerating(true);
    try {
      await ProjectService.generateReport(id);
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
      notifications.info(`Relatório de ${new Date(response.data.generated_at).toLocaleString("pt-BR")}.`);
    } catch (error) {
      notify(error, "Não foi possível consultar o relatório.", notifications);
    }
  };

  if (!stats) return <Container><Text>Carregando estatísticas...</Text></Container>;

  const stage = stats.project.stage as ProjectStage;
  return (
    <Container className="tskr-proj-stats">
      <ProjectInfo>
        <Title>{stats.project.title}</Title>
        <Subtitle>
          Iniciado em: {stats.project.startedAt ? new Date(stats.project.startedAt).toLocaleDateString("pt-BR") : "—"}
          {" · "}Prazo: {new Date(stats.project.deadline).toLocaleDateString("pt-BR")}
        </Subtitle>
        {ProjectStageBadge[stage]}
        <Actions>
          <EditButton type="button" onClick={() => navigate('../edit')} />
          <CreateButton type="button" disabled={generating} onClick={() => void generateReport()}>
            <Text>{generating ? "Gerando..." : "Gerar relatório"}</Text>
          </CreateButton>
        </Actions>
        <ProjectProgressSection progress={stats.summary.progress} />
      </ProjectInfo>
      <Content className="tskr-proj-stats-content">
        <WidgetsContainer className="tskr-project-infos-widget">
          <TasksInfosWidget total={stats.summary.totalTasks} done={stats.summary.doneTasks} started={stats.summary.startedTasks} delayed={stats.summary.delayedTasks} />
          <DeadlineWidget dueDate={stats.deadline.dueDate} daysLeft={stats.deadline.daysLeft} />
          <ProjectHealthWidget status={stats.health.status} />
        </WidgetsContainer>
        <WidgetsContainer className="tskr-charts">
          <PerformanceChart performance={stats.performancePerMember} />
          <ProdutivityChart productivity={stats.productivity} />
        </WidgetsContainer>
        <Members>
          <Title>Membros</Title>
          <div>
            {stats.members.map((member) => (
              <MemberStatsAccordion
                key={member.memberId}
                username={member.user.username}
                tasks={{ started: member.startedTasks, review: member.reviewTasks, delayed: member.delayedTasks, done: member.completedTasks }}
              />
            ))}
          </div>
          <Title>Relatórios gerados</Title>
          {reports.length === 0 ? <Text>Nenhum relatório gerado.</Text> : reports.map((report) => (
            <CreateButton key={report.id} type="button" onClick={() => void inspectReport(report.id)}>
              <Text>{new Date(report.generated_at).toLocaleString("pt-BR")} · {report.period_type}</Text>
            </CreateButton>
          ))}
        </Members>
      </Content>
    </Container>
  );
}

const ProjectProgressSection = ({ progress }: { progress: number }) => (
  <ProgressCard>
    <ProgressContainer><ProgressBar progress={progress} /></ProgressContainer>
    <Title>{Math.round(progress)}%</Title>
  </ProgressCard>
);
