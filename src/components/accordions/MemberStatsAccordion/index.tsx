import { useEffect, useState } from "react";
import Palette from "../../../assets/palette";
import { Button, Container, Content, Header, Indicator, Indicators, Leading, MemberBadge, MemberSubtitle, MemberTitle, MemberUser, StatDetail, Task } from "./style";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import { formatNumber } from "@/utils/formatNumber";
import type { StatsTask } from "../../../service/types/stats/stats.types";

interface MemberStatsAccordionProps {
  project?: string;
  username: string;
  name?: string;
  tasksDetails?: StatsTask[];
  tasks?: {
    started: number,
    review: number,
    delayed: number,
    done: number,
  },
}

export function MemberStatsAccordion({
  project,
  username,
  name,
  tasks,
  tasksDetails = [],
}: MemberStatsAccordionProps) {
  const [visible, setVisible] = useState(false);

  const [icon, setIcon] = useState(<ChevronDownIcon width={24} />)

  const handleVisible = () => {
    setVisible(!visible)
  }

  useEffect(() => {
    if (visible) {
      setIcon(<ChevronUpIcon width={24} />)
    } else {
      setIcon(<ChevronDownIcon width={24} />)
    }
  }, [visible])

  return (
  <Container
    className="tskr-member-stats-accordion"
    onClick={handleVisible}
  >
    {project ? (
      <MemberSubtitle className="tskr-memberstat-project-title">{project}</MemberSubtitle>
    ) : null}
    <Header>
      <Leading>
        <MemberUser username={name ? `${name} (@${username})` : username} />
      </Leading>
      <Indicators>
        <Indicator>
          <MemberSubtitle>Iniciadas</MemberSubtitle>
          <MemberBadge bg={Palette.lightBlue_50} text={Palette.lightBlue}>{formatNumber(tasks?.started ?? 0, 2)}</MemberBadge>
        </Indicator>
        <Indicator>
          <MemberSubtitle>Concluídas</MemberSubtitle>
          <MemberBadge bg={Palette.green_25} text={Palette.green}>{formatNumber(tasks?.done ?? 0, 2)}</MemberBadge>
        </Indicator>
        <Indicator>
          <MemberSubtitle>Revisão</MemberSubtitle>
          <MemberBadge bg={Palette.yellow_25} text={Palette.yellow}>{formatNumber(tasks?.review ?? 0, 2)}</MemberBadge>
        </Indicator>
        <Indicator>
          <MemberSubtitle>Atrasadas</MemberSubtitle>
          <MemberBadge bg={Palette.red_25} text={Palette.red}>{formatNumber(tasks?.delayed ?? 0, 2)}</MemberBadge>
        </Indicator>
      </Indicators>
      <Button type="button" onClick={handleVisible}>
        {icon}
      </Button>
    </Header>
    {
      visible
        ? <Content>
          {tasksDetails.length > 0
            ? tasksDetails.map((task) => <PerformanceTile key={task.id} task={task} />)
            : <MemberSubtitle>Nenhuma tarefa atribuída.</MemberSubtitle>}
        </Content>
        : <></>
    }
  </Container>
  )
}

const formatDuration = (minutes: number) => {
  const safeMinutes = Math.max(0, Math.round(minutes));
  return `${Math.floor(safeMinutes / 60)}h ${String(safeMinutes % 60).padStart(2, "0")}m`;
};

const PerformanceTile = ({ task }: { task: StatsTask }) => {
  return (
    <StatDetail className="tskr-performance-tile">
      <Task className="tskr-task-infos">
        <MemberSubtitle>{task.code} · {task.stage}{task.delayed ? " · ATRASADA" : ""}</MemberSubtitle>
        <MemberTitle>{task.name}</MemberTitle>
      </Task>
      <MemberTitle>{formatDuration(task.spentMinutes)}</MemberTitle>
    </StatDetail>
  )
}
