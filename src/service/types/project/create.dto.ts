export interface CreateProjectDTO {
  readonly title: string;
  readonly description: string;
  readonly priority?: string;
  readonly deadline: string;
}
