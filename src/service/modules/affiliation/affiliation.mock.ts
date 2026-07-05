import type { ApiResponse } from "@/service/types/response/response";
import type { DefineAffiliationDTO } from "../../types/affiliation/define.dto";
import type { AffiliationDTO } from "../../types/affiliation/affiliation.dto";
import type { UserOrganizationSummaryDTO } from "../../types/affiliation/summary.dto";
import { OrgRole } from "@/utils/enums/OrgRole";

import { mockData, createMockAffiliation, createMockId, createMockResponse } from "../../mocks/data";
import type { AffiliationServiceI } from "./affiliation.service";

export interface APIMessage {
  readonly message: string;
}

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

function buildSummary(): UserOrganizationSummaryDTO[] {
  return mockData.organizations.map((organization) => {
    const affiliations = mockData.affiliations.filter((item) => item.orgkey === organization.id);

    return {
      orgkey: organization.id,
      role: affiliations[0]?.role ?? OrgRole.MEMBER,
      name: organization.name,
      projects: organization.projects?.length ?? mockData.projects.filter((item) => item.ownerkey === organization.ownerkey).length,
      members: organization.members?.length ?? affiliations.length,
    };
  });
}

export class AffiliationMockService implements AffiliationServiceI {
  async create(data: DefineAffiliationDTO): Promise<ApiResponse<AffiliationDTO>> {
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
    return createMockResponse(buildSummary(), "/affiliations");
  }

  async delete(id: string): Promise<ApiResponse<null>> {
    const index = mockData.affiliations.findIndex((item) => item.id === id);

    if (index >= 0) {
      mockData.affiliations.splice(index, 1);
    }

    return createMockResponse(null, `/affiliations/remove/${id}`);
  }

  async promote(id: string): Promise<ApiResponse<AffiliationDTO | APIMessage>> {
    const affiliation = mockData.affiliations.find((item) => item.id === id);

    if (!affiliation) {
      return createMockResponse({ message: "Affiliation not found" }, `/affiliations/promote/${id}`, "Affiliation not found", 404, true);
    }

    affiliation.role = nextRole(affiliation.role, "up");

    return createMockResponse(affiliation, `/affiliations/promote/${id}`);
  }

  async demote(id: string): Promise<ApiResponse<AffiliationDTO | APIMessage>> {
    const affiliation = mockData.affiliations.find((item) => item.id === id);

    if (!affiliation) {
      return createMockResponse({ message: "Affiliation not found" }, `/affiliations/demote/${id}`, "Affiliation not found", 404, true);
    }

    affiliation.role = nextRole(affiliation.role, "down");

    return createMockResponse(affiliation, `/affiliations/demote/${id}`);
  }
}
