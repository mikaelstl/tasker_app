import Palette from "../../assets/palette";
import { Badge } from "../../components/badge/Badge";

export const ProgressBadge = {
  'OVERDUE': <Badge color={Palette.red_50}>OVERDUE</Badge>,
  'STARTED': <Badge color={Palette.blue_50}>STARTED</Badge>,
  'REVIEW':<Badge color={Palette.yellow_50}>REVIEW</Badge>,
  'PENDING': <Badge color={Palette.gray_50}>PENDING</Badge>,
  'DONE': <Badge color={Palette.green_50}>DONE</Badge>,
}