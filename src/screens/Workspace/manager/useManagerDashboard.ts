import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useApi } from "@/hooks/useApi";
import {
  createDashboardService,
  getDashboardErrorMessage,
  type ManagerDashboardDTO,
} from "../services/dashboard.service";

const initialData: ManagerDashboardDTO = {
  stats: {
    started: 0,
    done: 0,
    review: 0,
    overdue: 0,
  },
  deadlines: [],
  membersStats: [],
  events: [],
};

export function useManagerDashboard(orgId?: string) {
  const api = useApi();
  const service = useMemo(() => createDashboardService(api), [api]);
  const requestId = useRef(0);
  const [data, setData] = useState<ManagerDashboardDTO>(initialData);
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
      const nextData = await service.getManagerDashboard(orgId);
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

  return { loading, error, data, refetch };
}
