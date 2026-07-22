import type { OrgRole } from "../../../utils/enums/OrgRole";

export interface AffiliationEditDTO {
  readonly orgkey?:  string,
  readonly userkey?: string,
  readonly role?:    OrgRole,
}
