export enum ProjectProgress {
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
  readonly ownerkey: string;
  readonly due_date: string;
  readonly progress: ProjectProgress;

  // members: ProjectMember[];

  // tasks: Task[]

  // checkpoints: Checkpoint[];

  // comments: Comment[];
}