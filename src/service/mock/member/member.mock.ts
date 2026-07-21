import type { ApiResponse } from "@/service/types/response/response";
import type { ProjectMember } from "../../types/member/member.dto";
import type { DefineMemberDTO } from "@/service/types/member/define.dto";

import { mockData, createMockId, createMockProjectMember, createMockResponse } from "../data";
import type { MemberServiceI } from "../../modules/member/member.service";
import { createMockRequestError, requireMockOrgRequest } from "../request-context";

function requireProjectFromCurrentOrg(projectkey: string, path: string) {
  const { orgkey } = requireMockOrgRequest(path, mockData.affiliations);
  const project = mockData.projects.find((item) => item.id === projectkey);

  if (!project || project.orgkey !== orgkey) {
    throw createMockRequestError(
      path,
      403,
      "O projeto não pertence à organização acessada.",
    );
  }

  return project;
}

export class MemberMockService implements MemberServiceI {
  async create(data: DefineMemberDTO): Promise<ApiResponse<ProjectMember>> {
    const project = requireProjectFromCurrentOrg(data.project, "/members");
    const affiliation = mockData.affiliations.find(
      (item) => item.id === data.user && item.orgkey === project.orgkey,
    );

    if (!affiliation) {
      throw createMockRequestError(
        "/members",
        403,
        "O usuário não pertence à organização acessada.",
      );
    }

    const member = createMockProjectMember({
      id: createMockId("member"),
      projectkey: data.project,
      userkey: data.user,
      user: affiliation,
    });

    mockData.members.push(member);
    project.members?.push(member);

    return createMockResponse(member, "/members");
  }

  async list(projectkey: string): Promise<ApiResponse<ProjectMember[]>> {
    requireProjectFromCurrentOrg(projectkey, `/members/${projectkey}`);
    const members = mockData.members.filter((item) => item.projectkey === projectkey);

    return createMockResponse(members, `/members/${projectkey}`);
  }

  async delete(id: string): Promise<ApiResponse<ProjectMember>> {
    const path = `/members/remove/${id}`;
    const existingMember = mockData.members.find((item) => item.id === id);

    if (existingMember) {
      requireProjectFromCurrentOrg(existingMember.projectkey, path);
    } else {
      requireMockOrgRequest(path, mockData.affiliations);
    }

    const index = mockData.members.findIndex((item) => item.id === id);
    const member = index >= 0 ? mockData.members[index] : createMockProjectMember();

    if (index >= 0) {
      mockData.members.splice(index, 1);
      const project = mockData.projects.find(
        (item) => item.id === member.projectkey,
      );
      const projectMemberIndex = project?.members?.findIndex(
        (item) => item.id === member.id,
      ) ?? -1;

      if (projectMemberIndex >= 0) {
        project?.members?.splice(projectMemberIndex, 1);
      }
    }

    return createMockResponse(member, `/members/remove/${id}`);
  }
}
