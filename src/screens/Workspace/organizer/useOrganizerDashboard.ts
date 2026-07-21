import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useApi } from "@/hooks/useApi";
import {
  createDashboardService,
  getDashboardErrorMessage,
  type OrganizerDashboardDTO,
} from "../services/dashboard.service";

const initialData: OrganizerDashboardDTO = {
  projects: [],
  updates: [],
  projectSummary: {
    total: 0,
    safe: 0,
    warning: 0,
    critical: 0,
  },
  deadlineAlerts: [],
};

export function useOrganizerDashboard(orgId?: string) {
  const api = useApi();
  const service = useMemo(() => createDashboardService(api), [api]);
  const requestId = useRef(0);
  
  const [data, setData] = useState<OrganizerDashboardDTO>(initialData);
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
      const nextData = await service.getOrganizerDashboard(orgId);
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
