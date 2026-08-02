import type { ApiResponse } from "@/service/types/response/response";
import type { CreateProjectDTO } from "../../types/project/create.dto";
import {
  ProjectStage,
  type ProjectDTO,
  type ProjectWithMembersDTO,
} from "../../types/project/project.dto";
import type { ProjectQueryDTO } from "../../types/project/project.query.dto";
import type { EditProjectDTO, ProjectServiceI } from "../../modules/project/project.service";
import type { GenerateStatsReportDTO } from "../../types/stats/generate-stats-report.dto";
import type { ProjectStatsQueryDTO } from "../../types/stats/project-stats-query.dto";
import {
  ProjectHealthStatus,
  type MemberStats,
  type ProjectStats,
  type ProjectMemberPerformance,
  type ProjectStatsReport,
} from "../../types/stats/stats.types";
import { TaskStage } from "../../types/task/stage.dto";
import { downloadDocument } from "../../common/downloadDocument";

import { mockData, createMockId, createMockProject, createMockResponse } from "../data";
import { createMockRequestError, requireMockOrgRequest } from "../request-context";
import { OrgRole } from "@/utils/enums/OrgRole";

const INVALID_PERIOD_MESSAGE = "Período inválido. Selecione o mês atual ou meses anteriores.";

function resolveMonth(month?: string): { month: string; start: Date; end: Date } {
  const current = new Date();
  const currentMonth = `${current.getUTCFullYear()}-${String(current.getUTCMonth() + 1).padStart(2, "0")}`;
  const selectedMonth = month ?? currentMonth;
  if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(selectedMonth) || selectedMonth > currentMonth) {
    throw createMockRequestError("/project/stats", 400, INVALID_PERIOD_MESSAGE);
  }

  const [year, monthNumber] = selectedMonth.split("-").map(Number);
  return {
    month: selectedMonth,
    start: new Date(Date.UTC(year, monthNumber - 1, 1)),
    end: new Date(Date.UTC(year, monthNumber, 1)),
  };
}

function overlapsMonth(createdAt: string, doneAt: string | null, start: Date, end: Date): boolean {
  const created = new Date(createdAt);
  const done = doneAt ? new Date(doneAt) : null;
  return created < end && (!done || done >= start);
}

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

  if (params.orgkey && project.orgkey !== params.orgkey) {
    return false;
  }

  if (params.managerkey && project.managerkey !== params.managerkey) {
    return false;
  }

  if (params.stage && project.stage !== params.stage) {
    return false;
  }

  if (params.deadline && new Date(project.deadline).getTime() !== new Date(params.deadline).getTime()) {
    return false;
  }

  if (params.delayed !== undefined && project.delayed !== params.delayed) {
    return false;
  }

  return true;
}

export class ProjectMockService implements ProjectServiceI {
  private readonly reports: ProjectStatsReport[] = [];

  async list(params?: ProjectQueryDTO): Promise<ApiResponse<ProjectDTO[]>> {
    const { currentAccount, orgkey } = requireMockOrgRequest(
      "/project/list",
      mockData.affiliations,
    );
    const affiliation = mockData.affiliations.find(
      (item) => item.orgkey === orgkey && item.userkey === currentAccount.username,
    );
    const projects = mockData.projects.filter(
      (project) => {
        if (project.orgkey !== orgkey || !matchesProjectQuery(project, params)) {
          return false;
        }

        if (affiliation?.role === OrgRole.OWNER) {
          return true;
        }

        if (affiliation?.role === OrgRole.MANAGER) {
          return project.managerkey === affiliation.id
            || project.members?.some((member) => member.userkey === affiliation.id) === true;
        }

        return affiliation
          ? project.members.some((member) => member.userkey === affiliation.id)
          : false;
      },
    );

    return createMockResponse(projects, "/project/list");
  }

  async create(data: CreateProjectDTO): Promise<ApiResponse<ProjectDTO>> {
    const { currentAccount, orgkey } = requireMockOrgRequest(
      "/project",
      mockData.affiliations,
    );
    const affiliation = mockData.affiliations.find(
      (item) => item.orgkey === orgkey && item.userkey === currentAccount.username,
    );

    if (affiliation?.role !== OrgRole.OWNER) {
      throw createMockRequestError(
        "/project",
        403,
        "Apenas o owner da organização pode criar projetos.",
      );
    }

    const project = createMockProject({
      id: createMockId("project"),
      title: data.title,
      description: data.description,
      orgkey,
      deadline: data.deadline,
    });

    mockData.projects.push(project);

    return createMockResponse(project, "/project");
  }

