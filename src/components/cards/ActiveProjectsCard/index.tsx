import { Title } from "../../base/Title";
import { Card, Cards, Container, Header } from "./style";
import Palette from "../../../assets/palette";
import { ProjectHealthyBadge } from "../../../maps/project_healthy_badge";

interface ActiveProjectsCardProps {
  total: number;
  safe: number;
  warning: number;
  critical: number;
}

export function ActiveProjectsCard({
  total,
  safe,
  warning,
  critical,
}: ActiveProjectsCardProps) {
  return (
    <Container className="tskr-active-projects-card">
      <Header>
        <Title>Projetos ativos</Title>
      </Header>
      <Cards>
        <Card>
          <Title className="tskr-title">TOTAL</Title>
          <Title className="tskr-title">{total}</Title>
        </Card>
        <Card $backgroundColor={Palette.green_50} $borderColor={Palette.green}>
          {ProjectHealthyBadge['SAFE']}
          <Title className="tskr-title">{safe}</Title>
        </Card>
        <Card $backgroundColor={Palette.yellow_50} $borderColor={Palette.yellow}>
          {ProjectHealthyBadge['WARNING']}
          <Title className="tskr-title">{warning}</Title>
        </Card>
        <Card $backgroundColor={Palette.red_50} $borderColor={Palette.red}>
          {ProjectHealthyBadge['CRITICAL']}
          <Title className="tskr-title">{critical}</Title>
        </Card>
      </Cards>

    </Container>
  )
}
