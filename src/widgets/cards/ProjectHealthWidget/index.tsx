import Palette from "../../../assets/palette";
import { SectionTitle } from "../../../components/base/SectionTitle";
import { Title } from "../../../components/base/Title";
import { ProjectHealthIcon } from "../../../maps/project_healthy";
import { Container, Content, Header } from "../../base/style";
import { HealthTile } from "./style";
import type { ProjectHealthStatus } from "../../../service/types/stats/stats.types";

const HealthTiles = {
  'SAFE': <HealthTile className="tskr-safe-health-tile" $backgroundColor={Palette.green_50} $borderColor={Palette.green}>{ProjectHealthIcon.SAFE}<SectionTitle>SEGURO</SectionTitle></HealthTile>,
  'WARNING': <HealthTile className="tskr-warning-health-tile" $backgroundColor={Palette.yellow_50} $borderColor={Palette.yellow}>{ProjectHealthIcon.WARNING}<SectionTitle>ATENÇÃO</SectionTitle></HealthTile>,
  'CRITICAL': <HealthTile className="tskr-critical-health-tile" $backgroundColor={Palette.red_50} $borderColor={Palette.red}>{ProjectHealthIcon.CRITICAL}<SectionTitle>CRÍTICO</SectionTitle></HealthTile>
}

export function ProjectHealthWidget({ status }: { status: ProjectHealthStatus }) {
  return (
    <Container className="tskr-project-heath-widget">
      <Header>
        <Title>Saúde do projeto</Title>
      </Header>
      <Content>
        {HealthTiles[status]}
      </Content>
    </Container>
  )
}
