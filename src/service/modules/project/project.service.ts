import type { ApiResponse } from "@/service/types/response/response";
import type { CreateProjectDTO } from "../../types/project/create.dto";
import type { ProjectDTO, ProjectStage, ProjectWithMembersDTO } from "../../types/project/project.dto";
import type { ProjectQueryDTO } from "../../types/project/project.query.dto";
import type { GenerateStatsReportDTO } from "../../types/stats/generate-stats-report.dto";
import type { ProjectStatsQueryDTO } from "../../types/stats/project-stats-query.dto";
import type {
  ProjectStats,
  MemberStats,
  ProjectMemberPerformance,
  ProjectStatsReport,
} from "../../types/stats/stats.types";

import { ApiClient } from "@/service/api";

const projectStatsRoute = (id: string) => `/project/${encodeURIComponent(id)}/stats`;

export interface EditProjectDTO {
  readonly title?: string;
  readonly description?: string;
  readonly deadline?: string;
  readonly stage?: ProjectStage;
  readonly managerkey?: string | null;
}

export interface ProjectServiceI {
  list(params?: ProjectQueryDTO): Promise<ApiResponse<ProjectDTO[]>>;
  create(data: CreateProjectDTO): Promise<ApiResponse<ProjectDTO>>;
  find(id: string): Promise<ApiResponse<ProjectWithMembersDTO>>;
  update(id: string, data: EditProjectDTO): Promise<ApiResponse<ProjectDTO>>;
  delete(id: string): Promise<ApiResponse<ProjectDTO>>;
  stats(id: string, params?: ProjectStatsQueryDTO): Promise<ApiResponse<ProjectStats>>;
  getProjectMemberStats(
    id: string,
    params?: ProjectStatsQueryDTO,
  ): Promise<ApiResponse<MemberStats[]>>;
  getProjectMemberPerformance(
    id: string,
    params?: ProjectStatsQueryDTO,
  ): Promise<ApiResponse<ProjectMemberPerformance>>;
  generateReport(
    id: string,
    data?: GenerateStatsReportDTO,
  ): Promise<void>;
  listReports(id: string): Promise<ApiResponse<ProjectStatsReport[]>>;
  findReport(id: string, reportkey: string): Promise<ApiResponse<ProjectStatsReport>>;
}

export class ProjectService implements ProjectServiceI {
  private readonly api: ApiClient;

  constructor(api: ApiClient) {
    this.api = api;
  }

  async list(params?: ProjectQueryDTO): Promise<ApiResponse<ProjectDTO[]>> {
    const response = await this.api.load<ProjectDTO[], ProjectQueryDTO>({
      route: "/project/list",
      params,
    });

    return response;
  }

  async create(data: CreateProjectDTO): Promise<ApiResponse<ProjectDTO>> {
    const response = await this.api.register<CreateProjectDTO, ProjectDTO>({
      route: "/project",
      data,
    });

    return response;
  }

  async find(id: string): Promise<ApiResponse<ProjectWithMembersDTO>> {
    const response = await this.api.load<ProjectWithMembersDTO, void>({
      route: `/project/${id}`,
    });

    return response;
  }

  async update(id: string, data: EditProjectDTO): Promise<ApiResponse<ProjectDTO>> {
    const response = await this.api.update<EditProjectDTO, ProjectDTO>({
      route: `/project/${id}`,
      data,
    });

    return response;
  }

  async delete(id: string): Promise<ApiResponse<ProjectDTO>> {
    const response = await this.api.remove<ProjectDTO>({
      route: `/project/del/${id}`,
    });

    return response;
  }

  async stats(
    id: string,
    params?: ProjectStatsQueryDTO,
  ): Promise<ApiResponse<ProjectStats>> {
    const response = await this.api.load<ProjectStats, ProjectStatsQueryDTO>({
      route: projectStatsRoute(id),
      params,
    });

    return response;
  }

  async getProjectMemberStats(
    id: string,
    params?: ProjectStatsQueryDTO,
  ): Promise<ApiResponse<MemberStats[]>> {
    const response = await this.api.load<MemberStats[], ProjectStatsQueryDTO>({
      route: `${projectStatsRoute(id)}/members`,
      params,
    });

    return response;
  }

  async getProjectMemberPerformance(
    id: string,
    params?: ProjectStatsQueryDTO,
  ): Promise<ApiResponse<ProjectMemberPerformance>> {
    const response = await this.api.load<ProjectMemberPerformance, ProjectStatsQueryDTO>({
      route: `${projectStatsRoute(id)}/members/performance`,
      params,
    });

    return response;
  }

  async generateReport(
    id: string,
    data?: GenerateStatsReportDTO,
  ): Promise<void> {
    await this.api.download<GenerateStatsReportDTO>({
      route: `${projectStatsRoute(id)}/report`,
      data,
      fallbackFilename: `relatorio-projeto-${id}.pdf`,
    });
  }

  async listReports(id: string): Promise<ApiResponse<ProjectStatsReport[]>> {
    const response = await this.api.load<ProjectStatsReport[], void>({
      route: `${projectStatsRoute(id)}/reports`,
    });

    return response;
  }

  async findReport(
    id: string,
    reportkey: string,
  ): Promise<ApiResponse<ProjectStatsReport>> {
    const response = await this.api.load<ProjectStatsReport, void>({
      route: `${projectStatsRoute(id)}/reports/${encodeURIComponent(reportkey)}`,
    });

    return response;
  }
}
