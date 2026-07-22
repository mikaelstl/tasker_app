import Palette from "../../../assets/palette";
import { SectionTitle } from "../../../components/base/SectionTitle";
import { Title } from "../../../components/base/Title";
import { ProjectHealthIcon } from "../../../maps/project_healthy";
import { Container, Content, Header } from "../../base/style";
import { HealthTile } from "./style";
import type { ProjectHealthStatus } from "../../../service/types/stats/stats.types";
import { Subtitle } from "../../../components/base/Subtitle";

const HealthTiles = {
  'SAFE': <HealthTile className="tskr-safe-health-tile" $backgroundColor={Palette.green_50} $borderColor={Palette.green}>{ProjectHealthIcon.SAFE}<SectionTitle>SEGURO</SectionTitle></HealthTile>,
  'WARNING': <HealthTile className="tskr-warning-health-tile" $backgroundColor={Palette.yellow_50} $borderColor={Palette.yellow}>{ProjectHealthIcon.WARNING}<SectionTitle>ATENÇÃO</SectionTitle></HealthTile>,
  'CRITICAL': <HealthTile className="tskr-critical-health-tile" $backgroundColor={Palette.red_50} $borderColor={Palette.red}>{ProjectHealthIcon.CRITICAL}<SectionTitle>CRÍTICO</SectionTitle></HealthTile>
}

interface ProjectHealthWidgetProps {
  status: ProjectHealthStatus;
  score: number;
  reason: string;
  projectedDeliveryAt: string | null;
}

const formatDate = (value: string | null) => value
  ? new Intl.DateTimeFormat("pt-BR", { dateStyle: "medium" }).format(new Date(value))
  : "Não calculada";

export function ProjectHealthWidget({
  status,
  score,
  reason,
  projectedDeliveryAt,
}: ProjectHealthWidgetProps) {
  return (
    <Container className="tskr-project-heath-widget">
      <Header>
        <Title>Saúde do projeto</Title>
      </Header>
      <Content>
        {HealthTiles[status]}
        <div>
          <SectionTitle>{Math.round(score)}/100</SectionTitle>
          <Subtitle>{reason}</Subtitle>
          <Subtitle>Entrega projetada: {formatDate(projectedDeliveryAt)}</Subtitle>
        </div>
      </Content>
    </Container>
  )
}
