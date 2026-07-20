import type { ApiResponse } from "@/service/types/response/response";
import type { CreateProjectDTO } from "../../types/project/create.dto";
import type { ProjectDTO, ProjectProgress } from "../../types/project/project.dto";
import type { ProjectQueryDTO } from "../../types/project/project.query.dto";
import type { GenerateStatsReportDTO } from "../../types/stats/generate-stats-report.dto";
import type { ProjectStatsQueryDTO } from "../../types/stats/project-stats-query.dto";
import type {
  ProjectStats,
  ProjectStatsReport,
} from "../../types/stats/stats.types";

import { ApiClient } from "@/service/api";

export interface EditProjectDTO {
  readonly title?: string;
  readonly description?: string;
  readonly due_date?: Date;
  readonly progress?: ProjectProgress;
}

export interface ProjectServiceI {
  list(params?: ProjectQueryDTO): Promise<ApiResponse<ProjectDTO[]>>;
  create(data: CreateProjectDTO): Promise<ApiResponse<ProjectDTO>>;
  find(id: string): Promise<ApiResponse<ProjectDTO>>;
  update(id: string, data: EditProjectDTO): Promise<ApiResponse<ProjectDTO>>;
  delete(id: string): Promise<ApiResponse<ProjectDTO>>;
  stats(id: string, params?: ProjectStatsQueryDTO): Promise<ApiResponse<ProjectStats>>;
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

  async find(id: string): Promise<ApiResponse<ProjectDTO>> {
    const response = await this.api.load<ProjectDTO, void>({
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
      route: `/project/${id}/stats`,
      params,
    });

    return response;
  }

  async generateReport(
    id: string,
    data?: GenerateStatsReportDTO,
  ): Promise<void> {
    await this.api.download<GenerateStatsReportDTO>({
      route: `/project/${id}/stats/reports`,
      data,
      fallbackFilename: `relatorio-projeto-${id}.pdf`,
    });
  }

  async listReports(id: string): Promise<ApiResponse<ProjectStatsReport[]>> {
    const response = await this.api.load<ProjectStatsReport[], void>({
      route: `/project/${id}/stats/reports`,
    });

    return response;
  }

  async findReport(
    id: string,
    reportkey: string,
  ): Promise<ApiResponse<ProjectStatsReport>> {
    const response = await this.api.load<ProjectStatsReport, void>({
      route: `/project/${id}/stats/reports/${reportkey}`,
    });

    return response;
  }
}
