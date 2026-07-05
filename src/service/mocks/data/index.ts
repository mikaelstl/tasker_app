import type { AccountDTO } from "../../types/account/account.dto";
import type { CurrentAccountDTO } from "../../types/account/current-account.dto";
import type { AuthDTO } from "../../types/auth/auth.dto";
import type { CommentDTO } from "../../types/comment/comment.dto";
import type { EventDTO } from "../../types/events/event.dto";
import type { MemberStatDTO } from "../../types/member/member-stat.dto";
import type { ProjectMember } from "../../types/member/member.dto";
import type { AffiliationDTO } from "../../types/affiliation/affiliation.dto";
import type { OrganizationDTO } from "../../types/organization/organization.dto";
import { ProjectProgress, type ProjectDTO } from "../../types/project/project.dto";
import type { UpdateDTO } from "../../types/comment/update.dto";
import { TaskPriority } from "../../types/task/priority.dto";
import type { TaskDTO } from "../../types/task/task.dto";
import { TaskStage } from "../../types/task/stage.dto";
import type { UserDTO } from "../../types/user/user.dto";
import type { ApiResponse } from "../../types/response/response";
import { OrgRole } from "../../../utils/enums/OrgRole";
import { MemberRole } from "@/service/types/member/role.dto";

const baseDate = new Date("2026-07-05T12:00:00.000Z");

function shiftDate(days = 0, hours = 0): Date {
  return new Date(baseDate.getTime() + ((days * 24) + hours) * 60 * 60 * 1000);
}

function shiftIso(days = 0, hours = 0): string {
  return shiftDate(days, hours).toISOString();
}

export function createMockId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function createMockResponse<T>(
  data: T,
  path: string,
  message = "OK",
  status = 200,
  error = false,
): ApiResponse<T> {
  return {
    status,
    message,
    data,
    path,
    error,
    timestamp: new Date().toISOString(),
  };
}

export function createMockUser(overrides: Partial<UserDTO> = {}): UserDTO {
  return {
    id: overrides.id ?? "user-001",
    name: overrides.name ?? "Mikael Santos",
    username: overrides.username ?? "mikaelst",
    accountkey: overrides.accountkey ?? "mikaelst",
  };
}

export function createMockAccount(overrides: Partial<AccountDTO> = {}): AccountDTO {
  return {
    id: overrides.id ?? "account-001",
    email: overrides.email ?? "mikael@tasker.dev",
    password: overrides.password ?? "secret-password",
  };
}

export function createMockCurrentAccount(overrides: Partial<CurrentAccountDTO> = {}): CurrentAccountDTO {
  return {
    id: overrides.id ?? "account-001",
    username: overrides.username ?? "mikaelst",
    email: overrides.email ?? "mikael@tasker.dev",
    role: overrides.role ?? OrgRole.OWNER,
  };
}

export function createMockAuth(overrides: Partial<AuthDTO> = {}): AuthDTO {
  return {
    account: overrides.account ?? "account-001",
    email: overrides.email ?? "mikael@tasker.dev",
    access_token: overrides.access_token ?? "mock-access-token",
    username: overrides.username ?? "mikaelst",
  };
}

export function createMockTask(overrides: Partial<TaskDTO> = {}): TaskDTO {
  return {
    id: overrides.id ?? "task-001",
    code: overrides.code ?? "TSK-001",
    name: overrides.name ?? "Planejar rotina semanal",
    description: overrides.description ?? "Separar as tarefas críticas do dia.",
    project: overrides.project ?? "project-001",
    owner: overrides.owner ?? "mikaelst",
    stage: overrides.stage ?? TaskStage.PENDING,
    priority: overrides.priority ?? TaskPriority.MEDIUM,
    due_date: overrides.due_date ?? shiftIso(2),
  };
}

export function createMockProject(overrides: Partial<ProjectDTO> = {}): ProjectDTO {
  return {
    id: overrides.id ?? "project-001",
    title: overrides.title ?? "Portal Administrativo",
    description: overrides.description ?? "Projeto principal para validações da aplicação.",
    ownerkey: overrides.ownerkey ?? "mikaelst",
    due_date: overrides.due_date ?? shiftIso(14),
    progress: overrides.progress ?? ProjectProgress.STARTED,
  };
}

export function createMockEvent(overrides: Partial<EventDTO> = {}): EventDTO {
  return {
    id: overrides.id ?? "event-001",
    title: overrides.title ?? "Daily da equipe",
    projectkey: overrides.projectkey ?? "project-001",
    date: overrides.date ?? shiftIso(0, 4),
  };
}

