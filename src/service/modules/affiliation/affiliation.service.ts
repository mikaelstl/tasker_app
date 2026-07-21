import type { ApiResponse } from "@/service/types/response/response";
import type { DefineAffiliationDTO } from "../../types/affiliation/define.dto";
import type { AffiliationDTO } from "../../types/affiliation/affiliation.dto";
import type { UserOrganizationSummaryDTO } from "../../types/affiliation/summary.dto";

import { ApiClient } from "@/service/api";

export interface APIMessage {
  readonly message: string;
}

export interface AffiliationServiceI {
  create(data: DefineAffiliationDTO): Promise<ApiResponse<AffiliationDTO>>;
  list(): Promise<ApiResponse<UserOrganizationSummaryDTO[]>>;
  listByOrganization(orgkey: string): Promise<ApiResponse<AffiliationDTO[]>>;
  delete(id: string): Promise<ApiResponse<null>>;
  promote(id: string): Promise<ApiResponse<AffiliationDTO | APIMessage>>;
  demote(id: string): Promise<ApiResponse<AffiliationDTO | APIMessage>>;
}

export class AffiliationService implements AffiliationServiceI {
  private readonly api: ApiClient;

  constructor(api: ApiClient) {
    this.api = api;
  }

  async create(data: DefineAffiliationDTO): Promise<ApiResponse<AffiliationDTO>> {
    const response = await this.api.register<DefineAffiliationDTO, AffiliationDTO>({
      route: "/affiliations",
      data,
    });

    return response;
  }

  async list(): Promise<ApiResponse<UserOrganizationSummaryDTO[]>> {
    const response = await this.api.load<UserOrganizationSummaryDTO[], void>({
      route: "/affiliations",
    });

    return response;
  }

  async listByOrganization(orgkey: string): Promise<ApiResponse<AffiliationDTO[]>> {
    const response = await this.api.load<AffiliationDTO[], void>({
      route: `/affiliations/${orgkey}`,
    });

    return response;
  }

  async delete(id: string): Promise<ApiResponse<null>> {
    const response = await this.api.remove<null>({
      route: `/affiliations/remove/${id}`,
    });

    return response;
  }

  async promote(id: string): Promise<ApiResponse<AffiliationDTO | APIMessage>> {
    const response = await this.api.change<void, AffiliationDTO | APIMessage>({
      route: `/affiliations/promote/${id}`,
    });

    return response;
  }

  async demote(id: string): Promise<ApiResponse<AffiliationDTO | APIMessage>> {
    const response = await this.api.change<void, AffiliationDTO | APIMessage>({
      route: `/affiliations/demote/${id}`,
    });

    return response;
  }
}
