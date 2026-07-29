import type { ApiResponse } from "@/service/types/response/response";
import type { CreateUserDTO } from "../../types/user/create.dto";
import type { UserQueryDTO } from "../../types/user/query.dto";
import type { UserDTO, UserProfileDTO } from "../../types/user/user.dto";

import { mockData, createMockId, createMockResponse, createMockUser } from "../data";
import type { UserServiceI } from "../../modules/user/user.service";
import { createMockRequestError, requireMockCurrentAccount } from "../request-context";

export class UserMockService implements UserServiceI {
  async create(data: CreateUserDTO): Promise<ApiResponse<UserDTO>> {
    const user = createMockUser({
      id: createMockId("user"),
      name: data.name,
      username: data.username,
      accountkey: data.accountkey,
    });

    mockData.users.push(user);

    return createMockResponse(user, "/users");
  }

  async list(): Promise<ApiResponse<UserDTO[]>> {
    return createMockResponse([...mockData.users], "/users");
  }

  async find(params: UserQueryDTO): Promise<ApiResponse<UserDTO>> {
    const user = mockData.users.find((item) => {
      if (params.id && item.id !== params.id) {
        return false;
      }

      if (params.name && item.name !== params.name) {
        return false;
      }

      if (params.username && item.username !== params.username) {
        return false;
      }

      if (params.accountkey && item.accountkey !== params.accountkey) {
        return false;
      }

      return true;
    });

    return createMockResponse(user ?? createMockUser(), "/users", user ? "OK" : "Usuário não encontrado", user ? 200 : 404, !user);
  }

  async me(): Promise<ApiResponse<UserProfileDTO>> {
    const currentAccount = requireMockCurrentAccount("/users/me");
    const account = mockData.accounts.find((item) => item.id === currentAccount.id);
    const user = mockData.users.find((item) => item.accountkey === currentAccount.id);

    if (!account || !user) {
      throw createMockRequestError("/users/me", 404, "Usuário não encontrado.");
    }

    return createMockResponse({
      name: user.name,
      username: user.username,
      email: account.email,
    }, "/users/me");
  }
}
