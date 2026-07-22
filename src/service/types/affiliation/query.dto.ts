import type { OrgRole } from "../../../utils/enums/OrgRole";

export interface AffiliationQuery {
  readonly id?:      string,
  readonly orgkey?:  string,
  readonly userkey?: string,
  readonly role?:    OrgRole,
}
