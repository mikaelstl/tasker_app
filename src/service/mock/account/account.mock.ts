import type { AuthDTO } from "../../types/auth/auth.dto";
import type { LoginDTO } from "../../types/auth/login.dto";
import type { AccountDTO } from "../../types/account/account.dto";
import type { CreateAccountDTO } from "../../types/account/create.dto";
import type { CurrentAccountDTO } from "../../types/account/current-account.dto";
import type { ApiResponse } from "@/service/types/response/response";

import { mockData, createMockAccount, createMockAuth, createMockCurrentAccount, createMockId, createMockResponse } from "../data";
import { OrgRole } from "../../../utils/enums/OrgRole";
import type { AccountServiceI } from "../../modules/account/account.service";

export class AccountMockService implements AccountServiceI {
  async register(data: CreateAccountDTO): Promise<ApiResponse<AccountDTO>> {
    const account = createMockAccount({
      id: createMockId("account"),
      email: data.email,
      password: data.password,
    });

    mockData.accounts.push(account);

    return createMockResponse(account, "/accounts/register/");
  }

  async login(data: LoginDTO): Promise<ApiResponse<AuthDTO>> {
    const account = mockData.accounts.find((item) => item.email === data.email && item.password === data.password);

    if (!account) {
      return createMockResponse(mockData.auth, "/auth/login", "Account not found", 404, true);
    }

    const username = mockData.currentAccount.username ?? data.email.split("@")[0];
    const auth = createMockAuth({
      account: account.id,
      email: account.email,
      username,
      access_token: `mock-token-${account.id}`,
    });

    Object.assign(mockData.auth, auth);

    return createMockResponse(auth, "/auth/login");
  }

  async validate(): Promise<ApiResponse<boolean>> {
    const isValid = mockData.accounts.length > 0 && Boolean(mockData.auth.access_token);

    return createMockResponse(isValid, "/auth/validate");
  }

  async delete(id: string): Promise<ApiResponse<null>> {
    const index = mockData.accounts.findIndex((item) => item.id === id);

    if (index >= 0) {
      mockData.accounts.splice(index, 1);
    }

    return createMockResponse(null, `/accounts/del/${id}`);
  }

  buildCurrentAccount(auth: AuthDTO): CurrentAccountDTO {
    return createMockCurrentAccount({
      id: auth.account,
      email: auth.email,
      username: auth.username,
      role: mockData.currentAccount.role ?? OrgRole.OWNER,
    });
  }
}
