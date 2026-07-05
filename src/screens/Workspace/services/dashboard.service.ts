import { ApiClient } from "@/service/api";
import type { ApiResponse } from "@/service/types/response/response";
import type { EventDTO } from "@/service/types/events/event.dto";
import { ProjectProgress, type ProjectDTO } from "@/service/types/project/project.dto";
import type { TaskDTO } from "@/service/types/task/task.dto";
import { TaskPriority } from "@/service/types/task/priority.dto";
import { TaskStage } from "@/service/types/task/stage.dto";
import type {
  DashboardMetricDTO,
  MemberDashboardDTO,
  ManagerDashboardDTO,
  OrganizerDashboardDTO,
} from "./dashboard.types";
import type { UpdateDTO } from "@/service/types/comment/update.dto";
import type { MemberStatDTO } from "@/service/types/member/member-stat.dto";

function createMockDate(offsetHours = 0): string {
  return new Date(Date.now() + offsetHours * 60 * 60 * 1000).toISOString();
}

function createTask(overrides: Partial<TaskDTO>): TaskDTO {
  return {
    id: overrides.id ?? crypto.randomUUID(),
    code: overrides.code ?? "TSK-001",
    name: overrides.name ?? "Tarefa de exemplo",
    description: overrides.description ?? "Descrição de exemplo",
    project: overrides.project ?? crypto.randomUUID(),
    owner: overrides.owner ?? "mikaelst",
    stage: overrides.stage ?? TaskStage.PENDING,
    priority: overrides.priority ?? TaskPriority.MEDIUM,
    due_date: overrides.due_date ?? createMockDate(24),
  };
}

function createEvent(overrides: Partial<EventDTO>): EventDTO {
  return {
    id: overrides.id ?? crypto.randomUUID(),
    title: overrides.title ?? "Evento de exemplo",
    projectkey: overrides.projectkey ?? crypto.randomUUID(),
    date: overrides.date ?? createMockDate(4),
  };
}

function createProject(overrides: Partial<ProjectDTO>): ProjectDTO {
  return {
    id: overrides.id ?? crypto.randomUUID(),
    title: overrides.title ?? "Projeto de exemplo",
    description: overrides.description ?? "Projeto padrão para a área de trabalho",
    ownerkey: overrides.ownerkey ?? "mikaelst",
    due_date: overrides.due_date ?? createMockDate(72),
    progress: overrides.progress ?? ProjectProgress.STARTED,
  };
}

function createUpdate(overrides: Partial<UpdateDTO>): UpdateDTO {
  return {
    id: overrides.id ?? crypto.randomUUID(),
    content: overrides.content ?? "Nova atualização registrada",
    date: overrides.date ?? createMockDate(-2),
    ownerkey: overrides.ownerkey ?? "mikaelst",
    projectkey: overrides.projectkey ?? crypto.randomUUID(),
  };
}

function createMemberStat(overrides: Partial<MemberStatDTO>): MemberStatDTO {
  return {
    username: overrides.username ?? "mikaelst",
    project: overrides.project ?? "TCC",
    started: overrides.started ?? 12,
    done: overrides.done ?? 8,
    overdue: overrides.overdue ?? 1,
  };
}

const memberTasks = (): TaskDTO[] => [
  createTask({
    id: "73187165-f888-4a26-9df6-d7c8d39a6e81",
    code: "TSK-001",
    name: "Planejar rotina semanal",
    description: "Separar tarefas críticas do dia.",
    stage: TaskStage.PENDING,
    priority: TaskPriority.HIGH,
    due_date: createMockDate(8),
  }),
  createTask({
    id: "bb3495e1-11c5-4f8d-8d0f-9980d2c4fead",
    code: "TSK-002",
    name: "Revisar entregas",
    description: "Checar pendências antes do fim do dia.",
    stage: TaskStage.IN_PROGRESS,
    priority: TaskPriority.MEDIUM,
    due_date: createMockDate(14),
  }),
  createTask({
    id: "8af0f6d7-9981-48a8-bf0a-2c2f2f07f0f0",
    code: "TSK-003",
    name: "Validar artefatos",
    description: "Conferir documentação enviada pela equipe.",
    stage: TaskStage.REVIEW,
    priority: TaskPriority.EXTREME,
    due_date: createMockDate(-3),
  }),
];

const memberEvents = (): EventDTO[] => [
  createEvent({
    id: "2d715ef9",
    title: "Daily com a equipe",
    projectkey: "b7d621f9",
    date: createMockDate(4),
  }),
  createEvent({
    id: "3d715ef9",
    title: "Entrega parcial",
    projectkey: "b7d621f9",
    date: createMockDate(30),
  }),
];

const organizerProjects = (): ProjectDTO[] => [
  createProject({
    id: "73187165-f888-4a26-9df6-d7c8d39a6e81",
    title: "Projeto padrão",
    description: "Projeto padrão para testes de interface",
    progress: ProjectProgress.STARTED,
    due_date: createMockDate(120),
  }),
  createProject({
    id: "53d19b44-29f4-48f0-8d0f-4fcd7ccff3a2",
    title: "Migração do fluxo",
    description: "Centralizar cadastros e validações do workspace.",
    progress: ProjectProgress.REVIEW,
    due_date: createMockDate(48),
  }),
];

