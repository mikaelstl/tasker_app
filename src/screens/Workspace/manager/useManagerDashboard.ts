import { useCallback, useEffect, useRef, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useServices } from "@/hooks/useServices";
import type { EventDTO } from "@/service/types/events/event.dto";
import type { MemberStatDTO } from "@/service/types/member/member-stat.dto";
import type { ProjectMember } from "@/service/types/member/member.dto";
import { ProjectStage, type ProjectDTO } from "@/service/types/project/project.dto";
import type { ApiError } from "@/service/types/response/error";
import { TaskStage } from "@/service/types/task/stage.dto";
import type { TaskDTO } from "@/service/types/task/task.dto";

interface ManagerStats {
  started: number;
  done: number;
  review: number;
  overdue: number;
}

interface Deadline {
  projectkey: string;
  title: string;
  dueDate: string;
  daysRemaining: number;
}

interface ManagerDashboardData {
  stats: ManagerStats;
  deadlines: Deadline[];
  membersStats: MemberStatDTO[];
  events: EventDTO[];
  projects: ProjectDTO[];
  projectData: ManagerProjectData[];
}

interface ManagerProjectData {
  project: ProjectDTO;
  stats: ManagerStats;
  deadlines: Deadline[];
  membersStats: MemberStatDTO[];
  events: EventDTO[];
}

const initialData: ManagerDashboardData = {
  stats: { started: 0, done: 0, review: 0, overdue: 0 },
  deadlines: [],
  membersStats: [],
  events: [],
  projects: [],
  projectData: [],
};

function getErrorMessage(error: unknown): string {
  const apiError = error as Partial<ApiError>;
  return apiError.errors?.[0]?.message ?? "Não foi possível carregar o dashboard.";
}

function getStats(tasks: TaskDTO[]): ManagerStats {
  const now = Date.now();

  return {
    started: tasks.filter((task) => task.stage === TaskStage.IN_PROGRESS).length,
    done: tasks.filter((task) => task.stage === TaskStage.DONE).length,
    review: tasks.filter((task) => task.stage === TaskStage.REVIEW).length,
    overdue: tasks.filter((task) => (
      task.stage !== TaskStage.DONE && new Date(task.due_date).getTime() < now
    )).length,
  };
}

function getDeadlines(projects: ProjectDTO[]): Deadline[] {
  return projects
    .filter((project) => project.stage !== ProjectStage.DONE)
    .map((project) => ({
      projectkey: project.id,
      title: project.title,
      dueDate: project.due_date,
      daysRemaining: Math.ceil(
        (new Date(project.due_date).getTime() - Date.now()) / 86_400_000,
      ),
    }))
    .sort((left, right) => left.daysRemaining - right.daysRemaining);
}

function getMemberUsername(member: ProjectMember): string {
  return member.user?.user?.username ?? member.user?.userkey ?? member.userkey;
}

function getMemberStats(
  project: ProjectDTO,
  members: ProjectMember[],
  tasks: TaskDTO[],
): MemberStatDTO[] {
  const now = Date.now();

  return members.map((member) => {
    const username = getMemberUsername(member);
    const memberTasks = tasks.filter((task) => (
      task.owner === member.id
      || task.owner === member.userkey
      || task.owner === username
    ));

    return {
      username,
      project: project.title,
      started: memberTasks.filter((task) => task.stage === TaskStage.IN_PROGRESS).length,
      review: memberTasks.filter((task) => task.stage === TaskStage.REVIEW).length,
      done: memberTasks.filter((task) => task.stage === TaskStage.DONE).length,
      overdue: memberTasks.filter((task) => (
        task.stage !== TaskStage.DONE && new Date(task.due_date).getTime() < now
      )).length,
    };
  });
}

export function useManagerDashboard(orgId?: string) {
  const { user } = useAuth();
  const {
    ProjectService,
    TaskService,
    MemberService,
    EventService,
  } = useServices();
  const requestId = useRef(0);
  const [data, setData] = useState<ManagerDashboardData>(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadDashboard = useCallback(async () => {
    const currentRequest = ++requestId.current;
    const username = user?.username;

    if (!orgId || !username) {
      setData(initialData);
      setError(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const projectsResponse = await ProjectService.list();
      const projects = projectsResponse.data.filter(
        (project) => project.managerkey === username,
      );
      const projectsData = await Promise.all(projects.map(async (project) => {
        const [tasks, members, events] = await Promise.all([
          TaskService.list(project.id),
          MemberService.list(project.id),
          EventService.list({ projectkey: project.id }),
        ]);

        return {
          project,
          tasks: tasks.data,
          stats: getStats(tasks.data),
          deadlines: getDeadlines([project]),
          membersStats: getMemberStats(project, members.data, tasks.data),
          events: events.data,
        };
      }));
      const tasks = projectsData.flatMap((project) => project.tasks);
      const nextData: ManagerDashboardData = {
        stats: getStats(tasks),
        deadlines: getDeadlines(projects),
        membersStats: projectsData.flatMap((project) => project.membersStats),
        events: projectsData.flatMap((project) => project.events),
        projects,
        projectData: projectsData.map(({ project, stats, deadlines, membersStats, events }) => ({
          project,
          stats,
          deadlines,
          membersStats,
          events,
        })),
      };

      if (currentRequest === requestId.current) setData(nextData);
    } catch (requestError) {
      if (currentRequest === requestId.current) {
        setError(getErrorMessage(requestError));
      }
    } finally {
      if (currentRequest === requestId.current) setLoading(false);
    }
  }, [
    EventService,
    MemberService,
    ProjectService,
    TaskService,
    orgId,
    user?.username,
  ]);

  useEffect(() => {
    void loadDashboard();
    return () => {
      requestId.current += 1;
    };
  }, [loadDashboard]);

  return { loading, error, data, loadDashboard };
}
