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
        <Title>Active Projects</Title>
      </Header>
      <Cards>
        <Card>
          <Title className="tskr-title">TOTAL</Title>
          <Title className="tskr-title">{total}</Title>
        </Card>
        <Card color={Palette.green_50}>
          {ProjectHealthyBadge['SAFE']}
          <Title className="tskr-title">{safe}</Title>
        </Card>
        <Card color={Palette.yellow_50}>
          {ProjectHealthyBadge['WARNING']}
          <Title className="tskr-title">{warning}</Title>
        </Card>
        <Card color={Palette.red_50}>
          {ProjectHealthyBadge['CRITICAL']}
          <Title className="tskr-title">{critical}</Title>
        </Card>
      </Cards>

    </Container>
  )
}
