import type { TaskPriority } from "./priority.dto";

export interface CreateTaskDTO {
  readonly name: string;
  readonly description: string;
  readonly project: string;
  readonly owner: string;
  readonly priority: TaskPriority;
  readonly due_date: Date;
}