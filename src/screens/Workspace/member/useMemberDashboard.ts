import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useServices } from "@/hooks/useServices";
import type { EventDTO } from "@/service/types/events/event.dto";
import type { ProjectMember } from "@/service/types/member/member.dto";
import type { ApiError } from "@/service/types/response/error";
import { TaskStage } from "@/service/types/task/stage.dto";
import type { TaskDTO } from "@/service/types/task/task.dto";

interface MemberDashboardData {
  tasks: TaskDTO[];
  events: EventDTO[];
}

const initialData: MemberDashboardData = {
  tasks: [],
  events: [],
};

export interface MemberTaskCategories {
  today: TaskDTO[];
  thisWeek: TaskDTO[];
  pending: TaskDTO[];
  overdue: TaskDTO[];
}

function getErrorMessage(error: unknown): string {
  const apiError = error as Partial<ApiError>;
  return apiError.errors?.[0]?.message ?? "Não foi possível carregar o dashboard.";
}

function belongsToUser(member: ProjectMember, username: string): boolean {
  return member.userkey === username
    || member.user?.userkey === username
    || member.user?.user?.username === username;
}

function categorizeTasks(tasks: TaskDTO[]): MemberTaskCategories {
  const now = new Date();
  const endOfWeek = new Date(now);
  endOfWeek.setDate(now.getDate() + 7);

  return {
    today: tasks.filter((task) => {
      const dueDate = new Date(task.due_date);
      return dueDate.toDateString() === now.toDateString();
    }),
    thisWeek: tasks.filter((task) => {
      const dueDate = new Date(task.due_date);
      return dueDate >= now && dueDate <= endOfWeek;
    }),
    pending: tasks.filter((task) => task.stage === TaskStage.PENDING),
    overdue: tasks.filter((task) => (
      task.stage !== TaskStage.DONE && new Date(task.due_date) < now
    )),
  };
}

export function useMemberDashboard(orgId?: string) {
  const { user } = useAuth();
  const { ProjectService, TaskService, EventService, MemberService } = useServices();
  const requestId = useRef(0);
  const [data, setData] = useState<MemberDashboardData>(initialData);
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
      const projects = (await ProjectService.list()).data;
      const projectData = await Promise.all(projects.map(async (project) => {
        const [tasks, events, members] = await Promise.all([
          TaskService.list(project.id),
          EventService.list({ projectkey: project.id }),
          MemberService.list(project.id),
        ]);
        const membershipKeys = members.data
          .filter((member) => belongsToUser(member, username))
          .flatMap((member) => [member.id, member.userkey]);

        if (membershipKeys.length === 0) {
          return { tasks: [], events: [] };
        }

        return {
          tasks: tasks.data.filter((task) => (
            task.owner === username || membershipKeys.includes(task.owner)
          )),
          events: events.data,
        };
      }));
      const nextData: MemberDashboardData = {
        tasks: projectData.flatMap((project) => project.tasks),
        events: projectData.flatMap((project) => project.events),
      };

      if (currentRequest === requestId.current) setData(nextData);
    } catch (requestError) {
      if (currentRequest === requestId.current) {
        setError(getErrorMessage(requestError));
      }
    } finally {
      if (currentRequest === requestId.current) setLoading(false);
    }
  }, [EventService, MemberService, ProjectService, TaskService, orgId, user?.username]);

  useEffect(() => {
    void loadDashboard();
    return () => {
      requestId.current += 1;
    };
  }, [loadDashboard]);

  const taskCategories = useMemo(() => categorizeTasks(data.tasks), [data.tasks]);

  return {
    loading,
    error,
    data: { ...data, taskCategories },
    loadDashboard,
  };
}
