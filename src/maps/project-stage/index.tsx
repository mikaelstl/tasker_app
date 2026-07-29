import Palette from "../../assets/palette";
import { Badge } from "../../components/badge/Badge";
import { ProjectStage } from "../../service/types/project/project.dto";

export function ProjectStageBadge(stage: ProjectStage) {
  switch (stage) {
    case ProjectStage.STARTED:
      return <Badge bg={Palette.blue_50} text={Palette.lightBlue}>INICIADO</Badge>;
    case ProjectStage.IN_PROGRESS:
      return <Badge bg={Palette.blue_50} text={Palette.lightBlue}>EM ANDAMENTO</Badge>;
    case ProjectStage.PAUSED:
      return <Badge bg={Palette.yellow_25} text={Palette.yellow}>PAUSADO</Badge>;
    case ProjectStage.COMPLETED:
      return <Badge bg={Palette.green_25} text={Palette.green}>CONCLUÍDO</Badge>;
    case ProjectStage.PENDING:
    default:
      return <Badge bg={Palette.gray_25} text={Palette.white}>PENDENTE</Badge>;
  }
}
