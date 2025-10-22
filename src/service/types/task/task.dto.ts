import type { TaskPriority } from "./priority.dto";
import type { TaskStage } from "./stage.dto";

export interface TaskDTO {
  readonly id: string;
  readonly code: string;
  readonly name: string;
  readonly description: string;
  readonly project: string;
  readonly owner: string;
  readonly stage: TaskStage;
  readonly priority: TaskPriority;
  readonly due_date: string;
}