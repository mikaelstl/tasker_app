import type { ApiResponse } from "@/service/types/response/response";
import type { ProjectMember } from "../../types/member/member.dto";
import type { DefineMemberDTO } from "@/service/types/member/define.dto";

import { mockData, createMockId, createMockProjectMember, createMockResponse } from "../data";
import type { MemberServiceI } from "../../modules/member/member.service";

export class MemberMockService implements MemberServiceI {
  async create(data: DefineMemberDTO): Promise<ApiResponse<ProjectMember>> {
    const member = createMockProjectMember({
      id: createMockId("member"),
      projectkey: data.project,
      userkey: data.user,
    });

    mockData.members.push(member);

    return createMockResponse(member, "/members");
  }

  async list(projectkey: string): Promise<ApiResponse<ProjectMember[]>> {
    const members = mockData.members.filter((item) => item.projectkey === projectkey);

    return createMockResponse(members, `/members/${projectkey}`);
  }

  async delete(id: string): Promise<ApiResponse<ProjectMember>> {
    const index = mockData.members.findIndex((item) => item.id === id);
    const member = index >= 0 ? mockData.members[index] : createMockProjectMember();

    if (index >= 0) {
      mockData.members.splice(index, 1);
    }

    return createMockResponse(member, `/members/remove/${id}`);
  }
}
