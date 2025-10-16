export interface CreateProjectDTO {
  readonly title: string;
  readonly description: string;
  readonly ownerkey: string | undefined;
  readonly members: string[];
  readonly due_date: string;
}