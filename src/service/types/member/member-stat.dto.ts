export interface MemberStatDTO {
  readonly username: string;
  readonly project: string;
  readonly started: number;
  readonly review: number;
  readonly done: number;
  readonly overdue: number;
}
