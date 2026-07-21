import dotenv from "@/config/dotenv";
import type { ApiClient } from "@/service/api";
import type { UpdateDTO } from "@/service/types/comment/update.dto";
import type { EventDTO } from "@/service/types/events/event.dto";
import type { MemberStatDTO } from "@/service/types/member/member-stat.dto";
import { ProjectProgress, type ProjectDTO } from "@/service/types/project/project.dto";
import type { ApiError } from "@/service/types/response/error";
import { TaskPriority } from "@/service/types/task/priority.dto";
import { TaskStage } from "@/service/types/task/stage.dto";
import type { TaskDTO } from "@/service/types/task/task.dto";

export interface MemberDashboardDTO {
  tasks: TaskDTO[];
  events: EventDTO[];
}

export interface ProjectSummaryDTO {
  total: number;
  safe: number;
  warning: number;
  critical: number;
}

export interface DeadlineDTO {
  projectkey: string;
  title: string;
  dueDate: string;
  daysRemaining: number;
}

export interface OrganizerDashboardDTO {
  projects: ProjectDTO[];
  updates: UpdateDTO[];
  projectSummary: ProjectSummaryDTO;
  deadlineAlerts: DeadlineDTO[];
}

export interface ManagerStatsDTO {
  started: number;
  done: number;
  review: number;
  overdue: number;
}

export interface ManagerDashboardDTO {
  stats: ManagerStatsDTO;
  deadlines: DeadlineDTO[];
  membersStats: MemberStatDTO[];
  events: EventDTO[];
}

interface DashboardQuery {
  orgkey: string;
}

const daysFromNow = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString();
};

const memberMock = (): MemberDashboardDTO => ({
  tasks: [
    {
      id: "task-001",
      code: "TSK-001",
      name: "Tarefa prioritária",
      description: "Tarefa de exemplo do dashboard",
      project: "project-001",
      owner: "",
      stage: TaskStage.PENDING,
      priority: TaskPriority.EXTREME,
      due_date: daysFromNow(0),
    },
    {
      id: "task-002",
      code: "TSK-002",
      name: "Revisar entrega",
      description: "Tarefa de exemplo do dashboard",
      project: "project-001",
      owner: "",
      stage: TaskStage.REVIEW,
      priority: TaskPriority.HIGH,
      due_date: daysFromNow(3),
    },
  ],
  events: [
    {
      id: "event-001",
      title: "Reunião do projeto",
      projectkey: "project-001",
      date: daysFromNow(1),
    },
  ],
});

const organizerMock = (): OrganizerDashboardDTO => {
  const projects: ProjectDTO[] = [
    {
      id: "project-001",
      title: "Projeto padrão",
      description: "Projeto padrão para testes de interface",
      ownerkey: "",
      progress: ProjectProgress.STARTED,
      due_date: daysFromNow(5),
    },
  ];

  return {
    projects,
    updates: [
      {
        id: "update-001",
        content: "Projeto atualizado",
        date: new Date().toISOString(),
        ownerkey: "mikaelst",
        projectkey: "project-001",
      },
    ],
    projectSummary: summarizeProjects(projects),
    deadlineAlerts: getDeadlineAlerts(projects),
  };
};

const managerMock = (): ManagerDashboardDTO => ({
  stats: {
    started: 4,
    done: 12,
    review: 2,
    overdue: 1,
  },
  deadlines: [
    {
      projectkey: "project-001",
      title: "Projeto padrão",
      dueDate: daysFromNow(5),
      daysRemaining: 5,
    },
  ],
  membersStats: [
    {
      username: "mikaelst",
      project: "TCC",
      started: 4,
      done: 12,
      overdue: 1,
    },
  ],
  events: [
    {
      id: "event-002",
      title: "Entrega do projeto",
      projectkey: "project-001",
      date: daysFromNow(5),
    },
  ],
});

function summarizeProjects(projects: ProjectDTO[]): ProjectSummaryDTO {
  return projects.reduce<ProjectSummaryDTO>((summary, project) => {
    summary.total += 1;

    if (project.progress === ProjectProgress.OVERDUE) {
      summary.critical += 1;
    } else if (new Date(project.due_date).getTime() - Date.now() <= 7 * 86_400_000) {
      summary.warning += 1;
    } else {
      summary.safe += 1;
    }

    return summary;
  }, { total: 0, safe: 0, warning: 0, critical: 0 });
}

function getDeadlineAlerts(projects: ProjectDTO[]): DeadlineDTO[] {
  return projects
    .filter((project) => project.progress !== ProjectProgress.DONE)
    .map((project) => ({
      projectkey: project.id,
      title: project.title,
      dueDate: project.due_date,
      daysRemaining: Math.ceil(
        (new Date(project.due_date).getTime() - Date.now()) / 86_400_000,
      ),
    }))
    .sort((left, right) => left.daysRemaining - right.daysRemaining)
    .slice(0, 4);
}

export class DashboardService {
  constructor(private readonly api: ApiClient) {}

  async getMemberDashboard(orgkey: string): Promise<MemberDashboardDTO> {
    if (dotenv.USE_MOCKS) return memberMock();

    const params = { orgkey };
    const [tasks, events] = await Promise.all([
      this.api.load<TaskDTO[], DashboardQuery>({
        route: "/dashboard/member/tasks",
        params,
      }),
      this.api.load<EventDTO[], DashboardQuery>({
        route: "/dashboard/member/events",
        params,
      }),
    ]);

    return { tasks: tasks.data, events: events.data };
  }

  async getOrganizerDashboard(orgkey: string): Promise<OrganizerDashboardDTO> {
    if (dotenv.USE_MOCKS) return organizerMock();

    const params = { orgkey };
    const [projects, updates] = await Promise.all([
      this.api.load<ProjectDTO[], DashboardQuery>({
        route: "/dashboard/organizer/projects",
        params,
      }),
      this.api.load<UpdateDTO[], DashboardQuery>({
        route: "/dashboard/organizer/updates",
        params,
      }),
    ]);

    return {
      projects: projects.data,
      updates: updates.data,
      projectSummary: summarizeProjects(projects.data),
      deadlineAlerts: getDeadlineAlerts(projects.data),
    };
  }

  async getManagerDashboard(orgkey: string): Promise<ManagerDashboardDTO> {
    if (dotenv.USE_MOCKS) return managerMock();

    const params = { orgkey };
    const [stats, deadlines, membersStats, events] = await Promise.all([
      this.api.load<ManagerStatsDTO, DashboardQuery>({
        route: "/dashboard/manager/stats",
        params,
      }),
      this.api.load<DeadlineDTO[], DashboardQuery>({
        route: "/dashboard/manager/deadlines",
        params,
      }),
      this.api.load<MemberStatDTO[], DashboardQuery>({
        route: "/dashboard/manager/member-stats",
        params,
      }),
      this.api.load<EventDTO[], DashboardQuery>({
        route: "/dashboard/manager/events",
        params,
      }),
    ]);

    return {
      stats: stats.data,
      deadlines: deadlines.data,
      membersStats: membersStats.data,
      events: events.data,
    };
  }
}

export const createDashboardService = (api: ApiClient) => new DashboardService(api);

export function getDashboardErrorMessage(error: unknown): string {
  const apiError = error as Partial<ApiError>;
  return apiError.errors?.[0]?.message ?? "Não foi possível carregar o dashboard.";
}
