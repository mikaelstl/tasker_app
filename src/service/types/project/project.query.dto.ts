import type { ProjectStage } from "./project.dto";

export interface ProjectQueryDTO {
  readonly id?: string;
  readonly title?: string;
  readonly description?: string;
  readonly orgkey?: string;
  readonly due_date?: Date;
  readonly stage?: ProjectStage;
}
