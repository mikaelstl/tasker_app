import type { ProjectProgress } from "./project.dto";

export interface ProjectQueryDTO {
  readonly id?: string;
  readonly title?: string;
  readonly description?: string;
  readonly ownerkey?: string;
  readonly due_date?: Date;
  readonly progress?: ProjectProgress;
}