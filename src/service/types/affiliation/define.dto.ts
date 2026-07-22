import type { OrgRole } from "../../../utils/enums/OrgRole";

export interface DefineAffiliationDTO {
  orgkey: string
  userkey: string
  role?: OrgRole
}
