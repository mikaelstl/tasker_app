import type { AuthDTO } from "../../types/auth/auth.dto";
import type { LoginDTO } from "../../types/auth/login.dto";
import type { AccountDTO } from "../../types/account/account.dto";
import type { CreateAccountDTO } from "../../types/account/create.dto";
import type { CurrentAccountDTO } from "../../types/account/current-account.dto";

import { ApiClient } from "@/service/api";
import type { ApiResponse } from "@/service/types/response/response";

export interface AccountServiceI {
  register(data: CreateAccountDTO): Promise<ApiResponse<AccountDTO>>;
  login(data: LoginDTO): Promise<ApiResponse<AuthDTO>>;
  validate(): Promise<ApiResponse<boolean>>;
  delete(id: string): Promise<ApiResponse<null>>;
  buildCurrentAccount(auth: AuthDTO): CurrentAccountDTO;
}

export class AccountService implements AccountServiceI {
  private readonly api: ApiClient;

  constructor(api: ApiClient) {
    this.api = api;
  }

  async register(data: CreateAccountDTO): Promise<ApiResponse<AccountDTO>> {
    const response = await this.api.register<CreateAccountDTO, AccountDTO>({
      route: "/accounts/register/",
      data,
    });

    return response;
  }

  async login(data: LoginDTO): Promise<ApiResponse<AuthDTO>> {
    const response = await this.api.register<LoginDTO, AuthDTO>({
      route: "/auth/login",
      data,
    });

    return response;
  }

  async validate(): Promise<ApiResponse<boolean>> {
    const response = await this.api.load<boolean, void>({ route: "/auth/validate" });

    return response;
  }

  async delete(id: string): Promise<ApiResponse<null>> {
    const response = await this.api.remove<null>({route: `/accounts/del/${id}`});

    return response;
  }

  buildCurrentAccount(auth: AuthDTO): CurrentAccountDTO {
    const response = {
      id: auth.account,
      email: auth.email,
      username: auth.username,
    };

    return response;
  }
}
