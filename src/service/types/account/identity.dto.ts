export interface AccountIdentityDTO {
  account: {
    id: string;
    email: string;
    created_at: string;
    updated_at: string;
  };
  user: {
    id: string;
    name: string;
    username: string;
    accountkey: string;
    created_at: string;
    updated_at: string;
  };
}
