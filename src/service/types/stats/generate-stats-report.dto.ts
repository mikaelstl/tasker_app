import type { StatsPeriodType } from "./stats.types";

export interface GenerateStatsReportDTO {
  readonly periodType?: StatsPeriodType;
  readonly cutoffAt?: string;
  readonly fileUrl?: string;
}
