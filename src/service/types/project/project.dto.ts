import type { ProjectMember } from "../member/member.dto";

export enum ProjectStage {
  OVERDUE = 'OVERDUE',
  STARTED = 'STARTED',
  REVIEW = 'REVIEW',
  PENDING = 'PENDING',
  DONE = 'DONE',
}

export interface ProjectDTO {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly orgkey: string;
  readonly managerkey: string | null;
  readonly due_date: string;
  readonly stage: ProjectStage;
  readonly members?: ProjectMember[];
  readonly created_at: string;
  readonly updated_at: string;

  // tasks: Task[]

  // checkpoints: Checkpoint[];

  // comments: Comment[];
}
