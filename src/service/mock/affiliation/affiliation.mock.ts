import type { ApiResponse } from "@/service/types/response/response";
import type { DefineAffiliationDTO } from "../../types/affiliation/define.dto";
import type { AffiliationDTO } from "../../types/affiliation/affiliation.dto";
import type { UserOrganizationSummaryDTO } from "../../types/affiliation/summary.dto";
import { OrgRole } from "@/utils/enums/OrgRole";

import { mockData, createMockAffiliation, createMockId, createMockResponse } from "../data";
import type { AffiliationServiceI, APIMessage } from "../../modules/affiliation/affiliation.service";
import {
  createMockRequestError,
  requireMockCurrentAccount,
  requireMockOrgRequest,
} from "../request-context";

function nextRole(role: OrgRole, direction: "up" | "down"): OrgRole {
  if (direction === "up") {
    if (role === OrgRole.MEMBER) {
      return OrgRole.MANAGER;
    }

    return OrgRole.OWNER;
  }

  if (role === OrgRole.OWNER) {
    return OrgRole.MANAGER;
  }

  return OrgRole.MEMBER;
}

function buildSummary(username: string): UserOrganizationSummaryDTO[] {
  const userAffiliations = mockData.affiliations
    .filter((affiliation) => affiliation.userkey === username)
    .flatMap((currentAffiliation) => {
      const organization = mockData.organizations.find(
        (item) => item.id === currentAffiliation.orgkey,
      );

      if (!organization) {
        return [];
      }

      return [{
        orgkey: organization.id,
        role: currentAffiliation.role,
        name: organization.name,
        projects: mockData.projects.filter(
          (item) => item.ownerkey === organization.id,
        ).length,
        members: mockData.affiliations.filter(
          (item) => item.orgkey === organization.id,
        ).length,
      }];
    });

    return userAffiliations;
}

export class AffiliationMockService implements AffiliationServiceI {
  async create(data: DefineAffiliationDTO): Promise<ApiResponse<AffiliationDTO>> {
    const { orgkey } = requireMockOrgRequest("/affiliations", mockData.affiliations);

    if (data.orgkey !== orgkey) {
      throw createMockRequestError(
        "/affiliations",
        403,
        "A organização da requisição difere do header x-org-key.",
      );
    }

    const affiliation = createMockAffiliation({
      id: createMockId("affiliation"),
      orgkey: data.orgkey,
      userkey: data.userkey,
      role: data.role ?? OrgRole.MEMBER,
    });

    mockData.affiliations.push(affiliation);

    return createMockResponse(affiliation, "/affiliations");
  }

  async list(): Promise<ApiResponse<UserOrganizationSummaryDTO[]>> {
    const currentAccount = requireMockCurrentAccount("/affiliations");
    const summary = buildSummary(currentAccount.username);

    return createMockResponse(summary, "/affiliations");
  }

  async listByOrganization(orgkey: string): Promise<ApiResponse<AffiliationDTO[]>> {
    requireMockOrgRequest(`/affiliations/${orgkey}`, mockData.affiliations);

    const affiliations = mockData.affiliations.filter(
      (affiliation) => affiliation.orgkey === orgkey,
    );

    return createMockResponse(affiliations, `/affiliations/${orgkey}`);
  }

  async delete(id: string): Promise<ApiResponse<null>> {
    const { orgkey } = requireMockOrgRequest(`/affiliations/remove/${id}`, mockData.affiliations);
    const index = mockData.affiliations.findIndex((item) => item.id === id);

    if (index >= 0 && mockData.affiliations[index].orgkey !== orgkey) {
      throw createMockRequestError(
        `/affiliations/remove/${id}`,
        403,
        "A afiliação não pertence à organização acessada.",
      );
    }

    if (index >= 0) {
      mockData.affiliations.splice(index, 1);
    }

    return createMockResponse(null, `/affiliations/remove/${id}`);
  }

  async promote(id: string): Promise<ApiResponse<AffiliationDTO | APIMessage>> {
    const { orgkey } = requireMockOrgRequest(`/affiliations/promote/${id}`, mockData.affiliations);
    const affiliation = mockData.affiliations.find((item) => item.id === id);

    if (!affiliation) {
      return createMockResponse({ message: "Vínculo não encontrado" }, `/affiliations/promote/${id}`, "Vínculo não encontrado", 404, true);
    }

    if (affiliation.orgkey !== orgkey) {
      throw createMockRequestError(
        `/affiliations/promote/${id}`,
        403,
        "A afiliação não pertence à organização acessada.",
      );
    }

    affiliation.role = nextRole(affiliation.role, "up");

    return createMockResponse(affiliation, `/affiliations/promote/${id}`);
  }

  async demote(id: string): Promise<ApiResponse<AffiliationDTO | APIMessage>> {
    const { orgkey } = requireMockOrgRequest(`/affiliations/demote/${id}`, mockData.affiliations);
    const affiliation = mockData.affiliations.find((item) => item.id === id);

    if (!affiliation) {
      return createMockResponse({ message: "Vínculo não encontrado" }, `/affiliations/demote/${id}`, "Vínculo não encontrado", 404, true);
    }

    if (affiliation.orgkey !== orgkey) {
      throw createMockRequestError(
        `/affiliations/demote/${id}`,
        403,
        "A afiliação não pertence à organização acessada.",
      );
    }

    affiliation.role = nextRole(affiliation.role, "down");

    return createMockResponse(affiliation, `/affiliations/demote/${id}`);
  }
}
