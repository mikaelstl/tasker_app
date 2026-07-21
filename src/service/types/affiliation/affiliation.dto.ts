import type { OrgRole } from "../../../utils/enums/OrgRole";
import type { OrganizationDTO } from "../organization/organization.dto";
import type { UserDTO } from "../user/user.dto";

export interface AffiliationDTO {
  readonly id:      string,
  readonly orgkey:  string,
  readonly userkey: string,
  readonly org?: OrganizationDTO,
  readonly user?: UserDTO,
  role:    OrgRole,
  readonly created_at: string,
  readonly updated_at: string,
}
