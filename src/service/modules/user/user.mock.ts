import type { ApiResponse } from "@/service/types/response/response";
import type { CreateUserDTO } from "../../types/user/create.dto";
import type { UserDTO } from "../../types/user/user.dto";

import { mockData, createMockId, createMockResponse, createMockUser } from "../../mocks/data";
import type { UserServiceI } from "./user.service";

export interface UserQueryDTO {
  readonly id?: string;
  readonly name?: string;
  readonly username?: string;
  readonly accountkey?: string;
}

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

    return createMockResponse(user ?? createMockUser(), "/users", user ? "OK" : "User not found", user ? 200 : 404, !user);
  }

  async delete(username: string): Promise<ApiResponse<UserDTO>> {
    const index = mockData.users.findIndex((item) => item.username === username);
    const user = index >= 0 ? mockData.users[index] : createMockUser();

    if (index >= 0) {
      mockData.users.splice(index, 1);
    }

    return createMockResponse(user, `/users/del/${username}`);
  }
}
