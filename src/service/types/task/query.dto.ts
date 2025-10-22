import type { TaskPriority } from "./priority.dto";
import type { TaskStage } from "./stage.dto";

export interface TaskQueryDTO {
  readonly code?: string;
  readonly name?: string;
  readonly projectkey?: string;
  readonly ownerkey?: string;
  readonly stage?: TaskStage;
  readonly priority?: TaskPriority;
  readonly due_date?: Date;
}