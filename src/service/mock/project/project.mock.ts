import type { ApiResponse } from "@/service/types/response/response";
import type { CreateProjectDTO } from "../../types/project/create.dto";
import {
  ProjectProgress,
  type ProjectDTO,
} from "../../types/project/project.dto";
import type { ProjectQueryDTO } from "../../types/project/project.query.dto";
import type { EditProjectDTO, ProjectServiceI } from "../../modules/project/project.service";
import type { GenerateStatsReportDTO } from "../../types/stats/generate-stats-report.dto";
import type { ProjectStatsQueryDTO } from "../../types/stats/project-stats-query.dto";
import {
  ProjectHealthStatus,
  StatsPeriodType,
  type ProjectStats,
  type ProjectStatsReport,
} from "../../types/stats/stats.types";
import { TaskStage } from "../../types/task/stage.dto";
import { downloadDocument } from "../../common/downloadDocument";

import { mockData, createMockId, createMockProject, createMockResponse } from "../data";

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
  private readonly reports: ProjectStatsReport[] = [];

  async list(params?: ProjectQueryDTO): Promise<ApiResponse<ProjectDTO[]>> {
    const projects = mockData.projects.filter((project) => matchesProjectQuery(project, params));

    return createMockResponse(projects, "/project/list");
  }

  async create(data: CreateProjectDTO): Promise<ApiResponse<ProjectDTO>> {
    const project = createMockProject({
      id: createMockId("project"),
      title: data.title,
      description: data.description,
      ownerkey: data.ownerkey ?? mockData.organizations[0]?.id ?? "org-001",
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

  async stats(
    id: string,
    params?: ProjectStatsQueryDTO,
  ): Promise<ApiResponse<ProjectStats>> {
    const project = mockData.projects.find((item) => item.id === id);
    const cutoffAt = params?.cutoffAt ? new Date(params.cutoffAt) : new Date();
    const tasks = mockData.tasks.filter((task) => task.projectkey === id);
    const doneTasks = tasks.filter((task) => task.stage === TaskStage.DONE).length;
    const reviewTasks = tasks.filter((task) => task.stage === TaskStage.REVIEW).length;
    const startedTasks = tasks.filter((task) => task.stage === TaskStage.IN_PROGRESS).length;
    const delayedTasks = tasks.filter(
      (task) => task.stage !== TaskStage.DONE && new Date(task.due_date) < cutoffAt,
    ).length;
    const deadline = new Date(project?.due_date ?? cutoffAt);
    const stats: ProjectStats = {
      generatedAt: new Date(),
      cutoffAt,
      period: null,
      project: {
        id: project?.id ?? id,
        title: project?.title ?? "Projeto não encontrado",
        stage: project?.progress ?? "PENDING",
        startedAt: project ? new Date(project.created_at) : null,
        doneAt: null,
        deadline,
        delayed: deadline < cutoffAt && project?.progress !== ProjectProgress.DONE,
        organization: project?.ownerkey ?? "",
        manager: project?.managerkey ?? null,
      },
      summary: {
        totalTasks: tasks.length,
        doneTasks,
        openTasks: tasks.length - doneTasks,
        startedTasks,
        reviewTasks,
        delayedTasks,
        progress: tasks.length === 0 ? 0 : Number(((doneTasks / tasks.length) * 100).toFixed(2)),
      },
      deadline: {
        dueDate: deadline,
        daysLeft: Math.ceil((deadline.getTime() - cutoffAt.getTime()) / 86_400_000),
      },
      health: {
        status: delayedTasks > 0 ? ProjectHealthStatus.WARNING : ProjectHealthStatus.SAFE,
        score: delayedTasks > 0 ? 65 : 100,
        reason: delayedTasks > 0
          ? "Existem tarefas atrasadas no projeto."
          : "O projeto está dentro do prazo.",
        projectedDeliveryAt: null,
      },
      performancePerMember: [],
      productivity: [],
      members: [],
      events: mockData.events
        .filter((event) => event.projectkey === id)
        .map((event) => ({
          id: event.id,
          title: event.title,
          date: new Date(event.date),
          category: event.category,
        })),
    };

    return createMockResponse(
      stats,
      `/project/${id}/stats`,
      project ? "OK" : "Project not found",
      project ? 200 : 404,
      !project,
    );
  }

  async generateReport(
    id: string,
    data: GenerateStatsReportDTO = {},
  ): Promise<void> {
    const now = new Date().toISOString();
    const report: ProjectStatsReport = {
      id: `report-${this.reports.length + 1}`,
      projectkey: id,
      generated_at: now,
      cutoff_at: data.cutoffAt ?? now,
      period_type: data.periodType ?? StatsPeriodType.WEEK,
      snapshotkey: null,
      file_url: data.fileUrl ?? null,
      payload_json: null,
      created_at: now,
      updated_at: now,
    };

    this.reports.unshift(report);
    const statsResponse = await this.stats(id, { cutoffAt: data.cutoffAt });
    const { ProjectStatsReportDocument } = await import(
      "../../common/ProjectStatsReportDocument"
    );
    const document = await new ProjectStatsReportDocument().generate({
      reportId: report.id,
      periodType: report.period_type,
      stats: statsResponse.data,
      historicalSnapshots: this.reports
        .filter((item) => item.projectkey === id)
        .flatMap((item) => item.payload_json?.historicalSnapshots ?? []),
    });
    const projectName = statsResponse.data.project.title
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-zA-Z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .toLowerCase();

    downloadDocument(
      document,
      `relatorio-${projectName || id}-${now.slice(0, 10)}.pdf`,
    );
  }

  async listReports(id: string): Promise<ApiResponse<ProjectStatsReport[]>> {
    const reports = this.reports.filter((report) => report.projectkey === id);

    return createMockResponse(reports, `/project/${id}/stats/reports`);
  }

  async findReport(
    id: string,
    reportkey: string,
  ): Promise<ApiResponse<ProjectStatsReport>> {
    const report = this.reports.find(
      (item) => item.id === reportkey && item.projectkey === id,
    );
    const fallback = {
      id: reportkey,
      projectkey: id,
      generated_at: "",
      cutoff_at: "",
      period_type: StatsPeriodType.WEEK,
      snapshotkey: null,
      file_url: null,
      payload_json: null,
      created_at: "",
      updated_at: "",
    };

    return createMockResponse(
      report ?? fallback,
      `/project/${id}/stats/reports/${reportkey}`,
      report ? "OK" : "Relatório de estatísticas não encontrado.",
      report ? 200 : 404,
      !report,
    );
  }
}
