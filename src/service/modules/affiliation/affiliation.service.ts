import type { ApiResponse } from "@/service/types/response/response";
import type { AffiliationDTO } from "../../types/affiliation/affiliation.dto";
import type { UserOrganizationSummaryDTO } from "../../types/affiliation/summary.dto";
import type {
  OrganizationInviteCreateResponse,
  OrganizationInvitePreviewResponse,
  OrganizationInviteTokenDTO,
} from "../../types/affiliation/invite.dto";
import type { DefineAffiliationDTO } from "../../types/affiliation/define.dto";

import { ApiClient } from "@/service/api";

export interface APIMessage {
  readonly message: string;
}

export interface AffiliationServiceI {
  list(): Promise<ApiResponse<UserOrganizationSummaryDTO[]>>;
  listByOrganization(orgkey: string): Promise<ApiResponse<AffiliationDTO[]>>;
  find(id: string): Promise<ApiResponse<AffiliationDTO>>;
  create(data: DefineAffiliationDTO): Promise<ApiResponse<AffiliationDTO>>;
  participates(orgkey: string): Promise<ApiResponse<boolean>>;
  createInvite(orgkey: string): Promise<ApiResponse<OrganizationInviteCreateResponse>>;
  previewInvite(token: string): Promise<ApiResponse<OrganizationInvitePreviewResponse>>;
  acceptInvite(token: string): Promise<ApiResponse<AffiliationDTO>>;
  rejectInvite(token: string): Promise<ApiResponse<null>>;
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
    return this.api.register<DefineAffiliationDTO, AffiliationDTO>({
      route: "/affiliations",
      data,
    });
  }

  async list(): Promise<ApiResponse<UserOrganizationSummaryDTO[]>> {
    const response = await this.api.load<UserOrganizationSummaryDTO[], null>({
      route: "/affiliations",
    });

    return response;
  }

  async listByOrganization(orgkey: string): Promise<ApiResponse<AffiliationDTO[]>> {
    const response = await this.api.load<AffiliationDTO[], null>({
      route: `/affiliations/${orgkey}`,
    });

    return response;
  }

  async find(id: string): Promise<ApiResponse<AffiliationDTO>> {
    const response = await this.api.load<AffiliationDTO, void>({
      route: `/affiliations/find/${encodeURIComponent(id)}`,
    });

    return response;
  }

  async participates(orgkey: string): Promise<ApiResponse<boolean>> {
    const response = await this.api.load<boolean, void>({
      route: `/affiliations/participates/${encodeURIComponent(orgkey)}`,
    });

    return response;
  }

  async createInvite(orgkey: string): Promise<ApiResponse<OrganizationInviteCreateResponse>> {
    const response = await this.api.register<{ orgkey: string }, OrganizationInviteCreateResponse>({
      route: "/org/invites",
      data: { orgkey },
    });

    return response;
  }

  async previewInvite(token: string): Promise<ApiResponse<OrganizationInvitePreviewResponse>> {
    const response = await this.api.register<OrganizationInviteTokenDTO, OrganizationInvitePreviewResponse>({
      route: "/org/invites/preview",
      data: { token },
    });

    return response;
  }

  async acceptInvite(token: string): Promise<ApiResponse<AffiliationDTO>> {
    const response = await this.api.register<OrganizationInviteTokenDTO, AffiliationDTO>({
      route: "/org/invites/accept",
      data: { token },
    });

    return response;
  }

  async rejectInvite(token: string): Promise<ApiResponse<null>> {
    const response = await this.api.register<OrganizationInviteTokenDTO, null>({
      route: "/org/invites/reject",
      data: { token },
    });

    return response;
  }

  async delete(id: string): Promise<ApiResponse<null>> {
    const response = await this.api.remove<null>({
      route: `/affiliations/remove/${encodeURIComponent(id)}`,
    });

    return response;
  }

  async promote(id: string): Promise<ApiResponse<AffiliationDTO | APIMessage>> {
    const response = await this.api.change<void, AffiliationDTO | APIMessage>({
      route: `/affiliations/promote/${encodeURIComponent(id)}`,
    });

    return response;
  }

  async demote(id: string): Promise<ApiResponse<AffiliationDTO | APIMessage>> {
    const response = await this.api.change<void, AffiliationDTO | APIMessage>({
      route: `/affiliations/demote/${encodeURIComponent(id)}`,
    });

    return response;
  }
}
