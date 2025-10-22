import Palette from "../../assets/palette";
import { Badge } from "../../components/badge/Badge";

export const ProgressBadge = {
  'PENDING': <Badge color={Palette.lightRed}>Pending</Badge>,
  'IN_PROGRESS': <Badge color={Palette.lightBlue}>In progress</Badge>,
  'PAUSED':<Badge color={Palette.gray}>Paused</Badge>,
  'COMPLETED': <Badge color={Palette.green}>Done</Badge>,
}