import type { UpdateDTO } from "@/service/types/comment/update.dto";
import type { EventDTO } from "@/service/types/events/event.dto";
import type { MemberStatDTO } from "@/service/types/member/member-stat.dto";
import type { ProjectDTO } from "@/service/types/project/project.dto";
import type { TaskDTO } from "@/service/types/task/task.dto";

export interface DashboardMetricDTO {
  readonly label: string;
  readonly value: number;
}

export interface MemberDashboardDTO {
  readonly tasks: TaskDTO[];
  readonly events: EventDTO[];
}

export interface OrganizerDashboardDTO {
  readonly projects: ProjectDTO[];
  readonly updates: UpdateDTO[];
}

export interface ManagerDashboardDTO {
  readonly stats: DashboardMetricDTO[];
  readonly deadlines: TaskDTO[];
  readonly membersStats: MemberStatDTO[];
  readonly events: EventDTO[];
}
