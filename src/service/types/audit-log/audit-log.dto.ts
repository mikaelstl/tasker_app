export const auditActorTypes = ["USER", "SYSTEM"] as const;
export type AuditActorType = (typeof auditActorTypes)[number];

export const auditActions = [
  "CREATE",
  "UPDATE",
  "DELETE",
  "ADD",
  "REMOVE",
  "COMMENT",
  "STATUS_CHANGE",
  "SYSTEM_UPDATE",
] as const;
export type AuditAction = (typeof auditActions)[number];

export const auditResources = [
  "ORGS",
  "AFFILIATIONS",
  "PROJECTS",
  "MEMBERS",
  "TASKS",
  "COMMENTS",
  "EVENTS",
  "PROJECT_STATS",
] as const;
export type AuditResource = (typeof auditResources)[number];

export type AuditJsonValue =
  | string
  | number
  | boolean
  | null
  | AuditJsonValue[]
  | { [key: string]: AuditJsonValue };

export interface AuditLogFieldChange {
  oldValue: AuditJsonValue;
  newValue: AuditJsonValue;
}

export type AuditLogChanges = Record<string, AuditLogFieldChange>;

export interface AuditLogActorDTO {
  username: string;
  name: string;
  photo?: { url: string } | null;
}

export interface AuditLogDTO {
  id: string;
  orgkey: string;
  actorkey: string | null;
  actorType: AuditActorType;
  action: AuditAction;
  resource: AuditResource;
  resourcekey: string | null;
  changes: AuditLogChanges;
  created_at: string;
  actor: AuditLogActorDTO | null;
}

export interface AuditLogPageDTO {
  items: AuditLogDTO[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
