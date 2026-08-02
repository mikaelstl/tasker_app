import { useId, useState } from "react";
import {
  Calendar as CalendarDaysIconOutline,
  AltArrowDown as ChevronDownIconOutline,
  ClockCircle as ClockIcon,
} from "@/components/icons/solar-icons";
import Palette from "../../../assets/palette";
import type { StatsTask } from "../../../service/types/stats/stats.types";
import { User } from "../../misc/User";
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

export interface MemberStatTileProps {
  affiliationId: string;
  project: string;
  started: number;
  done: number;
  overdue: number;
  review?: number;
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

const formatDuration = (minutes: number) => {
  const safeMinutes = Math.max(0, Math.round(minutes));
  const days = Math.floor(safeMinutes / (24 * 60));
  const hours = Math.floor(safeMinutes / 60);
  const remainingMinutes = safeMinutes % 60;

  if (days > 0) {
    const remainingHours = hours % 24;
    return `${days} dias ${remainingHours}h ${String(remainingMinutes).padStart(2, "0")}min`;
  }

  if (hours === 0) return `${remainingMinutes}min`;
  return `${hours}h ${String(remainingMinutes).padStart(2, "0")}min`;
};

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

export function MemberStatTile({
  affiliationId,
  project,
  started,
  done,
  overdue,
  review = 0,
  tasks = [],
  defaultOpen = false,
}: MemberStatTileProps) {
  const [open, setOpen] = useState(defaultOpen);
  const contentId = useId();
  const totalMinutes = tasks.reduce((total, task) => total + task.spentMinutes, 0);
  const totalTasks = tasks.length || started + review + done;

  return (
    <Container className="tskr-member-stats-tile">
      <Header
        type="button"
        aria-expanded={open}
        aria-controls={contentId}
        onClick={() => setOpen((current) => !current)}
      >
        <HeaderIdentity>
          <User
            affiliationId={affiliationId}
          />
          <ProjectName>{project}</ProjectName>
        </HeaderIdentity>

        <HeaderMetrics>
          <HeaderMetric>
            <SummaryLabel>Tarefas</SummaryLabel>
            <SummaryValue>{totalTasks}</SummaryValue>
          </HeaderMetric>
          <HeaderMetric>
            <SummaryLabel>Tempo registrado</SummaryLabel>
            <SummaryValue><ClockIcon /> {formatDuration(totalMinutes)}</SummaryValue>
          </HeaderMetric>
          {started > 0 && (
            <StatusBadge $background={Palette.lightBlue_50} $color={Palette.lightBlue}>
              {started} iniciada{started === 1 ? "" : "s"}
            </StatusBadge>
          )}
          {review > 0 && (
            <StatusBadge $background={Palette.yellow_25} $color={Palette.yellow}>
              {review} em revisão
            </StatusBadge>
          )}
          <StatusBadge $background={Palette.green_25} $color={Palette.green}>
            {done} concluída{done === 1 ? "" : "s"}
          </StatusBadge>
          {overdue > 0 && (
            <StatusBadge $background={Palette.red_25} $color={Palette.red}>
              {overdue} atrasada{overdue === 1 ? "" : "s"}
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
            <TaskList role="table" aria-label='Tarefas'>
              <TableHeader role="row">
                <span role="columnheader">Tarefa</span>
                <span role="columnheader">Etapa</span>
                <span role="columnheader">Prazo</span>
                <span role="columnheader">Tempo gasto</span>
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
                    <TaskMeta role="cell"><ClockIcon /> {formatDuration(task.spentMinutes)}</TaskMeta>
                  </TaskRow>
                );
              })}
            </TaskList>
          ) : (
            <EmptyState>Nenhuma tarefa detalhada para este usuário.</EmptyState>
          )}
        </Content>
      )}
    </Container>
  );
}
