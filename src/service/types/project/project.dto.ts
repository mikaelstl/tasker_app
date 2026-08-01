import type { ProjectMember } from "../member/member.dto";

export enum ProjectStage {
  STARTED = 'STARTED',
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  PAUSED = 'PAUSED',
  COMPLETED = 'COMPLETED',
}

export interface ProjectDTO {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly orgkey: string;
  readonly managerkey: string;
  readonly deadline: string;
  readonly started_at: string | null;
  readonly done_at: string | null;
  readonly delayed: boolean;
  readonly stage: ProjectStage;
  readonly created_at: string;
  readonly updated_at: string;

  // tasks: Task[]

  // checkpoints: Checkpoint[];

  // comments: Comment[];
}

export interface ProjectWithMembersDTO extends ProjectDTO {
  readonly members: ProjectMember[];
}
