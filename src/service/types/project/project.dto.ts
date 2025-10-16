export type ProjectProgress = 'PENDING' | 'IN_PROGRESS' | 'PAUSED' | 'COMPLETED';

export interface ProjectDTO {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly owner: string;
  readonly due_date: Date;
  readonly progress: ProjectProgress;

  // members: ProjectMember[];

  // tasks: Task[]

  // checkpoints: Checkpoint[];

  // comments: Comment[];
}