import Palette from "../../assets/palette";
import { Badge } from "../../components/badge/Badge";
import { ProjectStage } from "../../service/types/project/project.dto";
import type React from "react";

export const ProjectStageBadge: Record<ProjectStage, React.ReactNode> = {
  [ProjectStage.STARTED]: <Badge bg={Palette.blue_50} text={Palette.lightBlue}>INICIADO</Badge>,
  [ProjectStage.PENDING]: <Badge bg={Palette.gray_25} text={Palette.white}>PENDENTE</Badge>,
  [ProjectStage.IN_PROGRESS]: <Badge bg={Palette.blue_50} text={Palette.lightBlue}>EM ANDAMENTO</Badge>,
  [ProjectStage.PAUSED]: <Badge bg={Palette.yellow_25} text={Palette.yellow}>PAUSADO</Badge>,
  [ProjectStage.COMPLETED]: <Badge bg={Palette.green_25} text={Palette.green}>CONCLUÍDO</Badge>,
};
