import type { AffiliationDTO } from "../affiliation/affiliation.dto";
import type { TaskDTO } from "../task/task.dto";
import type { MemberRole } from "./role.dto";

export interface ProjectMember {
  readonly id: string;
  readonly projectkey: string;
  readonly userkey: string;
  readonly user?: AffiliationDTO;
  readonly role: MemberRole;
  readonly tasks: TaskDTO[];
  readonly created_at: string;
  readonly updated_at: string;
}
