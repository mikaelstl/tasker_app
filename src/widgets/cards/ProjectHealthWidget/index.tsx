import Palette from "../../../assets/palette";
import { SectionTitle } from "../../../components/base/SectionTitle";
import { Title } from "../../../components/base/Title";
import { ProjectHealthIcon } from "../../../maps/project_healthy";
import { Container, Content, Header } from "../../base/style";
import { HealthTile } from "./style";

const HealthTiles = {
  'SAFE': <HealthTile className="tskr-safe-health-tile" background={Palette.green_50}>{ProjectHealthIcon.SAFE}<SectionTitle>SAFE</SectionTitle></HealthTile>,
  'WARNING': <HealthTile className="tskr-warning-health-tile" background={Palette.yellow_50}>{ProjectHealthIcon.WARNING}<SectionTitle>WARNING</SectionTitle></HealthTile>,
  'CRITICAL': <HealthTile className="tskr-critical-health-tile" background={Palette.red_50}>{ProjectHealthIcon.CRITICAL}<SectionTitle>CRITICAL</SectionTitle></HealthTile>
}

export function ProjectHealthWidget() {
  return (
    <Container className="tskr-project-heath-widget">
      <Header>
        <Title>Project Health</Title>
      </Header>
      <Content>
        {HealthTiles['SAFE']}
      </Content>
    </Container>
  )
}