export function createMockComment(overrides: Partial<CommentDTO> = {}): CommentDTO {
  return {
    id: overrides.id ?? "comment-001",
    content: overrides.content ?? "Revisar pendências antes do fechamento.",
    date: overrides.date ?? shiftIso(-1, 2),
    ownerkey: overrides.ownerkey ?? "mikaelst",
    projectkey: overrides.projectkey ?? "project-001",
  };
}

export function createMockUpdate(overrides: Partial<UpdateDTO> = {}): UpdateDTO {
  return {
    id: overrides.id ?? "update-001",
    content: overrides.content ?? "Sprint iniciada com o escopo validado.",
    date: overrides.date ?? shiftIso(-1),
    ownerkey: overrides.ownerkey ?? "mikaelst",
    projectkey: overrides.projectkey ?? "project-001",
  };
}

export function createMockMemberStat(overrides: Partial<MemberStatDTO> = {}): MemberStatDTO {
  return {
    username: overrides.username ?? "mikaelst",
    project: overrides.project ?? "Portal Administrativo",
    started: overrides.started ?? 12,
    done: overrides.done ?? 8,
    overdue: overrides.overdue ?? 1,
  };
}

export function createMockAffiliation(overrides: Partial<AffiliationDTO> = {}): AffiliationDTO {
  return {
    id: overrides.id ?? "affiliation-001",
    orgkey: overrides.orgkey ?? "org-001",
    userkey: overrides.userkey ?? "mikaelst",
    org: overrides.org,
    role: overrides.role ?? OrgRole.OWNER,
  };
}

export function createMockProjectMember(overrides: Partial<ProjectMember> = {}): ProjectMember {
  return {
    id: overrides.id ?? "member-001",
    projectkey: overrides.projectkey ?? "project-001",
    userkey: overrides.userkey ?? "mikaelst",
    role: overrides.role ?? MemberRole.OWNER,
    tasks: overrides.tasks ?? [],
  };
}

export function createMockOrganization(overrides: Partial<OrganizationDTO> = {}): OrganizationDTO {
  return {
    id: overrides.id ?? "org-001",
    name: overrides.name ?? "Tasker Labs",
    ownerkey: overrides.ownerkey ?? "mikaelst",
    owner: overrides.owner,
    projects: overrides.projects,
    members: overrides.members,
    created_at: overrides.created_at ?? shiftDate(-30),
    updated_at: overrides.updated_at ?? shiftDate(-1),
  };
}

const users = [
  createMockUser(),
  createMockUser({
    id: "user-002",
    name: "Ana Lima",
    username: "analima",
    accountkey: "analima",
  }),
  createMockUser({
    id: "user-003",
    name: "Carla Souza",
    username: "carlas",
    accountkey: "carlas",
  }),
];

const accounts = [
  createMockAccount(),
  createMockAccount({
    id: "account-002",
    email: "ana@tasker.dev",
    password: "secret-password-2",
  }),
  createMockAccount({
    id: "account-003",
    email: "carla@tasker.dev",
    password: "secret-password-3",
  }),
];

const currentAccount = createMockCurrentAccount();
const auth = createMockAuth();

const projects = [
  createMockProject(),
  createMockProject({
    id: "project-002",
    title: "Migração do fluxo",
    description: "Centralizar cadastros e validações do workspace.",
    ownerkey: "analima",
    progress: ProjectProgress.REVIEW,
    due_date: shiftIso(7),
  }),
  createMockProject({
    id: "project-003",
    title: "Portal mobile",
    description: "Ajustes de experiência para telas menores.",
    ownerkey: "carlas",
    progress: ProjectProgress.PENDING,
    due_date: shiftIso(21),
  }),
];

const tasks = [
  createMockTask(),
  createMockTask({
    id: "task-002",
    code: "TSK-002",
    name: "Revisar entregas",
    description: "Checar pendências antes do fim do dia.",
    project: "project-001",
    owner: "analima",
    stage: TaskStage.IN_PROGRESS,
    priority: TaskPriority.HIGH,
    due_date: shiftIso(3),
  }),
  createMockTask({
    id: "task-003",
    code: "TSK-003",
    name: "Validar artefatos",
    description: "Conferir documentação enviada pela equipe.",
    project: "project-002",
    owner: "carlas",
    stage: TaskStage.REVIEW,
    priority: TaskPriority.EXTREME,
    due_date: shiftIso(-1),
  }),
];

