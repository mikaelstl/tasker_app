import type { ProjectStage } from "./project.dto";

export interface ProjectQueryDTO {
  readonly id?: string;
  readonly title?: string;
  readonly description?: string;
  readonly orgkey?: string;
  readonly managerkey?: string;
  readonly deadline?: string;
  readonly stage?: ProjectStage;
  readonly delayed?: boolean;
}
