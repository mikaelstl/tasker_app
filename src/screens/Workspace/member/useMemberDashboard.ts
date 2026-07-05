import { useCallback, useEffect, useMemo, useState } from "react";
import { useApi } from "@/hooks/useApi";
import { useOrganization } from "@/hooks/useOrganization";
import { createDashboardService } from "../services/dashboard.service";
import type { MemberDashboardDTO } from "../services/dashboard.types";

export function useMemberDashboard() {
  const api = useApi();
  const { org } = useOrganization();
  const service = useMemo(() => createDashboardService(api), [api]);

  const [data, setData] = useState<MemberDashboardDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadDashboard = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const dashboard = await service.getMemberDashboard(org?.orgkey);
      setData(dashboard);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Falha ao carregar dashboard do membro.");
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
