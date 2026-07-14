import type { ApiResponse } from "@/service/types/response/response";
import type { OrganizationCreateDTO } from "../../types/organization/create.dto";
import type { OrganizationDTO } from "../../types/organization/organization.dto";

import { mockData, createMockId, createMockOrganization, createMockResponse } from "../data";
import type { OrganizationServiceI } from "../../modules/organization/organization.service";

export class OrganizationMockService implements OrganizationServiceI {
  async create(data: OrganizationCreateDTO): Promise<ApiResponse<OrganizationDTO>> {
    const organization = createMockOrganization({
      id: createMockId("org"),
      name: data.name,
      ownerkey: data.ownerkey ?? mockData.currentAccount.username,
      created_at: new Date(),
      updated_at: new Date(),
    });

    mockData.organizations.push(organization);

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
}
