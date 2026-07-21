import Palette from "../../assets/palette";
import { Badge } from "../../components/badge/Badge";

export const ProgressBadge = {
  'OVERDUE': <Badge color={Palette.red_50}>ATRASADO</Badge>,
  'STARTED': <Badge color={Palette.blue_50}>EM ANDAMENTO</Badge>,
  'REVIEW':<Badge color={Palette.yellow_50}>EM REVISÃO</Badge>,
  'PENDING': <Badge color={Palette.gray_50}>PENDENTE</Badge>,
  'DONE': <Badge color={Palette.green_50}>CONCLUÍDO</Badge>,
}
