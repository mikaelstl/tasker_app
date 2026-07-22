import { useCallback, useEffect, useRef, useState } from "react";
import { useServices } from "@/hooks/useServices";
import type { AuditLogDTO } from "@/service/types/audit-log/audit-log.dto";
import type { ProjectMember } from "@/service/types/member/member.dto";
import { ProjectStage, type ProjectDTO } from "@/service/types/project/project.dto";
import type { ApiError } from "@/service/types/response/error";

interface ProjectSummary {
  total: number;
  safe: number;
  warning: number;
  critical: number;
}

interface Deadline {
  projectkey: string;
  title: string;
  dueDate: string;
  daysRemaining: number;
}

interface OrganizerDashboardData {
  projects: Array<ProjectDTO & { members: ProjectMember[] }>;
  updates: AuditLogDTO[];
  projectSummary: ProjectSummary;
  deadlineAlerts: Deadline[];
}

const initialData: OrganizerDashboardData = {
  projects: [],
  updates: [],
  projectSummary: { total: 0, safe: 0, warning: 0, critical: 0 },
  deadlineAlerts: [],
};

function getErrorMessage(error: unknown): string {
  const apiError = error as Partial<ApiError>;
  return apiError.errors?.[0]?.message ?? "Não foi possível carregar o dashboard.";
}

function summarizeProjects(projects: ProjectDTO[]): ProjectSummary {
  return projects.reduce<ProjectSummary>((summary, project) => {
    summary.total += 1;

    if (project.delayed) {
      summary.critical += 1;
    } else if (new Date(project.deadline).getTime() - Date.now() <= 7 * 86_400_000) {
      summary.warning += 1;
    } else {
      summary.safe += 1;
    }

    return summary;
  }, { total: 0, safe: 0, warning: 0, critical: 0 });
}

function getDeadlineAlerts(projects: ProjectDTO[]): Deadline[] {
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
    .sort((left, right) => left.daysRemaining - right.daysRemaining)
    .slice(0, 4);
}

export function useOrganizerDashboard(orgId?: string) {
  const { ProjectService, AuditLogService, MemberService } = useServices();
  const requestId = useRef(0);
  const loadedOrgId = useRef<string | undefined>(undefined);
  const pagination = useRef({ page: 0, totalPages: 0 });
  const [data, setData] = useState<OrganizerDashboardData>(initialData);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [updatesError, setUpdatesError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadDashboard = useCallback(async () => {
    const currentRequest = ++requestId.current;

    if (!orgId) {
      setData(initialData);
      loadedOrgId.current = undefined;
      pagination.current = { page: 0, totalPages: 0 };
      setError(null);
      setUpdatesError(null);
      setLoading(false);
      return;
    }

    setData(initialData);
    pagination.current = { page: 0, totalPages: 0 };
    setLoading(true);
    setLoadingMore(false);
    setError(null);
    setUpdatesError(null);

    try {
      const [listedProjects, listedAuditLogs] = await Promise.all([
        ProjectService.list(),
        AuditLogService.list(orgId, { page: 1, limit: 20 }),
      ]);
      const projects = await Promise.all(listedProjects.data.map(async (project) => {
        const members = await MemberService.list(project.id);
        return { ...project, members: members.data };
      }));
      const nextData: OrganizerDashboardData = {
        projects,
        updates: listedAuditLogs.data.items,
        projectSummary: summarizeProjects(projects),
        deadlineAlerts: getDeadlineAlerts(projects),
      };

      if (currentRequest === requestId.current) {
        loadedOrgId.current = orgId;
        pagination.current = {
          page: listedAuditLogs.data.page,
          totalPages: listedAuditLogs.data.totalPages,
        };
        setData(nextData);
      }
    } catch (requestError) {
      if (currentRequest === requestId.current) {
        loadedOrgId.current = orgId;
        setError(getErrorMessage(requestError));
      }
    } finally {
      if (currentRequest === requestId.current) setLoading(false);
    }
  }, [AuditLogService, MemberService, ProjectService, orgId]);

  const loadMoreUpdates = useCallback(async () => {
    if (
      !orgId
      || loadingMore
      || pagination.current.page >= pagination.current.totalPages
    ) return;

    const currentRequest = requestId.current;
    const nextPage = pagination.current.page + 1;
    setLoadingMore(true);
    setUpdatesError(null);

    try {
      const response = await AuditLogService.list(orgId, { page: nextPage, limit: 20 });

      if (currentRequest !== requestId.current) return;

      pagination.current = {
        page: response.data.page,
        totalPages: response.data.totalPages,
      };
      setData((current) => {
        const byId = new Map(
          [...current.updates, ...response.data.items].map((log) => [log.id, log]),
        );
        const updates = [...byId.values()].sort(
          (left, right) => Date.parse(right.created_at) - Date.parse(left.created_at),
        );
        return { ...current, updates };
      });
    } catch (requestError) {
      if (currentRequest === requestId.current) {
        setUpdatesError(getErrorMessage(requestError));
      }
    } finally {
      if (currentRequest === requestId.current) setLoadingMore(false);
    }
  }, [AuditLogService, loadingMore, orgId]);

  useEffect(() => {
    void loadDashboard();
    return () => {
      requestId.current += 1;
    };
  }, [loadDashboard]);

  const belongsToCurrentOrganization = loadedOrgId.current === orgId;

  return {
    loading: loading || !belongsToCurrentOrganization,
    error,
    data: belongsToCurrentOrganization ? data : initialData,
    loadDashboard,
    loadingMore,
    updatesError,
    loadMoreUpdates,
    hasMoreUpdates: belongsToCurrentOrganization
      && pagination.current.page < pagination.current.totalPages,
  };
}
