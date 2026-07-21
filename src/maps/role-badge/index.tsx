import Palette from "../../assets/palette";
import { Badge } from "../../components/badge/Badge";
import type { OrgRole } from "../../utils/enums/OrgRole";

type RoleBadgeType = {
  [k in OrgRole]: React.ReactNode
}

export const RoleBadge: RoleBadgeType = {
  'MANAGER': <Badge color={Palette.yellow_50}>Gestor</Badge>,
  'OWNER': <Badge color={Palette.blue_50}>Proprietário</Badge>,
  'MEMBER': <Badge color={Palette.gray_50}>Membro</Badge>,
}
