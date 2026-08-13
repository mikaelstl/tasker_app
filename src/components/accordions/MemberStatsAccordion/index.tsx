import { useId, useState } from "react";
import Palette from "@/assets/palette";
import { Calendar as CalendarDaysIconOutline, AltArrowDown as ChevronDownIconOutline } from "@/components/icons/solar-icons";
import { User } from "@/components/misc/User";
import type { StatsTask } from "@/service/types/stats/stats.types";
import {
  Container,
  Content,
  EmptyState,
  Header,
  HeaderIdentity,
  HeaderMetric,
  HeaderMetrics,
  ProjectName,
  StatusBadge,
  SummaryLabel,
  SummaryValue,
  TableHeader,
  TaskInfo,
  TaskList,
  TaskMeta,
  TaskName,
  TaskRow,
  ToggleIcon,
} from "./style";

export interface MemberStatsAccordionProps {
  affiliationId: string;
  project: string;
  tasks?: StatsTask[];
  defaultOpen?: boolean;
}

function stageLabel(task: StatsTask): string {
  switch (task.stage) {
    case "STARTED": return "Iniciada";
    case "REVIEW": return "Em revisão";
    case "DONE": return "Concluída";
    case "PENDING":
    default:
      return "Pendente";
  }
}

function summarizeTasks(tasks: StatsTask[]) {
  return tasks.reduce((summary, task) => {
    if (task.delayed) summary.delayed += 1;

    switch (task.stage) {
      case "PENDING": summary.pending += 1; break;
      case "STARTED": summary.started += 1; break;
      case "DONE": summary.completed += 1; break;
      default: break;
    }

    return summary;
  }, { pending: 0, started: 0, completed: 0, delayed: 0 });
}

const formatDate = (value: string) => {
  const date = new Date(/^\d{4}-\d{2}-\d{2}$/.test(value) ? `${value}T12:00:00` : value);

  if (Number.isNaN(date.getTime())) return "Não informado";

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
};

const getStatusColors = (task: StatsTask) => {
  if (task.delayed) {
    return { background: Palette.red_25, color: Palette.red };
  }

  switch (task.stage) {
    case "DONE":
      return { background: Palette.green_25, color: Palette.green };
    case "REVIEW":
      return { background: Palette.yellow_25, color: Palette.yellow };
    case "STARTED":
      return { background: Palette.lightBlue_50, color: Palette.lightBlue };
    default:
      return { background: Palette.gray_25, color: Palette.white_50 };
  }
};

export function MemberStatsAccordion({
  affiliationId,
  project,
  tasks = [],
  defaultOpen = false,
}: MemberStatsAccordionProps) {
  const [open, setOpen] = useState(defaultOpen);
  const contentId = useId();
  const summary = summarizeTasks(tasks);

  return (
    <Container className="tskr-member-stats-accordion">
      <Header
        type="button"
        aria-expanded={open}
        aria-controls={contentId}
        onClick={() => setOpen((current) => !current)}
      >
        <HeaderIdentity>
          <User affiliationId={affiliationId} />
          <ProjectName>{project}</ProjectName>
        </HeaderIdentity>

        <HeaderMetrics>
          <HeaderMetric>
            <SummaryLabel>Tarefas</SummaryLabel>
            <SummaryValue>{tasks.length}</SummaryValue>
          </HeaderMetric>
          {summary.pending > 0 && (
            <StatusBadge $background={Palette.gray_25} $color={Palette.white_50}>
              {summary.pending} pendente{summary.pending === 1 ? "" : "s"}
            </StatusBadge>
          )}
          {summary.started > 0 && (
            <StatusBadge $background={Palette.lightBlue_50} $color={Palette.lightBlue}>
              {summary.started} iniciada{summary.started === 1 ? "" : "s"}
            </StatusBadge>
          )}
          <StatusBadge $background={Palette.green_25} $color={Palette.green}>
            {summary.completed} concluída{summary.completed === 1 ? "" : "s"}
          </StatusBadge>
          {summary.delayed > 0 && (
            <StatusBadge $background={Palette.red_25} $color={Palette.red}>
              {summary.delayed} atrasada{summary.delayed === 1 ? "" : "s"}
            </StatusBadge>
          )}
        </HeaderMetrics>

        <ToggleIcon $open={open} aria-hidden="true">
          <ChevronDownIconOutline />
        </ToggleIcon>
      </Header>

      {open && (
        <Content id={contentId}>
          {tasks.length > 0 ? (
            <TaskList role="table" aria-label="Tarefas">
              <TableHeader role="row">
                <span role="columnheader">Tarefa</span>
                <span role="columnheader">Etapa</span>
                <span role="columnheader">Prazo</span>
              </TableHeader>

              {tasks.map((task) => {
                const colors = getStatusColors(task);

                return (
                  <TaskRow role="row" key={`${task.code}-${task.deadline}`}>
                    <TaskInfo role="cell">
                      <TaskMeta>{task.code}</TaskMeta>
                      <TaskName>{task.name}</TaskName>
                    </TaskInfo>
                    <div role="cell">
                      <StatusBadge $background={colors.background} $color={colors.color}>
                        {task.delayed ? "Atrasada" : stageLabel(task)}
                      </StatusBadge>
                    </div>
                    <TaskMeta role="cell"><CalendarDaysIconOutline /> {formatDate(task.deadline)}</TaskMeta>
                  </TaskRow>
                );
              })}
            </TaskList>
          ) : (
            <EmptyState>Nenhuma tarefa atribuída.</EmptyState>
          )}
        </Content>
      )}
    </Container>
  );
}
