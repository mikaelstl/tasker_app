import type { TaskPriority } from "./priority.dto";
import type { TaskStage } from "./stage.dto";

export interface EditTaskDTO {
  readonly name?: string;
  readonly description?: string;
  readonly priority?: TaskPriority;
  readonly stage?: TaskStage;
  readonly deadline?: string;
}
