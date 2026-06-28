import { useEffect, useState } from "react";
import Palette from "@/assets/palette";
import { Badge } from "@/components/badge/Badge";
import { Subtitle } from "@/components/base/Subtitle";
import { Title } from "@/components/base/Title";
import { User } from "@/components/misc/User";
import { Button, Container, Content, Header, Indicator, Indicators, Leading, SpentTimeTile, Task } from "./style";
import { ChevronDown, ChevronUp } from "@/components/icons";

interface MemberStatsAccordionProps {
  username: string;
  // tasks: {
  //   total: number,
  //   done: number
  // },
}

export function MemberStatsAccordion(props: MemberStatsAccordionProps) {
  const [visible, setVisible] = useState(false);

  const [icon, setIcon] = useState(<ChevronDown />)

  const handleVisible = () => {
    setVisible(!visible)
  }

  useEffect(() => {
    if (visible) {
      setIcon(<ChevronUp />)
    } else {
      setIcon(<ChevronDown />)
    }
  }, [visible])

  return (
    <Container className="tskr-member-stats-accordion">
      <Header>
        <Leading>
          <User username={props.username} />
        </Leading>
        <Indicators>
          <Indicator>
            <Subtitle>Started</Subtitle>
            <Badge color={Palette.lightBlue_50}>00</Badge>
          </Indicator>
          <Indicator>
            <Subtitle>Done</Subtitle>
            <Badge color={Palette.green_50}>00</Badge>
          </Indicator>
          <Indicator>
            <Subtitle>Done</Subtitle>
            <Badge color={Palette.yellow_50}>00</Badge>
          </Indicator>
          <Indicator>
            <Subtitle>Overdue</Subtitle>
            <Badge color={Palette.red_50}>00</Badge>
          </Indicator>
        </Indicators>
        <Button type="button" onClick={handleVisible}>
          {icon}
        </Button>
      </Header>
      {
        visible
          ? <Content>
              <PerformanceTile/>
              <PerformanceTile/>
              <PerformanceTile/>
            </Content>
          : <></>
      }
    </Container>
  )
}

const PerformanceTile = () => {
  return (
    <SpentTimeTile className="tskr-performance-tile">
      <Task className="tskr-task-infos">
        <Subtitle>TSK-000</Subtitle>
        <Title>Task title</Title>
      </Task>
      <Title>00h 00m</Title>
    </SpentTimeTile>
  )
}