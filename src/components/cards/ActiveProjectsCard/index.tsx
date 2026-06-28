import { Title } from "../../base/Title";
import { Card, Cards, Container, Header } from "./style";
import Palette from "../../../assets/palette";
import { ProjectHealthBadge } from "../../../maps/project_healthy_badge";

export function ActiveProjectsCard() {
  return (
    <Container className="tskr-active-projects-card">
      <Header>
        <Title>Active Projects</Title>
      </Header>
      <Cards>
        <Card>
          <Title className="tskr-title">TOTAL</Title>
          <Title className="tskr-title">00</Title>
        </Card>
        <Card color={Palette.green_50}>
          {ProjectHealthBadge['SAFE']}
          <Title className="tskr-title">00</Title>
        </Card>
        <Card color={Palette.yellow_50}>
          {ProjectHealthBadge['WARNING']}
          <Title className="tskr-title">00</Title>
        </Card>
        <Card color={Palette.red_50}>
          {ProjectHealthBadge['CRITICAL']}
          <Title className="tskr-title">00</Title>
        </Card>
      </Cards>

    </Container>
  )
}