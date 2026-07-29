import Palette from "../../assets/palette";
import { Badge } from "../../components/badge/Badge";
import { OrgRole } from "../../utils/enums/OrgRole";

export function RoleBadge(role: OrgRole) {
  switch (role) {
    case OrgRole.MANAGER:
      return <Badge bg={Palette.yellow_25} text={Palette.yellow}>Gestor</Badge>;
    case OrgRole.OWNER:
      return <Badge bg={Palette.blue_50} text={Palette.blue}>Proprietário</Badge>;
    case OrgRole.MEMBER:
    default:
      return <Badge bg={Palette.gray_25} text={Palette.white}>Membro</Badge>;
  }
}
