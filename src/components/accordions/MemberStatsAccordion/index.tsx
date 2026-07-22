import { useEffect, useState } from "react";
import Palette from "../../../assets/palette";
import { Badge } from "../../badge/Badge";
import { Subtitle } from "../../base/Subtitle";
import { Title } from "../../base/Title";
import { User } from "../../misc/User";
import { Button, Container, Content, Header, Indicator, Indicators, Leading, StatDetail, Task } from "./style";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import { formatNumber } from "@/utils/formatNumber";

interface MemberStatsAccordionProps {
  project?: string;
  username: string;
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
  tasks
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
      <Subtitle className="tskr-memberstat-project-title">{project}</Subtitle>
    ) : null}
    <Header>
      <Leading>
        <User username={username} />
      </Leading>
      <Indicators>
        <Indicator>
          <Subtitle>Iniciadas</Subtitle>
          <Badge bg={Palette.lightBlue_50} text={Palette.lightBlue}>{formatNumber(tasks?.started ?? 0, 2)}</Badge>
        </Indicator>
        <Indicator>
          <Subtitle>Concluídas</Subtitle>
          <Badge bg={Palette.green_25} text={Palette.green}>{formatNumber(tasks?.done ?? 0, 2)}</Badge>
        </Indicator>
        <Indicator>
          <Subtitle>Revisão</Subtitle>
          <Badge bg={Palette.yellow_25} text={Palette.yellow}>{formatNumber(tasks?.review ?? 0, 2)}</Badge>
        </Indicator>
        <Indicator>
          <Subtitle>Atrasadas</Subtitle>
          <Badge bg={Palette.red_25} text={Palette.red}>{formatNumber(tasks?.delayed ?? 0, 2)}</Badge>
        </Indicator>
      </Indicators>
      <Button type="button" onClick={handleVisible}>
        {icon}
      </Button>
    </Header>
    {
      visible
        ? <Content>
          <PerformanceTile />
          <PerformanceTile />
          <PerformanceTile />
        </Content>
        : <></>
    }
  </Container>
  )
}

const PerformanceTile = () => {
  return (
    <StatDetail className="tskr-performance-tile">
      <Task className="tskr-task-infos">
        <Subtitle>TSK-000</Subtitle>
        <Title>Título da tarefa</Title>
      </Task>
      <Title>00h 00m</Title>
    </StatDetail>
  )
}
