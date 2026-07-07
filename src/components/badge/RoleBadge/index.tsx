import type { OrgRole } from "@/utils/enums/OrgRole";
import { Badge } from "@/components/ui/badge";

type RoleBadgesType = {
  [k in OrgRole]: React.ReactNode
}

export const RoleBadges: RoleBadgesType = {
  OWNER: <Badge variant='default'>Owner</Badge>,
  MANAGER: <Badge variant='warning'>Manager</Badge>,
  MEMBER: <Badge variant='outline'>Member</Badge>,
}
