import { useCallback, useEffect, useRef, useState } from "react";
import { useServices } from "@/hooks/useServices";
import type { CommentDTO } from "@/service/types/comment/comment.dto";
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
  updates: CommentDTO[];
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
  const { ProjectService, CommentService, MemberService } = useServices();
  const requestId = useRef(0);
  const [data, setData] = useState<OrganizerDashboardData>(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadDashboard = useCallback(async () => {
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
      const listedProjects = (await ProjectService.list()).data;
      const projectsData = await Promise.all(listedProjects.map(async (project) => {
        const [comments, members] = await Promise.all([
          CommentService.list({ projectkey: project.id }),
          MemberService.list(project.id),
        ]);

        return {
          project: { ...project, members: members.data },
          comments: comments.data,
        };
      }));
      const projects = projectsData.map((item) => item.project);
      const updates = projectsData
        .flatMap((item) => item.comments)
        .sort((left, right) => (
          new Date(right.date).getTime() - new Date(left.date).getTime()
        ));
      const nextData: OrganizerDashboardData = {
        projects,
        updates,
        projectSummary: summarizeProjects(projects),
        deadlineAlerts: getDeadlineAlerts(projects),
      };

      if (currentRequest === requestId.current) setData(nextData);
    } catch (requestError) {
      if (currentRequest === requestId.current) {
        setError(getErrorMessage(requestError));
      }
    } finally {
      if (currentRequest === requestId.current) setLoading(false);
    }
  }, [CommentService, MemberService, ProjectService, orgId]);

  useEffect(() => {
    void loadDashboard();
    return () => {
      requestId.current += 1;
    };
  }, [loadDashboard]);

  return { loading, error, data, loadDashboard };
}
