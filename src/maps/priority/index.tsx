import Palette from "../../assets/palette";
import { Badge } from "../../components/badge/Badge";

export const PriorityBadge = {
  'EXTREME': <Badge bg={Palette.red_50} text={Palette.red}>Extrema</Badge>,
  'HIGH':<Badge bg={Palette.yellow_25} text={Palette.yellow}>Alta</Badge>,
  'MEDIUM': <Badge bg={Palette.blue_50} text={Palette.blue}>Média</Badge>,
  'LOW': <Badge bg={Palette.gray_25} text={Palette.gray}>Baixa</Badge>,
}
