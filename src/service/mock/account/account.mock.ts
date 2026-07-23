import type { AuthDTO } from "../../types/auth/auth.dto";
import type { LoginDTO } from "../../types/auth/login.dto";
import type { AccountDTO } from "../../types/account/account.dto";
import type { CreateAccountDTO } from "../../types/account/create.dto";
import type { CurrentAccountDTO } from "../../types/account/current-account.dto";
import type { ApiResponse } from "@/service/types/response/response";
import type { EditAccountDTO } from "../../types/account/edit.dto";
import type { AccountIdentityDTO } from "../../types/account/identity.dto";

import { mockData, createMockAccount, createMockAuth, createMockCurrentAccount, createMockId, createMockResponse } from "../data";
import type { AccountServiceI } from "../../modules/account/account.service";
import { createMockRequestError, readMockRequestContext, requireMockCurrentAccount } from "../request-context";

export class AccountMockService implements AccountServiceI {
  async apiStatus(): Promise<ApiResponse<{ activated: boolean }>> {
    return createMockResponse({ activated: true }, "/status", "API disponível.");
  }

  async authStatus(): Promise<ApiResponse<null>> {
    return createMockResponse(null, "/auth", "Autenticação disponível.");
  }

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
      throw createMockRequestError("/auth/login", 401, "E-mail ou senha inválidos.");
    }

    const user = mockData.users.find((item) => item.accountkey === account.id);

    if (!user) {
      throw createMockRequestError("/auth/login", 404, "Usuário não encontrado.");
    }

    const auth = createMockAuth({
      account: account.id,
      email: account.email,
      username: user.username,
      access_token: `mock-token-${account.id}`,
    });

    Object.assign(mockData.auth, auth);

    return createMockResponse(auth, "/auth/login");
  }

  async validate(): Promise<ApiResponse<boolean>> {
    const { currentAccount, token } = readMockRequestContext();
    const isValid = Boolean(
      currentAccount
      && token
      && token === `mock-token-${currentAccount.id}`
      && mockData.accounts.some((account) => account.id === currentAccount.id)
      && mockData.users.some(
        (user) => user.accountkey === currentAccount.id && user.username === currentAccount.username,
      ),
    );

    return createMockResponse(isValid, "/auth/validate");
  }

  async edit(data: EditAccountDTO): Promise<ApiResponse<AccountIdentityDTO>> {
    const currentAccount = requireMockCurrentAccount("/accounts/me");
    const account = mockData.accounts.find((item) => item.id === currentAccount.id);
    const user = mockData.users.find((item) => item.accountkey === currentAccount.id);

    if (!account || !user) {
      throw createMockRequestError("/accounts/me", 404, "Identidade não encontrada.");
    }

    if (data.email && mockData.accounts.some((item) => item.id !== account.id && item.email === data.email)) {
      throw createMockRequestError("/accounts/me", 409, "E-mail já está em uso.");
    }
    if (data.username && mockData.users.some((item) => item.id !== user.id && item.username === data.username)) {
      throw createMockRequestError("/accounts/me", 409, "Nome de usuário já está em uso.");
    }

    const oldUsername = user.username;
    const timestamp = new Date().toISOString();
    if (data.name !== undefined) Object.assign(user, { name: data.name, updated_at: timestamp });
    if (data.username !== undefined) Object.assign(user, { username: data.username, updated_at: timestamp });
    if (data.email !== undefined) Object.assign(account, { email: data.email, updated_at: timestamp });
    if (data.password !== undefined) Object.assign(account, { password: data.password, updated_at: timestamp });

    if (data.username && data.username !== oldUsername) {
      mockData.affiliations.forEach((item) => {
        if (item.userkey === oldUsername) Object.assign(item, { userkey: data.username });
      });
      mockData.organizations.forEach((item) => {
        if (item.ownerkey === oldUsername) Object.assign(item, { ownerkey: data.username });
      });
      mockData.comments.forEach((item) => {
        if (item.ownerkey === oldUsername) Object.assign(item, { ownerkey: data.username });
      });
    }

    return createMockResponse({
      account: {
        id: account.id,
        email: account.email,
        created_at: account.created_at,
        updated_at: account.updated_at,
      },
      user: {
        id: user.id ?? "",
        name: user.name,
        username: user.username,
        accountkey: user.accountkey,
        created_at: user.created_at,
        updated_at: user.updated_at,
      },
    }, "/accounts/me", "Identidade atualizada.");
  }

  async delete(): Promise<ApiResponse<null>> {
    const currentAccount = requireMockCurrentAccount("/accounts/me");
    const user = mockData.users.find((item) => item.accountkey === currentAccount.id);
    const ownsOrganization = user && mockData.organizations.some((item) => item.ownerkey === user.username);

    if (ownsOrganization) {
      throw createMockRequestError(
        "/accounts/me",
        409,
        "Transfira a responsabilidade pelas organizações antes de excluir a conta.",
      );
    }

    const index = mockData.accounts.findIndex((item) => item.id === currentAccount.id);

    if (index >= 0) {
      mockData.accounts.splice(index, 1);
    }

    if (user) {
      mockData.affiliations = mockData.affiliations.filter((item) => item.userkey !== user.username);
      mockData.users = mockData.users.filter((item) => item.id !== user.id);
    }

    return createMockResponse(null, "/accounts/me", "Identidade excluída.");
  }

  buildCurrentAccount(auth: AuthDTO): CurrentAccountDTO {
    const currentAccount = createMockCurrentAccount({
      id: auth.account,
      email: auth.email,
      username: auth.username,
    });

    Object.assign(mockData.currentAccount, currentAccount);

    return currentAccount;
  }
}
