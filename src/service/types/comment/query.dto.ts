export interface CommentQueryDTO {
  readonly id?: string;
  readonly content?: string;
  readonly date?: Date;
  readonly ownerkey?: string;
  readonly projectkey?: string;
}
