import { useCallback, useEffect, useRef, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useServices } from "@/hooks/useServices";
import type { EventDTO } from "@/service/types/events/event.dto";
import { ProjectStage, type ProjectDTO } from "@/service/types/project/project.dto";
import type { ApiError } from "@/service/types/response/error";
import type { MemberStats, ProjectStatsSummary } from "@/service/types/stats/stats.types";

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
  membersStats: MemberStats[];
  events: EventDTO[];
  projects: ProjectDTO[];
  projectData: ManagerProjectData[];
}

interface ManagerProjectData {
  project: ProjectDTO;
  stats: ManagerStats;
  deadlines: Deadline[];
  membersStats: MemberStats[];
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
  const apiError = error as ApiError;
  return apiError.errors?.[0]?.message ?? "Não foi possível carregar o dashboard.";
}

function getStats(summary: ProjectStatsSummary): ManagerStats {
  return {
    started: summary.startedTasks,
    done: summary.doneTasks,
    review: summary.reviewTasks,
    overdue: summary.delayedTasks,
  };
}

function getDeadlines(projects: ProjectDTO[]): Deadline[] {
  return projects
    .filter((project) => project.stage !== ProjectStage.COMPLETED)
    .map((project) => ({
      projectkey: project.id,
      title: project.title,
      dueDate: project.deadline,
      daysRemaining: Math.ceil(
        (new Date(project.deadline).getTime() - Date.now()) / 86_400_000,
      ),
    }))
    .sort((left, right) => left.daysRemaining - right.daysRemaining);
}

export function useManagerDashboard(orgId?: string) {
  const { user } = useAuth();
  const {
    ProjectService,
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
      const projects = projectsResponse.data;
      const projectsData = await Promise.all(projects.map(async (project) => {
        const [stats, members, events] = await Promise.all([
          ProjectService.stats(project.id),
          ProjectService.getProjectMemberStats(project.id),
          EventService.list({ projectkey: project.id }),
        ]);

        return {
          project,
          stats: getStats(stats.data.summary),
          deadlines: getDeadlines([project]),
          membersStats: members.data,
          events: events.data,
        };
      }));

      const stats = projectsData.reduce<ManagerStats>(
        (total, project) => ({
          started: total.started + project.stats.started,
          done: total.done + project.stats.done,
          review: total.review + project.stats.review,
          overdue: total.overdue + project.stats.overdue,
        }),
        { started: 0, done: 0, review: 0, overdue: 0 },
      );
      const nextData: ManagerDashboardData = {
        stats,
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
    ProjectService,
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
