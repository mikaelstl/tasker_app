import { Title } from "../../base/Title";
import { Card, Cards, Container, Header } from "./style";
import Palette from "../../../assets/palette";

interface TasksProgressCardProps {
  stats: {
    started: number;
    done: number;
    review: number;
    overdue: number;
  };
}

export function TasksProgressCard({ stats }: TasksProgressCardProps) {
  return (
    <Container className="tskr-active-projects-card">
      <Header>
        <Title>Tasks Progress</Title>
      </Header>
      <Cards>
        <Card>
          <Title className="tskr-title">STARTED</Title>
          <Title className="tskr-title">{stats.started}</Title>
        </Card>
        <Card color={Palette.green_50}>
          <Title className="tskr-title">DONE</Title>
          <Title className="tskr-title">{stats.done}</Title>
        </Card>
        <Card color={Palette.yellow_50}>
          <Title className="tskr-title">REVIEW</Title>
          <Title className="tskr-title">{stats.review}</Title>
        </Card>
        <Card color={Palette.red_50}>
          <Title className="tskr-title">OVERDUE</Title>
          <Title className="tskr-title">{stats.overdue}</Title>
        </Card>
      </Cards>

    </Container>
  )
}
