import type { AuditAction, AuditResource } from "./audit-log.dto";

export interface AuditLogQueryDTO {
  actorkey?: string;
  action?: AuditAction;
  resource?: AuditResource;
  resourcekey?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}
