export interface CreateProjectDTO {
  readonly title: string;
  readonly description: string;
  readonly ownerkey: string | undefined;
  readonly due_date: string;
}