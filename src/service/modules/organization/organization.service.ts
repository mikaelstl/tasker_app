import type { ApiResponse } from "@/service/types/response/response";
import type { OrganizationCreateDTO } from "../../types/organization/create.dto";
import type { OrganizationDTO } from "../../types/organization/organization.dto";

import { ApiClient } from "@/service/api";

export interface OrganizationServiceI {
  create(data: OrganizationCreateDTO): Promise<ApiResponse<OrganizationDTO>>;
  delete(id: string): Promise<ApiResponse<OrganizationDTO>>;
}

export class OrganizationService implements OrganizationServiceI {
  private readonly api: ApiClient;

  constructor(api: ApiClient) {
    this.api = api;
  }

  async create(data: OrganizationCreateDTO): Promise<ApiResponse<OrganizationDTO>> {
    const response = await this.api.register<OrganizationCreateDTO, OrganizationDTO>({
      route: "/org",
      data,
    });

    return response;
  }

  async delete(id: string): Promise<ApiResponse<OrganizationDTO>> {
    const response = await this.api.remove<OrganizationDTO>({
      route: `/org/del/${id}`,
    });

    return response;
  }
}
