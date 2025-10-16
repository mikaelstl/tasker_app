import type { TaskPriority } from "./priority.dto";

export interface TaskCreateDTO {
  readonly code: string;
  readonly name: string;
  readonly description: string;
  readonly project: string;
  readonly owner: string;
  readonly priority: TaskPriority;
  readonly due_date: string;
}