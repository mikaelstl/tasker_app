import type { OrgRole } from "../../../utils/enums/OrgRole";
import type { OrganizationDTO } from "../organization/organization.dto";

export interface AffiliationDTO {
  readonly id:      string,
  readonly orgkey:  string,
  readonly userkey: string,
  readonly org?: OrganizationDTO,
  readonly user?: OrganizationDTO,
  role:    OrgRole,
}