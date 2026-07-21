import type { ApiResponse } from "@/service/types/response/response";
import type { AffiliationDTO } from "../../types/affiliation/affiliation.dto";
import type { UserOrganizationSummaryDTO } from "../../types/affiliation/summary.dto";
import type { AffiliationInviteDTO } from "../../types/affiliation/invite.dto";

import { ApiClient } from "@/service/api";

export interface APIMessage {
  readonly message: string;
}

export interface AffiliationServiceI {
  list(): Promise<ApiResponse<UserOrganizationSummaryDTO[]>>;
  participates(orgkey: string): Promise<ApiResponse<boolean>>;
  listByOrganization(orgkey: string): Promise<ApiResponse<AffiliationDTO[]>>;
  createInvite(orgkey: string): Promise<ApiResponse<AffiliationInviteDTO>>;
  acceptInvite(token: string): Promise<ApiResponse<AffiliationDTO>>;
  delete(id: string): Promise<ApiResponse<null>>;
  promote(id: string): Promise<ApiResponse<AffiliationDTO | APIMessage>>;
  demote(id: string): Promise<ApiResponse<AffiliationDTO | APIMessage>>;
}

export class AffiliationService implements AffiliationServiceI {
  private readonly api: ApiClient;

  constructor(api: ApiClient) {
    this.api = api;
  }

  async list(): Promise<ApiResponse<UserOrganizationSummaryDTO[]>> {
    const response = await this.api.load<UserOrganizationSummaryDTO[], void>({
      route: "/affiliations",
    });

    return response;
  }

  async participates(orgkey: string): Promise<ApiResponse<boolean>> {
    const response = await this.api.load<boolean, void>({
      route: `/affiliations/participates/${orgkey}`,
    });

    return response;
  }

  async listByOrganization(orgkey: string): Promise<ApiResponse<AffiliationDTO[]>> {
    const response = await this.api.load<AffiliationDTO[], void>({
      route: `/affiliations/${orgkey}`,
    });

    return response;
  }

  async createInvite(orgkey: string): Promise<ApiResponse<AffiliationInviteDTO>> {
    const response = await this.api.register<{ orgkey: string }, AffiliationInviteDTO>({
      route: "/affiliations/invites",
      data: { orgkey },
    });

    return response;
  }

  async acceptInvite(token: string): Promise<ApiResponse<AffiliationDTO>> {
    const response = await this.api.register<void, AffiliationDTO>({
      route: `/affiliations/invites/${token}/accept`,
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
