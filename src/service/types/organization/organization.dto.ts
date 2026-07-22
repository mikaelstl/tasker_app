import type { AffiliationDTO } from "../affiliation/affiliation.dto";
import type { ProjectDTO } from "../project/project.dto";
import type { UserDTO } from "../user/user.dto";


export interface OrganizationDTO {
  readonly id:                 string;
  readonly name:               string;
  readonly ownerkey:           string;

  readonly owner?:             UserDTO;
  readonly projects?:          ProjectDTO[];
  readonly members?:           AffiliationDTO[];

  readonly created_at:         string;
  readonly updated_at:         string;
}
