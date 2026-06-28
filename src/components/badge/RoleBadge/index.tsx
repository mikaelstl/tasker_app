import type { OrgRole } from "@/utils/enums/OrgRole";
import { Badge } from "@/components/badge/Badge";
import Palette from "@/assets/palette";

type RoleBadgesType = {
  [k in OrgRole]: React.ReactNode
}

export const RoleBadges: RoleBadgesType = {
  OWNER: <Badge color={Palette.blue_50}>Owner</Badge>,
  MANAGER: <Badge color={Palette.yellow_50}>Manager</Badge>,
  MEMBER: <Badge color={Palette.gray_50}>Member</Badge>,
}