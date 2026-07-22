import type { ApiResponse } from "@/service/types/response/response";
import type { CreateUserDTO } from "../../types/user/create.dto";
import type { UserDTO } from "../../types/user/user.dto";

import { ApiClient } from "@/service/api";

export interface UserQueryDTO {
  readonly id?: string;
  readonly name?: string;
  readonly username?: string;
  readonly accountkey?: string;
}

export interface UserServiceI {
  create(data: CreateUserDTO): Promise<ApiResponse<UserDTO>>;
  list(): Promise<ApiResponse<UserDTO[]>>;
  find(params: UserQueryDTO): Promise<ApiResponse<UserDTO>>;
  delete(username: string): Promise<ApiResponse<UserDTO>>;
}

export class UserService implements UserServiceI {
  private readonly api: ApiClient;

  constructor(api: ApiClient) {
    this.api = api;
  }

  async create(data: CreateUserDTO): Promise<ApiResponse<UserDTO>> {
    const response = await this.api.register<CreateUserDTO, UserDTO>({
      route: "/users",
      data,
    });

    return response;
  }

  async list(): Promise<ApiResponse<UserDTO[]>> {
    const response = await this.api.load<UserDTO[], void>({
      route: "/users",
    });

    return response;
  }

  async find(params: UserQueryDTO): Promise<ApiResponse<UserDTO>> {
    const response = await this.api.load<UserDTO, UserQueryDTO>({
      route: "/users",
      params,
    });

    return response;
  }

  async delete(username: string): Promise<ApiResponse<UserDTO>> {
    const response = await this.api.remove<UserDTO>({
      route: `/users/del/${encodeURIComponent(username)}`,
    });

    return response;
  }
}