const members = [
  createMockProjectMember({
    id: "member-001",
    projectkey: "project-001",
    userkey: "mikaelst",
    role: MemberRole.OWNER,
    tasks: [tasks[0], tasks[1]],
  }),
  createMockProjectMember({
    id: "member-002",
    projectkey: "project-001",
    userkey: "analima",
    role: MemberRole.MEMBER,
    tasks: [tasks[1]],
  }),
  createMockProjectMember({
    id: "member-003",
    projectkey: "project-002",
    userkey: "carlas",
    role: MemberRole.MEMBER,
    tasks: [tasks[2]],
  }),
];

const affiliations = [
  createMockAffiliation({
    id: "affiliation-001",
    orgkey: "org-001",
    userkey: "mikaelst",
    role: OrgRole.OWNER,
  }),
  createMockAffiliation({
    id: "affiliation-002",
    orgkey: "org-001",
    userkey: "analima",
    role: OrgRole.MEMBER,
  }),
  createMockAffiliation({
    id: "affiliation-003",
    orgkey: "org-001",
    userkey: "carlas",
    role: OrgRole.MEMBER,
  }),
];

const events = [
  createMockEvent(),
  createMockEvent({
    id: "event-002",
    title: "Entrega parcial",
    projectkey: "project-002",
    date: shiftIso(1, 2),
  }),
  createMockEvent({
    id: "event-003",
    title: "Checkpoint semanal",
    projectkey: "project-003",
    date: shiftIso(4, 1),
  }),
];

const comments = [
  createMockComment(),
  createMockComment({
    id: "comment-002",
    content: "Ajustar o fluxo antes da publicação.",
    ownerkey: "analima",
    projectkey: "project-002",
    date: shiftIso(-2, 3),
  }),
  createMockComment({
    id: "comment-003",
    content: "Confirmar os dados do mobile com o time.",
    ownerkey: "carlas",
    projectkey: "project-003",
    date: shiftIso(-3, 1),
  }),
];

const updates = [
  createMockUpdate(),
  createMockUpdate({
    id: "update-002",
    content: "Documentação revisada e publicada.",
    ownerkey: "analima",
    projectkey: "project-002",
    date: shiftIso(-4),
  }),
  createMockUpdate({
    id: "update-003",
    content: "Validação visual concluída para a versão mobile.",
    ownerkey: "carlas",
    projectkey: "project-003",
    date: shiftIso(-6),
  }),
];

const memberStats = [
  createMockMemberStat({
    username: "mikaelst",
    project: "Portal Administrativo",
    started: 12,
    done: 8,
    overdue: 1,
  }),
  createMockMemberStat({
    username: "analima",
    project: "Migração do fluxo",
    started: 9,
    done: 7,
    overdue: 0,
  }),
  createMockMemberStat({
    username: "carlas",
    project: "Portal mobile",
    started: 6,
    done: 4,
    overdue: 2,
  }),
];

const organizations = [
  createMockOrganization({
    id: "org-001",
    name: "Tasker Labs",
    ownerkey: "mikaelst",
    owner: users[0],
    projects,
    members: affiliations,
    created_at: shiftDate(-30),
    updated_at: shiftDate(-1),
  }),
  createMockOrganization({
    id: "org-002",
    name: "Northwind Studio",
    ownerkey: "analima",
    owner: users[1],
    projects: [projects[2]],
    members: [affiliations[2]],
    created_at: shiftDate(-18),
    updated_at: shiftDate(-2),
  }),
];

export interface MockApplicationData {
  readonly users: UserDTO[];
  readonly accounts: AccountDTO[];
  readonly currentAccount: CurrentAccountDTO;
  readonly auth: AuthDTO;
  readonly organizations: OrganizationDTO[];
  readonly projects: ProjectDTO[];
  readonly tasks: TaskDTO[];
  readonly members: ProjectMember[];
  readonly affiliations: AffiliationDTO[];
  readonly events: EventDTO[];
  readonly comments: CommentDTO[];
  readonly updates: UpdateDTO[];
  readonly memberStats: MemberStatDTO[];
}

export function createMockData(): MockApplicationData {
  return {
    users: [...users],
    accounts: [...accounts],
    currentAccount,
    auth,
    organizations: [...organizations],
    projects: [...projects],
    tasks: [...tasks],
    members: [...members],
    affiliations: [...affiliations],
    events: [...events],
    comments: [...comments],
    updates: [...updates],
    memberStats: [...memberStats],
  };
}

export const mockData = createMockData();

export {
  accounts as mockAccounts,
  affiliations as mockAffiliations,
  auth as mockAuth,
  comments as mockComments,
  currentAccount as mockCurrentAccount,
  events as mockEvents,
  memberStats as mockMemberStats,
  members as mockMembers,
  organizations as mockOrganizations,
  projects as mockProjects,
  tasks as mockTasks,
  updates as mockUpdates,
  users as mockUsers,
};

export default mockData;
