import Palette from "../../assets/palette";
import { Badge } from "../../components/badge/Badge";

export const PriorityBadge = {
  'EXTREME': <Badge color={Palette.red_50}>EXTREME</Badge>,
  'HIGH':<Badge color={Palette.yellow_50}>HIGH</Badge>,
  'MEDIUM': <Badge color={Palette.blue_50}>MEDIUM</Badge>,
  'LOW': <Badge color={Palette.gray_50}>LOW</Badge>,
}