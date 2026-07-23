export type UserDTO = {
  readonly id?: string;
  readonly name: string;
  readonly username: string;
  readonly accountkey: string;
  readonly created_at: string;
  readonly updated_at: string;
}

export type UserProfileDTO = {
  readonly name: string;
  readonly username: string;
  readonly email: string;
}
