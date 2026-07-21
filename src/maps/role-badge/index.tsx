import Palette from "../../assets/palette";
import { Badge } from "../../components/badge/Badge";
import type { OrgRole } from "../../utils/enums/OrgRole";

type RoleBadgeType = {
  [k in OrgRole]: React.ReactNode
}

export const RoleBadge: RoleBadgeType = {
  'MANAGER': <Badge bg={Palette.yellow_25} text={Palette.yellow}>Gestor</Badge>,
  'OWNER': <Badge bg={Palette.blue_50} text={Palette.blue}>Proprietário</Badge>,
  'MEMBER': <Badge bg={Palette.gray_25} text={Palette.white}>Membro</Badge>,
}
