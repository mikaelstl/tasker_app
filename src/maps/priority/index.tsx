import type { OrgRole } from "@/utils/enums/OrgRole";
import Palette from "../../assets/palette";
import { Badge } from "../../components/badge/Badge";

type RoleBadgeType = {
  [k in OrgRole]: React.ReactNode
}

export const RoleBadge: RoleBadgeType = {
  'MANAGER': <Badge color={Palette.yellow_50}>HIGH</Badge>,
  'OWNER': <Badge color={Palette.blue_50}>MEDIUM</Badge>,
  'MEMBER': <Badge color={Palette.gray_50}>LOW</Badge>,
}