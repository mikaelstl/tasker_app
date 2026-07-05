import type { ApiResponse } from "@/service/types/response/response";
import type { CreateProjectDTO } from "../../types/project/create.dto";
import type { ProjectDTO, ProjectProgress } from "../../types/project/project.dto";
import type { ProjectQueryDTO } from "../../types/project/project.query.dto";
import type { EditProjectDTO, ProjectServiceI } from "./project.service";

import { mockData, createMockId, createMockProject, createMockResponse } from "../../mocks/data";

function matchesProjectQuery(project: ProjectDTO, params?: ProjectQueryDTO): boolean {
  if (!params) {
    return true;
  }

  if (params.id && project.id !== params.id) {
    return false;
  }

  if (params.title && project.title !== params.title) {
    return false;
  }

  if (params.description && project.description !== params.description) {
    return false;
  }

  if (params.ownerkey && project.ownerkey !== params.ownerkey) {
    return false;
  }

  if (params.progress && project.progress !== params.progress) {
    return false;
  }

  if (params.due_date && new Date(project.due_date).getTime() !== params.due_date.getTime()) {
    return false;
  }

  return true;
}

export class ProjectMockService implements ProjectServiceI {
  async list(params?: ProjectQueryDTO): Promise<ApiResponse<ProjectDTO[]>> {
    const projects = mockData.projects.filter((project) => matchesProjectQuery(project, params));

    return createMockResponse(projects, "/project/list");
  }

  async create(data: CreateProjectDTO): Promise<ApiResponse<ProjectDTO>> {
    const project = createMockProject({
      id: createMockId("project"),
      title: data.title,
      description: data.description,
      ownerkey: data.ownerkey ?? mockData.currentAccount.username,
      due_date: data.due_date.toISOString(),
    });

    mockData.projects.push(project);

    return createMockResponse(project, "/project");
  }

  async find(id: string): Promise<ApiResponse<ProjectDTO>> {
    const project = mockData.projects.find((item) => item.id === id);

    return createMockResponse(project ?? createMockProject(), `/project/${id}`, project ? "OK" : "Project not found", project ? 200 : 404, !project);
  }

  async update(id: string, data: EditProjectDTO): Promise<ApiResponse<ProjectDTO>> {
    const project = mockData.projects.find((item) => item.id === id);

    if (!project) {
      return createMockResponse(createMockProject(), `/project/${id}`, "Project not found", 404, true);
    }

    const nextProject: ProjectDTO = {
      ...project,
      ...(data.title ? { title: data.title } : {}),
      ...(data.description ? { description: data.description } : {}),
      ...(data.due_date ? { due_date: data.due_date.toISOString() } : {}),
      ...(data.progress ? { progress: data.progress as ProjectProgress } : {}),
    };

    Object.assign(project, nextProject);

    return createMockResponse(project, `/project/${id}`);
  }

  async delete(id: string): Promise<ApiResponse<ProjectDTO>> {
    const index = mockData.projects.findIndex((item) => item.id === id);
    const project = index >= 0 ? mockData.projects[index] : createMockProject();

    if (index >= 0) {
      mockData.projects.splice(index, 1);
      const remainingTasks = mockData.tasks.filter((item) => item.project !== id);
      const remainingComments = mockData.comments.filter((item) => item.projectkey !== id);
      const remainingEvents = mockData.events.filter((item) => item.projectkey !== id);
      const remainingMembers = mockData.members.filter((item) => item.projectkey !== id);
      const remainingMemberStats = mockData.memberStats.filter((item) => item.project !== project.title);

      mockData.tasks.splice(0, mockData.tasks.length, ...remainingTasks);
      mockData.comments.splice(0, mockData.comments.length, ...remainingComments);
      mockData.events.splice(0, mockData.events.length, ...remainingEvents);
      mockData.members.splice(0, mockData.members.length, ...remainingMembers);
      mockData.memberStats.splice(0, mockData.memberStats.length, ...remainingMemberStats);
    }

    return createMockResponse(project, `/project/del/${id}`);
  }
}
