import { useCallback, useEffect, useState } from "react";
import { useOrganization } from "@/hooks/useOrganization";
import type { ProjectDTO } from "@/service/types/project/project.dto";
import { useServices } from "@/hooks/useServices";
import type { ApiError } from "@/service/types/response/error";
import { Toasts } from "@/maps/toasts";

export function useOrganizerDashboard() {
  const { org } = useOrganization();

  const { ProjectService } = useServices();
  
  const [loading, setLoading] = useState(true);
  const [hasError, setError] = useState(false);

  const [projects, setProjects] = useState<ProjectDTO[]>([]);
  const loadProjects = async () => {
    try {
      const response = await ProjectService.list({
        ownerkey: org?.orgkey
      });

      const data: ProjectDTO[] = response.data;

      setProjects(data);
    } catch (error) {
      const { errors } = error as ApiError;

      errors?.forEach(
        err => {
          const notify = Toasts[err.level];
          notify(err.message);
        }
      );

      setError(true);
    }
  }
  
  const loadDashboard = useCallback(async () => {
    setLoading(true);

    loadProjects();

    setLoading(false);
  }, [org?.orgkey, ProjectService]);

  useEffect(() => {
    void loadDashboard();
  }, [loadDashboard]);

  return {
    loading,
    projects,
    refetch: loadDashboard,
  };
}
