import { useCallback, useEffect, useMemo, useState } from "react";
import { useApi } from "@/hooks/useApi";
import { useOrganization } from "@/hooks/useOrganization";
import { createDashboardService } from "../services/dashboard.service";
import type { ManagerDashboardDTO } from "../services/dashboard.types";

export function useManagerDashboard() {
  const api = useApi();
  const { org } = useOrganization();
  const service = useMemo(() => createDashboardService(api), [api]);

  const [data, setData] = useState<ManagerDashboardDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadDashboard = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const dashboard = await service.getManagerDashboard(org?.orgkey);
      setData(dashboard);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Falha ao carregar dashboard do gestor.");
    } finally {
      setLoading(false);
    }
  }, [org?.orgkey, service]);

  useEffect(() => {
    void loadDashboard();
  }, [loadDashboard]);

  return {
    loading,
    error,
    data,
    refetch: loadDashboard,
  };
}
