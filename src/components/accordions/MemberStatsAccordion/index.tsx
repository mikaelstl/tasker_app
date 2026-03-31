import { useEffect, useState } from "react";
import Palette from "../../../assets/palette";
import { Badge } from "../../badge/Badge";
import { Subtitle } from "../../base/Subtitle";
import { Title } from "../../base/Title";
import { User } from "../../misc/User";
import { Button, Container, Content, Header, Indicator, Indicators, Leading, SpentTimeTile, Task } from "./style";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";

interface MemberStatsAccordionProps {
  username: string;
  // tasks: {
  //   total: number,
  //   done: number
  // },
}

export function MemberStatsAccordion(props: MemberStatsAccordionProps) {
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