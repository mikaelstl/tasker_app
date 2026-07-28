import type { ApiResponse } from "@/service/types/response/response";
import type { OrganizationCreateDTO } from "../../types/organization/create.dto";
import type { OrganizationDTO } from "../../types/organization/organization.dto";
import type { OrganizationSummaryDTO } from "@/service/types/organization/summary.dto";

import {
  mockData,
  createMockAffiliation,
  createMockId,
  createMockOrganization,
  createMockResponse,
} from "../data";
import type { OrganizationServiceI } from "../../modules/organization/organization.service";
import { requireMockCurrentAccount } from "../request-context";
import { OrgRole } from "@/utils/enums/OrgRole";

export class OrganizationMockService implements OrganizationServiceI {
  async create(data: OrganizationCreateDTO): Promise<ApiResponse<OrganizationDTO>> {
    const currentAccount = requireMockCurrentAccount("/org");
    const organization = createMockOrganization({
      id: createMockId("org"),
      name: data.name,
      ownerkey: currentAccount.username,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

    mockData.organizations.push(organization);
    const affiliation = createMockAffiliation({
      id: createMockId("affiliation"),
      orgkey: organization.id,
      userkey: currentAccount.username,
      role: OrgRole.OWNER,
      org: organization,
      user: mockData.users.find((user) => user.username === currentAccount.username),
    });

    mockData.affiliations.push(affiliation);
    Object.assign(organization, { members: [affiliation] });

    return createMockResponse(organization, "/org");
  }

  async delete(id: string): Promise<ApiResponse<OrganizationDTO>> {
    const index = mockData.organizations.findIndex((item) => item.id === id);
    const organization = index >= 0 ? mockData.organizations[index] : createMockOrganization({ id });

    if (index >= 0) {
      mockData.organizations.splice(index, 1);
      const remainingAffiliations = mockData.affiliations.filter((item) => item.orgkey !== id);
      mockData.affiliations.splice(0, mockData.affiliations.length, ...remainingAffiliations);
    }

    return createMockResponse(organization, `/org/del/${id}`);
  }

  async summary(id: string): Promise<ApiResponse<OrganizationSummaryDTO>> {
    const organization = mockData.organizations.find((item) => item.id === id);
    const summary: OrganizationSummaryDTO = {
      name: organization?.name ?? createMockOrganization({ id }).name,
      projects: mockData.projects.filter((project) => project.orgkey === id).length,
      members: mockData.affiliations.filter((affiliation) => affiliation.orgkey === id).length,
    };

    return createMockResponse(
      summary,
      `/org/${id}/summary`,
      organization ? "OK" : "Organização não encontrada",
      organization ? 200 : 404,
      !organization,
    );
  }
}
