export enum TaskPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  EXTREME = 'EXTREME',
}

export type TaskPriorityType = keyof typeof TaskPriority;

export interface TaskPriorityOptionDesign {
  backgroud: string;
  details: string;
}
