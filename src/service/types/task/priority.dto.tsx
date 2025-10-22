import Palette from "../../../assets/palette";

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

interface ITaskPriorityOption {
  [key: string]: TaskPriorityOptionDesign
}

export const TaskPriorityOption: ITaskPriorityOption = {
  'LOW': { backgroud: Palette.items, details: Palette.gray } as TaskPriorityOptionDesign,
  'MEDIUM': { backgroud: Palette.lightBlueT, details: Palette.lightBlue } as TaskPriorityOptionDesign,
  'HIGH':  { backgroud: Palette.lightYellowT, details: Palette.lightYellow } as TaskPriorityOptionDesign,
  'EXTREME':  { backgroud: Palette.lightRedT, details: Palette.lightRed } as TaskPriorityOptionDesign,
}