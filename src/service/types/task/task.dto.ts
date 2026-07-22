import type { TaskPriority } from "./priority.dto";
import type { TaskStage } from "./stage.dto";
import type { MemberRecordDTO } from "../member/member.dto";

export interface TaskDTO {
  readonly id: string;
  readonly code: string;
  readonly name: string;
  readonly description: string;
  readonly projectkey: string;
  readonly ownerkey: string;
  readonly stage: TaskStage;
  readonly priority: TaskPriority;
  readonly deadline: string;
  readonly started_at: string | null;
  readonly done_at: string | null;
  readonly delayed: boolean;
  readonly created_at: string;
  readonly updated_at: string;
}

export interface TaskWithOwnerDTO extends TaskDTO {
  readonly owner: MemberRecordDTO;
}
