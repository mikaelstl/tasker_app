import type { TaskStage } from "../task/stage.dto";
import type { EventCategory } from "../events/event.dto";

export enum ProjectHealthStatus {
  SAFE='SAFE',
  WARNING='WARNING',
  CRITICAL='CRITICAL'
};

export enum StatsPeriodType {
  WEEK='WEEK',
  MONTH='MONTH',
  QUARTER='QUARTER'
};

export type StatsPeriod = {
  start: string;
  end: string;
};

export type StatsUser = {
  username: string;
  name: string;
  photoUrl: string | null;
};

export type StatsTask = {
  id: string;
  code: string;
  name: string;
  stage: TaskStage;
  delayed: boolean;
  spentMinutes: number;
  deadline: string;
  startedAt: string | null;
  doneAt: string | null;
};

export type MemberPerformance = {
  memberId: string;
  user: StatsUser;
  months: Array<{
    month: string;
    averageHours: number;
  }>;
  averageHoursPerMonth: number;
};

export type MemberProductivity = {
  memberId: string;
  completed: number;
  delayed: number;
  ratio: number;
};

export type MemberStats = {
  memberId: string;
  user: StatsUser;
  completedTasks: number;
  delayedTasks: number;
  startedTasks: number;
  reviewTasks: number;
  tasks: StatsTask[];
};

export type ProjectStats = {
  generatedAt: string;
  cutoffAt: string;
  period: StatsPeriod | null;
  project: {
    id: string;
    title: string;
    stage: string;
    startedAt: string | null;
    doneAt: string | null;
    deadline: string;
    delayed: boolean;
    organization: string;
    manager: string | null;
  };
  summary: {
    totalTasks: number;
    doneTasks: number;
    openTasks: number;
    startedTasks: number;
    reviewTasks: number;
    delayedTasks: number;
    progress: number;
  };
  deadline: {
    dueDate: string;
    daysLeft: number;
  };
  health: {
    status: ProjectHealthStatus;
    score: number;
    reason: string;
    projectedDeliveryAt: string | null;
  };
  performancePerMember: MemberPerformance[];
  productivity: MemberProductivity[];
  members: MemberStats[];
  events: Array<{
    id: string;
    title: string;
    date: string;
    category: EventCategory;
  }>;
};

export type ProjectStatsPeriodTask = {
  id?: string;
  snapshotkey: string;
  taskkey: string;
  memberkey: string;
  spent_minutes: number;
  started_at: string | null;
  done_at: string | null;
  created_at?: string;
  updated_at?: string;
};

export type ProjectStatsPeriodSnapshot = {
  id: string;
  projectkey: string;
  period_type: StatsPeriodType;
  period_start: string;
  period_end: string;
  generated_at: string;
  cutoff_at: string;
  performance_per_member_json: MemberPerformance[];
  productivity_json: MemberProductivity[];
  summary_json: ProjectStats["summary"];
  health_status: ProjectHealthStatus;
  health_score: number;
  created_at: string;
  updated_at: string;
  periodTasks?: ProjectStatsPeriodTask[];
};

export type ProjectStatsReportPayload = {
  stats: ProjectStats;
  snapshot: ProjectStatsPeriodSnapshot & {
    periodTasks: ProjectStatsPeriodTask[];
  };
  historicalSnapshots: ProjectStatsPeriodSnapshot[];
};

export type ProjectStatsReport = {
  id: string;
  projectkey: string;
  generated_at: string;
  cutoff_at: string;
  period_type: StatsPeriodType;
  snapshotkey: string | null;
  file_url: string | null;
  payload_json: ProjectStatsReportPayload | null;
  created_at: string;
  updated_at: string;
};

export type RecordTaskWorkLogInput = {
  taskkey: string;
  memberkey: string;
  loggedAt?: string;
  note?: string;
  source?: string;
};

export type GenerateSnapshotInput = {
  projectkey: string;
  periodType: StatsPeriodType;
  cutoffAt?: string;
};

export type GenerateReportInput = {
  projectkey: string;
  periodType: StatsPeriodType;
  cutoffAt?: string;
};

export type GeneratedProjectReport = {
  filename: string;
  document: Uint8Array;
};

export type StatsTaskRecord = {
  id: string;
  code: string;
  name: string;
  stage: TaskStage;
  deadline: string;
  ownerkey: string;
  started_at: string | null;
  done_at: string | null;
};
