import type { AccountDTO } from "../types/account/account.dto";
import type { CurrentAccountDTO } from "../types/account/current-account.dto";
import type { AuthDTO } from "../types/auth/auth.dto";
import type { AffiliationDTO } from "../types/affiliation/affiliation.dto";
import type { CommentDTO } from "../types/comment/comment.dto";
import type { EventDTO } from "../types/events/event.dto";
import type { MemberStatDTO } from "../types/member/member-stat.dto";
import type { ProjectMember } from "../types/member/member.dto";
import type { OrganizationDTO } from "../types/organization/organization.dto";
import { ProjectProgress, type ProjectDTO } from "../types/project/project.dto";
import type { ApiResponse } from "../types/response/response";
import type { TaskDTO } from "../types/task/task.dto";
import type { UserDTO } from "../types/user/user.dto";

import { MemberRole } from "../types/member/role.dto";
import { TaskPriority } from "../types/task/priority.dto";
import { TaskStage } from "../types/task/stage.dto";
import { OrgRole } from "../../utils/enums/OrgRole";

type MockDataShape = {
  accounts: AccountDTO[];
  users: UserDTO[];
  organizations: OrganizationDTO[];
  affiliations: AffiliationDTO[];
  projects: ProjectDTO[];
  members: ProjectMember[];
  tasks: TaskDTO[];
  comments: CommentDTO[];
  events: EventDTO[];
  memberStats: MemberStatDTO[];
  currentAccount: CurrentAccountDTO;
  auth: AuthDTO;
};

type EntityCounterKey =
  | "account"
  | "user"
  | "org"
  | "affiliation"
  | "project"
  | "member"
  | "task"
  | "comment"
  | "event";

const counters: Record<EntityCounterKey, number> = {
  account: 1,
  user: 1,
  org: 1,
  affiliation: 1,
  project: 1,
  member: 1,
  task: 1,
  comment: 1,
  event: 1,
};

const baseDate = new Date("2026-07-14T10:00:00.000Z");

function isoAt(minutesOffset: number): string {
  return new Date(baseDate.getTime() + minutesOffset * 60_000).toISOString();
}

function dateAt(daysOffset: number, hoursOffset = 0): string {
  return new Date(baseDate.getTime() + (daysOffset * 24 + hoursOffset) * 3_600_000).toISOString();
}

