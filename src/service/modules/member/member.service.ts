import type { ApiResponse } from "@/service/types/response/response";
import type { ProjectMember } from "../../types/member/member.dto";
import type { DefineMemberDTO } from "@/service/types/member/define.dto";

import { ApiClient } from "@/service/api";

interface MemberServiceI {
  create(data: DefineMemberDTO): Promise<ApiResponse<ProjectMember>>;
  list(projectkey: string): Promise<ApiResponse<ProjectMember[]>>;
  delete(id: string): Promise<ApiResponse<ProjectMember>>;
}

export class MemberService implements MemberServiceI {
  private readonly api: ApiClient;

  constructor(api: ApiClient) {
    this.api = api;
  }

  async create(data: DefineMemberDTO): Promise<ApiResponse<ProjectMember>> {
    const response = await this.api.register<DefineMemberDTO, ProjectMember>({
      route: "/members",
      data,
    });

    return response;
  }

  async list(projectkey: string): Promise<ApiResponse<ProjectMember[]>> {
    const response = await this.api.load<ProjectMember[], void>({
      route: `/members/${projectkey}`,
    });

    return response;
  }

  async delete(id: string): Promise<ApiResponse<ProjectMember>> {
    const response = await this.api.remove<ProjectMember>({
      route: `/members/remove/${id}`,
    });

    return response;
  }
}
