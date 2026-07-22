import {
  CheckCircleIcon,
  ClockIcon,
  EyeIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { Title } from "../../base/Title";
import { Card, Cards, Container, Header, StageInfos } from "./style";
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
      <Cards className="tskr-tasks-stages-amount-infos">
        <Card className="tskr-started-amount" $backgroundColor={Palette.blue_50} $borderColor={Palette.blue}>
          <StageInfos className="tskr-tasks-stage-amount-infos" $color={Palette.lightBlue}>
            <ClockIcon aria-hidden="true" />
            <Title className="tskr-title">INICIADAS</Title>
          </StageInfos>
          <Title className="tskr-title">{stats.started}</Title>
        </Card>
        <Card className="tskr-done-amount" $backgroundColor={Palette.green_50} $borderColor={Palette.green}>
          <StageInfos className="tskr-tasks-stage-amount-infos" $color={Palette.green}>
            <CheckCircleIcon aria-hidden="true" />
            <Title className="tskr-title">CONCLUÍDAS</Title>
          </StageInfos>
          <Title className="tskr-title">{stats.done}</Title>
        </Card>
        <Card className="tskr-review-amount" $backgroundColor={Palette.yellow_50} $borderColor={Palette.yellow}>
          <StageInfos className="tskr-tasks-stage-amount-infos" $color={Palette.yellow}>
            <EyeIcon aria-hidden="true" />
            <Title className="tskr-title">EM REVISÃO</Title>
          </StageInfos>
          <Title className="tskr-title">{stats.review}</Title>
        </Card>
        <Card className="tskr-atrasadas-amount" $backgroundColor={Palette.red_50} $borderColor={Palette.red}>
          <StageInfos className="tskr-tasks-stage-amount-infos" $color={Palette.red}>
            <ExclamationTriangleIcon aria-hidden="true" />
            <Title className="tskr-title">ATRASADAS</Title>
          </StageInfos>
          <Title className="tskr-title">{stats.overdue}</Title>
        </Card>
      </Cards>

    </Container>
  )
}
