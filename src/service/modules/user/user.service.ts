import type { ApiResponse } from "@/service/types/response/response";
import type { CreateUserDTO } from "../../types/user/create.dto";
import type { UserQueryDTO } from "../../types/user/query.dto";
import type { UserDTO, UserProfileDTO } from "../../types/user/user.dto";

import { ApiClient } from "@/service/api";

export interface UserServiceI {
  create(data: CreateUserDTO): Promise<ApiResponse<UserDTO>>;
  list(): Promise<ApiResponse<UserDTO[]>>;
  find(params: UserQueryDTO): Promise<ApiResponse<UserDTO>>;
  me(): Promise<ApiResponse<UserProfileDTO>>;
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

  async me(): Promise<ApiResponse<UserProfileDTO>> {
    const response = await this.api.load<UserProfileDTO, void>({
      route: "/users/me",
    });

    return response;
  }
}
