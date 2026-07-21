import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useApi } from "@/hooks/useApi";
import { TaskStage } from "@/service/types/task/stage.dto";
import type { TaskDTO } from "@/service/types/task/task.dto";
import {
  createDashboardService,
  getDashboardErrorMessage,
  type MemberDashboardDTO,
} from "../services/dashboard.service";

const initialData: MemberDashboardDTO = {
  tasks: [],
  events: [],
};

export interface MemberTaskCategories {
  today: TaskDTO[];
  thisWeek: TaskDTO[];
  pending: TaskDTO[];
  overdue: TaskDTO[];
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
  const api = useApi();
  const service = useMemo(() => createDashboardService(api), [api]);
  const requestId = useRef(0);
  const [data, setData] = useState<MemberDashboardDTO>(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    const currentRequest = ++requestId.current;

    if (!orgId) {
      setData(initialData);
      setError(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const nextData = await service.getMemberDashboard(orgId);
      if (currentRequest === requestId.current) setData(nextData);
    } catch (requestError) {
      if (currentRequest === requestId.current) {
        setError(getDashboardErrorMessage(requestError));
      }
    } finally {
      if (currentRequest === requestId.current) setLoading(false);
    }
  }, [orgId, service]);

  useEffect(() => {
    void refetch();
    return () => {
      requestId.current += 1;
    };
  }, [refetch]);

  const taskCategories = useMemo(() => categorizeTasks(data.tasks), [data.tasks]);

  return {
    loading,
    error,
    data: { ...data, taskCategories },
    refetch,
  };
}
