import Palette from "../../assets/palette";
import { Badge } from "../../components/badge/Badge";

export const ProjectStageBadge = {
  'OVERDUE': <Badge bg={Palette.red_25} text={Palette.red}>ATRASADO</Badge>,
  'STARTED': <Badge bg={Palette.blue_50} text={Palette.lightBlue}>EM ANDAMENTO</Badge>,
  'REVIEW':<Badge bg={Palette.yellow_25} text={Palette.yellow}>EM REVISÃO</Badge>,
  'PENDING': <Badge bg={Palette.gray_25} text={Palette.white}>PENDENTE</Badge>,
  'DONE': <Badge bg={Palette.green_25} text={Palette.green}>CONCLUÍDO</Badge>,
}