  async find(id: string): Promise<ApiResponse<ProjectWithMembersDTO>> {
    const { orgkey } = requireMockOrgRequest(`/project/${id}`, mockData.affiliations);
    const project = mockData.projects.find((item) => item.id === id && item.orgkey === orgkey);

    const data: ProjectWithMembersDTO = {
      ...(project ?? createMockProject()),
      members: mockData.members.filter((member) => member.projectkey === id),
    };

    return createMockResponse(data, `/project/${id}`, project ? "OK" : "Projeto não encontrado", project ? 200 : 404, !project);
  }

  async update(id: string, data: EditProjectDTO): Promise<ApiResponse<ProjectDTO>> {
    const { orgkey } = requireMockOrgRequest(`/project/${id}`, mockData.affiliations);
    const project = mockData.projects.find((item) => item.id === id && item.orgkey === orgkey);

    if (!project) {
      return createMockResponse(createMockProject(), `/project/${id}`, "Projeto não encontrado", 404, true);
    }

    const nextProject: ProjectDTO = {
      ...project,
      ...(data.title ? { title: data.title } : {}),
      ...(data.description ? { description: data.description } : {}),
      ...(data.deadline ? { deadline: data.deadline } : {}),
      ...(data.stage ? { stage: data.stage as ProjectStage } : {}),
      ...(data.managerkey !== undefined ? { managerkey: data.managerkey } : {}),
    };

    Object.assign(project, nextProject);

    return createMockResponse(project, `/project/${id}`);
  }

