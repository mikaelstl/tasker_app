import { useId, useState } from "react";
import {
  CalendarDaysIcon,
  ChevronDownIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
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
  username: string;
  project: string;
  started: number;
  done: number;
  overdue: number;
  review?: number;
  name?: string;
  photoUrl?: string | null;
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
  const hours = Math.floor(safeMinutes / 60);
  const remainingMinutes = safeMinutes % 60;

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
  username,
  project,
  started,
  done,
  overdue,
  review = 0,
  name,
  photoUrl = null,
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
            actorName={name ?? username}
            actorUsername={name ? username : null}
            actorPhotoUrl={photoUrl}
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
          <ChevronDownIcon />
        </ToggleIcon>
      </Header>

      {open && (
        <Content id={contentId}>
          {tasks.length > 0 ? (
            <TaskList role="table" aria-label={`Tarefas de ${name ?? username}`}>
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
                    <TaskMeta role="cell"><CalendarDaysIcon /> {formatDate(task.deadline)}</TaskMeta>
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
