export type AuditActorType = "USER" | "SYSTEM";
export const auditActorTypes: AuditActorType[] = ["USER", "SYSTEM"];

export type AuditAction =
  | "CREATE"
  | "UPDATE"
  | "DELETE"
  | "ADD"
  | "REMOVE"
  | "COMMENT"
  | "STATUS_CHANGE"
  | "SYSTEM_UPDATE";

export const auditActions: AuditAction[] = [
  "CREATE",
  "UPDATE",
  "DELETE",
  "ADD",
  "REMOVE",
  "COMMENT",
  "STATUS_CHANGE",
  "SYSTEM_UPDATE",
];

export type AuditResource =
  | "ORGS"
  | "AFFILIATIONS"
  | "PROJECTS"
  | "MEMBERS"
  | "TASKS"
  | "COMMENTS"
  | "EVENTS"
  | "PROJECT_STATS";

export const auditResources: AuditResource[] = [
  "ORGS",
  "AFFILIATIONS",
  "PROJECTS",
  "MEMBERS",
  "TASKS",
  "COMMENTS",
  "EVENTS",
  "PROJECT_STATS",
];

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

export interface AuditLogChanges {
  [field: string]: AuditLogFieldChange;
}

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