  async delete(id: string): Promise<ApiResponse<ProjectDTO>> {
    const { orgkey } = requireMockOrgRequest(`/project/del/${id}`, mockData.affiliations);
    const index = mockData.projects.findIndex((item) => item.id === id && item.orgkey === orgkey);
    const project = index >= 0 ? mockData.projects[index] : createMockProject();

    if (index >= 0) {
      mockData.projects.splice(index, 1);
      const remainingTasks = mockData.tasks.filter((item) => item.projectkey !== id);
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
    const period = resolveMonth(params?.month);
    const tasks = mockData.tasks.filter((task) => task.projectkey === id
      && overlapsMonth(task.created_at, task.done_at, period.start, period.end));
    const doneTasks = tasks.filter((task) => task.stage === TaskStage.DONE).length;
    const reviewTasks = tasks.filter((task) => task.stage === TaskStage.REVIEW).length;
    const startedTasks = tasks.filter((task) => task.stage === TaskStage.STARTED).length;
    const delayedTasks = tasks.filter(
      (task) => task.delayed || (task.stage !== TaskStage.DONE && new Date(task.deadline) < period.end),
    ).length;
    const deadline = new Date(project?.deadline ?? period.end);
    const performance = this.buildMemberPerformance(id, period);
    const stats: ProjectStats = {
      generatedAt: new Date().toISOString(),
      month: period.month,
      period: { start: period.start.toISOString(), end: period.end.toISOString() },
      project: {
        id: project?.id ?? id,
        title: project?.title ?? "Projeto não encontrado",
        stage: project?.stage ?? "PENDING",
        startedAt: project?.started_at ?? null,
        doneAt: project?.done_at ?? null,
        deadline: deadline.toISOString(),
        delayed: project?.delayed ?? (deadline < period.end && project?.stage !== ProjectStage.COMPLETED),
        organization: project?.orgkey ?? "",
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
        dueDate: deadline.toISOString(),
        daysLeft: Math.ceil((deadline.getTime() - period.end.getTime()) / 86_400_000),
      },
      health: {
        status: delayedTasks > 0 ? ProjectHealthStatus.WARNING : ProjectHealthStatus.SAFE,
        score: delayedTasks > 0 ? 65 : 100,
        reason: delayedTasks > 0
          ? "Existem tarefas atrasadas no projeto."
          : "O projeto está dentro do prazo.",
        projectedDeliveryAt: null,
      },
      performancePerMember: performance.members.map((member) => ({
        memberId: member.memberId,
        user: member.user,
        months: member.months,
        averageHoursPerMonth: member.averageHoursPerMonth,
      })),
      productivity: [],
      members: [],
      events: mockData.events
        .filter((event) => event.projectkey === id
          && new Date(event.date) >= period.start && new Date(event.date) < period.end)
        .map((event) => ({
          id: event.id,
          title: event.title,
          date: event.date,
          category: event.category,
        })),
    };

    return createMockResponse(
      stats,
      `/project/${id}/stats`,
      project ? "OK" : "Projeto não encontrado",
      project ? 200 : 404,
      !project,
    );
  }

  async getProjectMemberPerformance(
    id: string,
    params?: ProjectStatsQueryDTO,
  ): Promise<ApiResponse<ProjectMemberPerformance>> {
    const path = `/project/${id}/stats/members/performance`;
    const { orgkey } = requireMockOrgRequest(path, mockData.affiliations);
    const project = mockData.projects.find((item) => item.id === id && item.orgkey === orgkey);
    const period = resolveMonth(params?.month);

    if (!project) {
      throw createMockRequestError(path, 404, "Projeto não encontrado.");
    }

    return createMockResponse(this.buildMemberPerformance(id, period), path);
  }

  async getProjectMemberStats(
    id: string,
    params?: ProjectStatsQueryDTO,
  ): Promise<ApiResponse<MemberStats[]>> {
    const path = `/project/${id}/stats/members`;
    const { orgkey } = requireMockOrgRequest(path, mockData.affiliations);
    const project = mockData.projects.find((item) => item.id === id && item.orgkey === orgkey);
    const period = resolveMonth(params?.month);

    if (!project) {
      throw createMockRequestError(path, 404, "Projeto não encontrado.");
    }

    return createMockResponse(this.buildMemberStats(id, period), path);
  }

  private buildMemberStats(id: string, period: { start: Date; end: Date }): MemberStats[] {
    return mockData.members
      .filter((member) => member.projectkey === id)
      .map((member) => {
        const user = mockData.affiliations.find((item) => item.id === member.userkey)?.user;
        const tasks = mockData.tasks.filter(
          (task) => task.projectkey === id && task.ownerkey === member.id
            && overlapsMonth(task.created_at, task.done_at, period.start, period.end),
        );

        return {
          memberId: member.id,
          user: {
            affiliationId: member.userkey,
            username: user?.username ?? member.userkey,
            name: user?.name ?? member.userkey,
            photoUrl: null,
          },
          completedTasks: tasks.filter((task) => task.stage === TaskStage.DONE
            && (!task.done_at || new Date(task.done_at) < period.end)).length,
          delayedTasks: tasks.filter((task) => task.stage !== TaskStage.DONE
            && (task.delayed || new Date(task.deadline) < period.end)).length,
          startedTasks: tasks.filter((task) => task.stage === TaskStage.STARTED).length,
          reviewTasks: tasks.filter((task) => task.stage === TaskStage.REVIEW).length,
          tasks: tasks.map((task) => ({
            id: task.id,
            code: task.code,
            name: task.name,
            stage: task.stage,
            delayed: task.delayed || (task.stage !== TaskStage.DONE && new Date(task.deadline) < period.end),
            spentMinutes: 0,
            deadline: task.deadline,
            startedAt: task.started_at,
            doneAt: task.done_at,
          })),
        };
      });
  }

  private buildMemberPerformance(id: string, period: { month: string; start: Date; end: Date }): ProjectMemberPerformance {
    const project = mockData.projects.find((item) => item.id === id);
    const members = mockData.members.filter((item) => item.projectkey === id);

    return {
      generatedAt: new Date().toISOString(),
      month: period.month,
      project: {
        id,
        title: project?.title ?? "Projeto não encontrado",
      },
      members: members.map((member) => {
        const user = mockData.affiliations.find((item) => item.id === member.userkey)?.user;
        const tasks = mockData.tasks.filter(
          (task) => task.projectkey === id && task.ownerkey === member.id
            && overlapsMonth(task.created_at, task.done_at, period.start, period.end),
        );
        const completedTasks = tasks.filter(
          (task) => task.stage === TaskStage.DONE && (!task.done_at || new Date(task.done_at) < period.end),
        ).length;
        const delayedTasks = tasks.filter(
          (task) => task.delayed || (task.stage !== TaskStage.DONE && new Date(task.deadline) < period.end),
        ).length;
        const startedTasks = tasks.filter((task) => task.stage === TaskStage.STARTED).length;
        const reviewTasks = tasks.filter((task) => task.stage === TaskStage.REVIEW).length;
        const totalTasks = tasks.length;

        return {
          memberId: member.id,
          user: {
            affiliationId: member.userkey,
            username: user?.username ?? member.userkey,
            name: user?.name ?? member.userkey,
            photoUrl: null,
          },
          totalTasks,
          completedTasks,
          completionRate: totalTasks ? Number(((completedTasks / totalTasks) * 100).toFixed(2)) : 0,
          delayedTasks,
          delayRate: totalTasks ? Number(((delayedTasks / totalTasks) * 100).toFixed(2)) : 0,
          startedTasks,
          reviewTasks,
          spentMinutes: 0,
          spentHours: 0,
          averageHoursPerMonth: 0,
          months: [],
        };
      }),
    };
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
      cutoff_at: resolveMonth(data.month).end.toISOString(),
      period_type: "MONTH",
      snapshotkey: null,
      file_url: null,
      payload_json: null,
      created_at: now,
      updated_at: now,
    };

    this.reports.unshift(report);
    const statsResponse = await this.stats(id, { month: data.month });
    const { ProjectStatsReportDocument } = await import(
      "../../common/ProjectStatsReportDocument"
    );
    const document = await new ProjectStatsReportDocument().generate({
      reportId: report.id,
      month: statsResponse.data.month,
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
      period_type: "MONTH",
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
