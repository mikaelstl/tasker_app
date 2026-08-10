import type { AffiliationDTO } from "../affiliation/affiliation.dto";
import type { TaskDTO } from "../task/task.dto";

export interface MemberRecordDTO {
  readonly id: string;
  readonly projectkey: string;
  readonly userkey: string;
  readonly created_at: string;
  readonly updated_at: string;
}

export interface ProjectMember extends MemberRecordDTO {
  readonly user?: AffiliationDTO;
  readonly tasks: TaskDTO[];
}

export interface ProjectMemberWithTasks extends MemberRecordDTO {
  readonly tasks: TaskDTO[];
}
