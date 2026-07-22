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
        <Title>Progresso das tarefas</Title>
      </Header>
      <Cards>
        <Card $backgroundColor={Palette.blue_50} $borderColor={Palette.blue}>
          <Title className="tskr-title">INICIADAS</Title>
          <Title className="tskr-title">{stats.started}</Title>
        </Card>
        <Card $backgroundColor={Palette.green_50} $borderColor={Palette.green}>
          <Title className="tskr-title">CONCLUÍDAS</Title>
          <Title className="tskr-title">{stats.done}</Title>
        </Card>
        <Card $backgroundColor={Palette.yellow_50} $borderColor={Palette.yellow}>
          <Title className="tskr-title">EM REVISÃO</Title>
          <Title className="tskr-title">{stats.review}</Title>
        </Card>
        <Card $backgroundColor={Palette.red_50} $borderColor={Palette.red}>
          <Title className="tskr-title">ATRASADAS</Title>
          <Title className="tskr-title">{stats.overdue}</Title>
        </Card>
      </Cards>

    </Container>
  )
}
