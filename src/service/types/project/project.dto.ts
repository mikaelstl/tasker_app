export enum ProjectProgress {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  PAUSED='PAUSED',
  COMPLETED = 'COMPLETED',
}

export interface ProjectDTO {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly ownerkey: string;
  readonly due_date: string;
  readonly progress: ProjectProgress;

  // members: ProjectMember[];

  // tasks: Task[]

  // checkpoints: Checkpoint[];

  // comments: Comment[];
}