export function createMockId(prefix: EntityCounterKey): string {
  const current = counters[prefix];
  counters[prefix] += 1;
  return `${prefix.slice(0, 3)}-${String(current).padStart(3, "0")}`;
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

export function createMockAccount(data: Partial<AccountDTO> = {}): AccountDTO {
  return {
    id: data.id ?? "acc-000",
    email: data.email ?? "conta@tasker.dev",
    password: data.password ?? "Senha@000",
    created_at: data.created_at ?? baseDate.toISOString(),
    updated_at: data.updated_at ?? baseDate.toISOString(),
  };
}

export function createMockUser(data: Partial<UserDTO> = {}): UserDTO {
  return {
    id: data.id ?? "usr-000",
    name: data.name ?? "Usuario Mock",
    username: data.username ?? "usuario.mock",
    accountkey: data.accountkey ?? "acc-000",
    created_at: data.created_at ?? baseDate.toISOString(),
    updated_at: data.updated_at ?? baseDate.toISOString(),
  };
}

export function createMockOrganization(data: Partial<OrganizationDTO> = {}): OrganizationDTO {
  return {
    id: data.id ?? "org-000",
    name: data.name ?? "Organizacao Mock",
    ownerkey: data.ownerkey ?? "usuario.mock",
    owner: data.owner,
    projects: data.projects ?? [],
    members: data.members ?? [],
    created_at: data.created_at ?? new Date(baseDate),
    updated_at: data.updated_at ?? new Date(baseDate),
  };
}

export function createMockAffiliation(data: Partial<AffiliationDTO> = {}): AffiliationDTO {
  return {
    id: data.id ?? "aff-000",
    orgkey: data.orgkey ?? "org-000",
    userkey: data.userkey ?? "usuario.mock",
    role: data.role ?? OrgRole.MEMBER,
    org: data.org,
    user: data.user,
    created_at: data.created_at ?? baseDate.toISOString(),
    updated_at: data.updated_at ?? baseDate.toISOString(),
  };
}

export function createMockProject(data: Partial<ProjectDTO> = {}): ProjectDTO {
  return {
    id: data.id ?? "pro-000",
    title: data.title ?? "Projeto Mock",
    description: data.description ?? "Descricao do projeto mock",
    ownerkey: data.ownerkey ?? "org-000",
    due_date: data.due_date ?? baseDate.toISOString(),
    progress: data.progress ?? ProjectProgress.PENDING,
    managerkey: data.managerkey ?? null,
    members: data.members ?? [],
    created_at: data.created_at ?? baseDate.toISOString(),
    updated_at: data.updated_at ?? baseDate.toISOString(),
  };
}

export function createMockProjectMember(data: Partial<ProjectMember> = {}): ProjectMember {
  return {
    id: data.id ?? "mem-000",
    projectkey: data.projectkey ?? "pro-000",
    userkey: data.userkey ?? "aff-000",
    role: data.role ?? MemberRole.MEMBER,
    tasks: data.tasks ?? [],
    user: data.user,
    created_at: data.created_at ?? baseDate.toISOString(),
    updated_at: data.updated_at ?? baseDate.toISOString(),
  };
}

export function createMockTask(data: Partial<TaskDTO> = {}): TaskDTO {
  return {
    id: data.id ?? "tsk-000",
    code: data.code ?? "TSK-0000",
    name: data.name ?? "Tarefa Mock",
    description: data.description ?? "Descricao da tarefa mock",
    project: data.project ?? "pro-000",
    owner: data.owner ?? "mem-000",
    stage: data.stage ?? TaskStage.PENDING,
    priority: data.priority ?? TaskPriority.MEDIUM,
    due_date: data.due_date ?? baseDate.toISOString(),
    created_at: data.created_at ?? baseDate.toISOString(),
    updated_at: data.updated_at ?? baseDate.toISOString(),
  };
}

export function createMockComment(data: Partial<CommentDTO> = {}): CommentDTO {
  return {
    id: data.id ?? "com-000",
    content: data.content ?? "Comentario mock",
    date: data.date ?? baseDate.toISOString(),
    ownerkey: data.ownerkey ?? "usuario.mock",
    projectkey: data.projectkey ?? "pro-000",
    created_at: data.created_at ?? baseDate.toISOString(),
    updated_at: data.updated_at ?? baseDate.toISOString(),
  };
}

export function createMockEvent(data: Partial<EventDTO> = {}): EventDTO {
  return {
    id: data.id ?? "evt-000",
    title: data.title ?? "Evento mock",
    projectkey: data.projectkey ?? "pro-000",
    date: data.date ?? baseDate.toISOString(),
    category: data.category ?? "MEETING",
    created_at: data.created_at ?? baseDate.toISOString(),
    updated_at: data.updated_at ?? baseDate.toISOString(),
  };
}

export function createMockAuth(data: Partial<AuthDTO> = {}): AuthDTO {
  return {
    account: data.account ?? "acc-000",
    email: data.email ?? "conta@tasker.dev",
    access_token: data.access_token ?? "mock-token",
    username: data.username ?? "usuario.mock",
  };
}

export function createMockCurrentAccount(data: Partial<CurrentAccountDTO> = {}): CurrentAccountDTO {
  return {
    id: data.id ?? "acc-000",
    username: data.username ?? "usuario.mock",
    email: data.email ?? "conta@tasker.dev",
    ...(data.role ? { role: data.role } : {}),
  };
}

const userSeeds = [
  { username: "mikaelst", name: "Mikael Stanley", password: "Senha@15" },
  { username: "ana.silva", name: "Ana Silva", password: "Senha@01" },
  { username: "bruno.lima", name: "Bruno Lima", password: "Senha@02" },
  { username: "clara.melo", name: "Clara Melo", password: "Senha@03" },
  { username: "diego.souza", name: "Diego Souza", password: "Senha@04" },
  { username: "elisa.alves", name: "Elisa Alves", password: "Senha@05" },
  { username: "fernando.santos", name: "Fernando Santos", password: "Senha@06" },
  { username: "giovana.pereira", name: "Giovana Pereira", password: "Senha@07" },
  { username: "henrique.ramos", name: "Henrique Ramos", password: "Senha@08" },
  { username: "isabela.cunha", name: "Isabela Cunha", password: "Senha@09" },
  { username: "joao.cesar", name: "Joao Cesar", password: "Senha@10" },
  { username: "karla.rocha", name: "Karla Rocha", password: "Senha@11" },
  { username: "lucas.vieira", name: "Lucas Vieira", password: "Senha@12" },
  { username: "mariana.nunes", name: "Mariana Nunes", password: "Senha@13" },
  { username: "nicolas.freitas", name: "Nicolas Freitas", password: "Senha@14" },
  { username: "olivia.mendes", name: "Olivia Mendes", password: "Senha@15" },
  { username: "paulo.barbosa", name: "Paulo Barbosa", password: "Senha@16" },
  { username: "quiteria.martins", name: "Quiteria Martins", password: "Senha@17" },
  { username: "rafael.lopes", name: "Rafael Lopes", password: "Senha@18" },
  { username: "sophia.tavares", name: "Sophia Tavares", password: "Senha@19" },
  { username: "tiago.ribeiro", name: "Tiago Ribeiro", password: "Senha@20" },
];

type AffiliationSeed = Pick<UserDTO, "username"> & Pick<AffiliationDTO, "role">;

interface OrganizationSeed extends Pick<OrganizationDTO, "name"> {
  ownerUsername: UserDTO["username"];
  affiliations: AffiliationSeed[];
}

const organizationSeeds: OrganizationSeed[] = [
  {
    name: "Aurora Tech",
    ownerUsername: "ana.silva",
    affiliations: [
      { username: "ana.silva", role: OrgRole.OWNER },
      { username: "fernando.santos", role: OrgRole.MANAGER },
      { username: "karla.rocha", role: OrgRole.MANAGER },
      { username: "lucas.vieira", role: OrgRole.MEMBER },
      { username: "mariana.nunes", role: OrgRole.MEMBER },
      { username: "giovana.pereira", role: OrgRole.MEMBER },
    ],
  },
  {
    name: "Nimbus Digital",
    ownerUsername: "bruno.lima",
    affiliations: [
      { username: "bruno.lima", role: OrgRole.OWNER },
      { username: "giovana.pereira", role: OrgRole.MANAGER },
      { username: "nicolas.freitas", role: OrgRole.MEMBER },
      { username: "olivia.mendes", role: OrgRole.MANAGER },
      { username: "paulo.barbosa", role: OrgRole.MEMBER },
      { username: "henrique.ramos", role: OrgRole.MEMBER },
    ],
  },
  {
    name: "Orion Labs",
    ownerUsername: "clara.melo",
    affiliations: [
      { username: "clara.melo", role: OrgRole.OWNER },
      { username: "henrique.ramos", role: OrgRole.MANAGER },
      { username: "quiteria.martins", role: OrgRole.MEMBER },
      { username: "rafael.lopes", role: OrgRole.MEMBER },
      { username: "sophia.tavares", role: OrgRole.MEMBER },
      { username: "isabela.cunha", role: OrgRole.MEMBER },
    ],
  },
  {
    name: "Vertex Solucoes",
    ownerUsername: "diego.souza",
    affiliations: [
      { username: "diego.souza", role: OrgRole.OWNER },
      { username: "isabela.cunha", role: OrgRole.MANAGER },
      { username: "tiago.ribeiro", role: OrgRole.MEMBER },
      { username: "karla.rocha", role: OrgRole.MEMBER },
      { username: "nicolas.freitas", role: OrgRole.MEMBER },
      { username: "joao.cesar", role: OrgRole.MANAGER },
    ],
  },
  {
    name: "Atlas Commerce",
    ownerUsername: "elisa.alves",
    affiliations: [
      { username: "elisa.alves", role: OrgRole.OWNER },
      { username: "joao.cesar", role: OrgRole.MANAGER },
      { username: "lucas.vieira", role: OrgRole.MEMBER },
      { username: "mariana.nunes", role: OrgRole.MANAGER },
      { username: "olivia.mendes", role: OrgRole.MEMBER },
      { username: "fernando.santos", role: OrgRole.MEMBER },
    ],
  },
];

const projectTemplates = [
  { title: "Portal de Atendimento", description: "Experiencia central de suporte e abertura de chamados." },
  { title: "Painel Operacional", description: "Visao consolidada para acompanhamento do time." },
  { title: "Fluxo de Onboarding", description: "Entrada guiada para novos clientes e usuarios." },
  { title: "Integracao com ERP", description: "Sincronizacao dos principais eventos de negocio." },
  { title: "Relatorios Executivos", description: "Indicadores e graficos para tomada de decisao." },
];

const taskTemplates = [
  "Mapear requisitos",
  "Desenhar layout",
  "Implementar endpoint",
  "Validar autenticacao",
  "Criar testes",
  "Ajustar permissao",
  "Revisar entrega",
  "Publicar versao",
];

const commentTemplates = [
  "Revisao encaminhada para a proxima etapa.",
  "Ajustes pontuais foram aplicados e a entrega segue ok.",
  "Dependencia externa ainda em acompanhamento.",
  "Bloco validado com o time responsavel.",
];

const eventCategories = ["RELEASE", "MEETING", "REVIEW", "PLANNING", "TESTS", "LAUNCH"] as const;

const accountRecords = userSeeds.map((seed, index) =>
  createMockAccount({
    id: createMockId("account"),
    email: `${seed.username}@tasker.dev`,
    password: seed.password,
    created_at: isoAt(index * 6),
    updated_at: isoAt(index * 6),
  }),
);

const users = userSeeds.map((seed, index) =>
  createMockUser({
    id: createMockId("user"),
    username: seed.username,
    name: seed.name,
    accountkey: accountRecords[index].id,
    created_at: isoAt(index * 6 + 1),
    updated_at: isoAt(index * 6 + 1),
  }),
);

const usersByUsername = new Map(users.map((user) => [user.username, user] as const));

const organizations = organizationSeeds.map((seed, index) =>
  createMockOrganization({
    id: createMockId("org"),
    name: seed.name,
    ownerkey: seed.ownerUsername,
    owner: usersByUsername.get(seed.ownerUsername),
    created_at: new Date(dateAt(index * 20)),
    updated_at: new Date(dateAt(index * 20)),
  }),
);

const affiliations = organizations.flatMap((organization, orgIndex) => {
  const seed = organizationSeeds[orgIndex];

  return seed.affiliations.map((affiliation, index) =>
    {
      const user = usersByUsername.get(affiliation.username);

      return createMockAffiliation({
        id: createMockId("affiliation"),
        orgkey: organization.id,
        userkey: affiliation.username,
        role: affiliation.role,
        org: organization,
        ...(user ? { user } : {}),
        created_at: isoAt(orgIndex * 45 + index * 5),
        updated_at: isoAt(orgIndex * 45 + index * 5),
      });
    },
  );
});

const affiliationsByOrg = new Map<string, AffiliationDTO[]>();
for (const affiliation of affiliations) {
  const current = affiliationsByOrg.get(affiliation.orgkey) ?? [];
  current.push(affiliation);
  affiliationsByOrg.set(affiliation.orgkey, current);
}

const projects = organizations.flatMap((organization, orgIndex) => {
  const orgAffiliations = affiliationsByOrg.get(organization.id) ?? [];
  const managerAffiliation = orgAffiliations.find((item) => item.role === OrgRole.MANAGER) ?? null;

  return projectTemplates.map((template, projectIndex) =>
    createMockProject({
      id: createMockId("project"),
      title: `${organization.name} - ${template.title}`,
      description: template.description,
      ownerkey: organization.id,
      managerkey: managerAffiliation?.id ?? null,
      due_date: dateAt(30 + orgIndex * 12 + projectIndex * 4),
      progress:
        [ProjectProgress.STARTED, ProjectProgress.REVIEW, ProjectProgress.PENDING, ProjectProgress.DONE, ProjectProgress.OVERDUE][
          (orgIndex + projectIndex) % 5
        ],
      created_at: isoAt(orgIndex * 100 + projectIndex * 10),
      updated_at: isoAt(orgIndex * 100 + projectIndex * 10),
    }),
  );
});

const projectsByOrg = new Map<string, ProjectDTO[]>();
for (const project of projects) {
  const currentOrgProjects = projectsByOrg.get(project.ownerkey) ?? [];
  currentOrgProjects.push(project);
  projectsByOrg.set(project.ownerkey, currentOrgProjects);
}

const members: ProjectMember[] = [];
const projectMembersByProject = new Map<string, ProjectMember[]>();

for (const [orgIndex, organization] of organizations.entries()) {
  const orgAffiliations = affiliationsByOrg.get(organization.id) ?? [];
  const ownerAffiliation = orgAffiliations.find((item) => item.role === OrgRole.OWNER);
  const managerAffiliation = orgAffiliations.find((item) => item.role === OrgRole.MANAGER);
  const memberAffiliations = orgAffiliations.filter((item) => item.role === OrgRole.MEMBER);
  const orgProjects = projectsByOrg.get(organization.id) ?? [];

  orgProjects.forEach((project, projectIndex) => {
    const selectedAffiliations = [
      ownerAffiliation,
      managerAffiliation,
      memberAffiliations[projectIndex % memberAffiliations.length],
      memberAffiliations[(projectIndex + 1) % memberAffiliations.length],
    ].filter((item): item is AffiliationDTO => Boolean(item));

    const projectMembers = selectedAffiliations.map((affiliation, memberIndex) =>
      createMockProjectMember({
        id: createMockId("member"),
        projectkey: project.id,
        userkey: affiliation.id,
        role: memberIndex === 0 ? MemberRole.OWNER : MemberRole.MEMBER,
        user: affiliation,
        created_at: isoAt(orgIndex * 160 + projectIndex * 12 + memberIndex * 3),
        updated_at: isoAt(orgIndex * 160 + projectIndex * 12 + memberIndex * 3),
      }),
    );

    members.push(...projectMembers);
    projectMembersByProject.set(project.id, projectMembers);
    Object.assign(project, { members: projectMembers });
  });
}

const tasks: TaskDTO[] = [];

for (const [orgIndex, organization] of organizations.entries()) {
  const orgProjects = projectsByOrg.get(organization.id) ?? [];

  orgProjects.forEach((project, projectIndex) => {
    const projectMembers = projectMembersByProject.get(project.id) ?? [];

    const projectTasks = Array.from({ length: 8 }).map((_, taskIndex) => {
      const owner = projectMembers[taskIndex % projectMembers.length];
      const stageOrder = [TaskStage.PENDING, TaskStage.IN_PROGRESS, TaskStage.REVIEW, TaskStage.DONE];
      const priorityOrder = [TaskPriority.LOW, TaskPriority.MEDIUM, TaskPriority.HIGH, TaskPriority.EXTREME];

      return createMockTask({
        id: createMockId("task"),
        code: `TSK-${String(tasks.length + 1).padStart(4, "0")}`,
        name: `${taskTemplates[taskIndex % taskTemplates.length]} - ${project.title}`,
        description: `${taskTemplates[taskIndex % taskTemplates.length]} para ${project.title}.`,
        project: project.id,
        owner: owner.id,
        stage: stageOrder[(taskIndex + projectIndex) % stageOrder.length],
        priority: priorityOrder[(taskIndex + orgIndex) % priorityOrder.length],
        due_date: dateAt(30 + orgIndex * 12 + projectIndex * 4 - (7 - taskIndex)),
        created_at: isoAt(orgIndex * 220 + projectIndex * 20 + taskIndex * 2),
        updated_at: isoAt(orgIndex * 220 + projectIndex * 20 + taskIndex * 2),
      });
    });

    tasks.push(...projectTasks);

    projectMembers.forEach((member) => {
      Object.assign(member, { tasks: projectTasks.filter((task) => task.owner === member.id) });
    });
  });
}

const comments = projects.flatMap((project, projectIndex) => {
  const projectMembers = projectMembersByProject.get(project.id) ?? [];
  const authors = projectMembers
    .map((member) => affiliations.find((affiliation) => affiliation.id === member.userkey)?.userkey)
    .filter((username): username is string => Boolean(username))
    .map((username) => usersByUsername.get(username))
    .filter((user): user is UserDTO => Boolean(user));

  return Array.from({ length: 2 + (projectIndex % 2) }).map((_, commentIndex) =>
    createMockComment({
      id: createMockId("comment"),
      content: commentTemplates[(projectIndex + commentIndex) % commentTemplates.length],
      date: isoAt(400 + projectIndex * 6 + commentIndex * 4),
      ownerkey: authors[commentIndex % authors.length]?.username ?? users[0].username,
      projectkey: project.id,
      created_at: isoAt(400 + projectIndex * 6 + commentIndex * 4),
      updated_at: isoAt(400 + projectIndex * 6 + commentIndex * 4),
    }),
  );
});

const events = projects.flatMap((project, projectIndex) =>
  Array.from({ length: 2 }).map((_, eventIndex) =>
    createMockEvent({
      id: createMockId("event"),
      title: `${eventCategories[(projectIndex + eventIndex) % eventCategories.length]} - ${project.title}`,
      date: isoAt(520 + projectIndex * 8 + eventIndex * 6),
      projectkey: project.id,
      category: eventCategories[(projectIndex + eventIndex) % eventCategories.length],
      created_at: isoAt(520 + projectIndex * 8 + eventIndex * 6),
      updated_at: isoAt(520 + projectIndex * 8 + eventIndex * 6),
    }),
  ),
);

const memberStats: MemberStatDTO[] = members.map((member) => {
  const memberTasks = tasks.filter((task) => task.owner === member.id);
  const project = projects.find((item) => item.id === member.projectkey);

  return {
    username: member.user?.userkey ?? affiliations.find((affiliation) => affiliation.id === member.userkey)?.userkey ?? member.userkey,
    project: project?.title ?? member.projectkey,
    started: memberTasks.filter((task) => task.stage === TaskStage.IN_PROGRESS || task.stage === TaskStage.REVIEW).length,
    done: memberTasks.filter((task) => task.stage === TaskStage.DONE).length,
    overdue: memberTasks.filter((task) => task.stage !== TaskStage.DONE && new Date(task.due_date).getTime() < baseDate.getTime()).length,
  };
});

for (const organization of organizations) {
  Object.assign(organization, {
    projects: projectsByOrg.get(organization.id) ?? [],
    members: affiliationsByOrg.get(organization.id) ?? [],
  });
}

const currentUser = usersByUsername.get("ana.silva") ?? users[0];
const currentAccount = accountRecords.find((account) => account.id === currentUser.accountkey) ?? accountRecords[0];

export const mockData: MockDataShape = {
  accounts: accountRecords,
  users,
  organizations,
  affiliations,
  projects,
  members,
  tasks,
  comments,
  events,
  memberStats,
  currentAccount: createMockCurrentAccount({
    id: currentAccount.id,
    username: currentUser.username,
    email: currentAccount.email,
    role: OrgRole.OWNER,
  }),
  auth: createMockAuth({
    account: currentAccount.id,
    email: currentAccount.email,
    username: currentUser.username,
    access_token: `mock-token-${currentAccount.id}`,
  }),
};

export default mockData;
export type { MockDataShape };