const organizerUpdates = (): UpdateDTO[] => [
  createUpdate({
    id: "8c7330f3",
    content: "Sprint iniciada com escopo validado.",
    date: createMockDate(-2),
  }),
  createUpdate({
    id: "8c7330f4",
    content: "Documentação revisada e publicada.",
    date: createMockDate(-6),
  }),
];

const managerStats = (): DashboardMetricDTO[] => [
  { label: "Tasks abertas", value: 24 },
  { label: "Entregas no prazo", value: 18 },
  { label: "Bloqueios", value: 3 },
];

const managerDeadlines = (): TaskDTO[] => [
  createTask({
    id: "d6f2a544-06ae-4f11-9a6a-8de6ca3ef7a0",
    code: "TSK-010",
    name: "Fechar revisão de dashboard",
    description: "Prioridade alta para a semana.",
    stage: TaskStage.REVIEW,
    priority: TaskPriority.HIGH,
    due_date: createMockDate(6),
  }),
  createTask({
    id: "d6f2a544-06ae-4f11-9a6a-8de6ca3ef7a1",
    code: "TSK-011",
    name: "Conferir backlog",
    description: "Alinhar os próximos passos do time.",
    stage: TaskStage.PENDING,
    priority: TaskPriority.MEDIUM,
    due_date: createMockDate(24),
  }),
];

const managerMembersStats = (): MemberStatDTO[] => [
  createMemberStat({
    username: "mikaelst",
    project: "TCC",
    started: 12,
    done: 8,
    overdue: 1,
  }),
  createMemberStat({
    username: "siegfried",
    project: "Portal",
    started: 8,
    done: 7,
    overdue: 0,
  }),
];

const managerEvents = (): EventDTO[] => [
  createEvent({
    id: "5e3fd64a",
    title: "Alinhamento de liderança",
    projectkey: "lead-001",
    date: createMockDate(10),
  }),
  createEvent({
    id: "5e3fd64b",
    title: "Checkpoint semanal",
    projectkey: "lead-001",
    date: createMockDate(36),
  }),
];

export class DashboardService {
  constructor(private readonly api: ApiClient) {}

  private shouldUseFallback(error: unknown): boolean {
    if (!error || typeof error !== "object") {
      return false;
    }

    const candidate = error as {
      status?: number;
      errors?: Array<{ message?: string }>;
    };

    if (candidate.status === 404) {
      return true;
    }

    return candidate.status === 500
      && candidate.errors?.some((err) => err.message === "Server offline") === true;
  }

  private async loadOrFallback<R>(
    loader: () => Promise<ApiResponse<R>>,
    fallback: () => R,
  ): Promise<R> {
    try {
      const response = await loader();
      return response.data;
    } catch (error) {
      if (!this.shouldUseFallback(error)) {
        throw error;
      }

      return fallback();
    }
  }

  async getMemberDashboard(orgkey?: string): Promise<MemberDashboardDTO> {
    const [tasks, events] = await Promise.all([
      this.loadOrFallback(
        () => this.api.load<TaskDTO[], { orgkey?: string }>({
          route: "/workspace/member/tasks",
          params: orgkey ? { orgkey } : undefined,
        }),
        memberTasks,
      ),
      this.loadOrFallback(
        () => this.api.load<EventDTO[], { orgkey?: string }>({
          route: "/workspace/member/events",
          params: orgkey ? { orgkey } : undefined,
        }),
        memberEvents,
      ),
    ]);

    return { tasks, events };
  }

  async getOrganizerDashboard(orgkey?: string): Promise<OrganizerDashboardDTO> {
    const [projects, updates] = await Promise.all([
      this.loadOrFallback(
        () => this.api.load<ProjectDTO[], { orgkey?: string }>({
          route: "/workspace/organizer/projects",
          params: orgkey ? { orgkey } : undefined,
        }),
        organizerProjects,
      ),
      this.loadOrFallback(
        () => this.api.load<UpdateDTO[], { orgkey?: string }>({
          route: "/workspace/organizer/updates",
          params: orgkey ? { orgkey } : undefined,
        }),
        organizerUpdates,
      ),
    ]);

    return { projects, updates };
  }

  async getManagerDashboard(orgkey?: string): Promise<ManagerDashboardDTO> {
    const [stats, deadlines, membersStats, events] = await Promise.all([
      this.loadOrFallback(
        () => this.api.load<DashboardMetricDTO[], { orgkey?: string }>({
          route: "/workspace/manager/stats",
          params: orgkey ? { orgkey } : undefined,
        }),
        managerStats,
      ),
      this.loadOrFallback(
        () => this.api.load<TaskDTO[], { orgkey?: string }>({
          route: "/workspace/manager/deadlines",
          params: orgkey ? { orgkey } : undefined,
        }),
        managerDeadlines,
      ),
      this.loadOrFallback(
        () => this.api.load<MemberStatDTO[], { orgkey?: string }>({
          route: "/workspace/manager/members-stats",
          params: orgkey ? { orgkey } : undefined,
        }),
        managerMembersStats,
      ),
      this.loadOrFallback(
        () => this.api.load<EventDTO[], { orgkey?: string }>({
          route: "/workspace/manager/events",
          params: orgkey ? { orgkey } : undefined,
        }),
        managerEvents,
      ),
    ]);

    return { stats, deadlines, membersStats, events };
  }
}

export function createDashboardService(api: ApiClient) {
  return new DashboardService(api);
}
