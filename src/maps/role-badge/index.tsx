import styled from "styled-components";
import Palette from "../../assets/palette";
import { Badge } from "../../components/badge/Badge";
import type { OrgRole } from "../../utils/enums/OrgRole";

const RoleBadgeBase = styled(Badge)`
  grid-area: badge;
  justify-self: end;
  align-self: start;

  padding: 2px 8px;
  border-radius: 4px;

  color: ${Palette.white};
  font-size: 11px;
  font-weight: 700;
  line-height: 1.2;
  text-transform: uppercase;
`;

export const RoleBadge: Record<OrgRole, JSX.Element> = {
  OWNER: <RoleBadgeBase color={Palette.blue}>OWNER</RoleBadgeBase>,
  MANAGER: <RoleBadgeBase color={Palette.green}>MANAGER</RoleBadgeBase>,
  MEMBER: <RoleBadgeBase color={Palette.gray}>MEMBER</RoleBadgeBase>,
};
