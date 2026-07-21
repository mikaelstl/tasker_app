import Palette from "../../assets/palette";
import { Badge } from "../../components/badge/Badge";

export const PriorityBadge = {
  'EXTREME': <Badge color={Palette.red_50}>EXTREMA</Badge>,
  'HIGH':<Badge color={Palette.yellow_50}>ALTA</Badge>,
  'MEDIUM': <Badge color={Palette.blue_50}>MÉDIA</Badge>,
  'LOW': <Badge color={Palette.gray_50}>BAIXA</Badge>,
}
