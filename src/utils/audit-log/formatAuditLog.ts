import type {
  AuditJsonValue,
  AuditLogDTO,
  AuditLogFieldChange,
} from "@/service/types/audit-log/audit-log.dto";

export interface AuditLogItemViewModel {
  id: string;
  actorName: string;
  actorUsername: string | null;
  actorPhotoUrl: string | null;
  isSystem: boolean;
  message: string;
  resourceLabel: string;
  occurredAt: string;
  details: AuditLogDetailViewModel[];
}

export interface AuditLogDetailViewModel {
  field: string;
  oldValue: string;
  newValue: string;
}

const resourceLabels = new Map<string, string>([
  ["ORGS", "organização"],
  ["AFFILIATIONS", "afiliação"],
  ["PROJECTS", "projeto"],
  ["MEMBERS", "membro"],
  ["TASKS", "tarefa"],
  ["COMMENTS", "comentário"],
  ["EVENTS", "evento"],
  ["PROJECT_STATS", "relatório do projeto"],
]);

const resourceArticles = new Map<string, "a" | "o">([
  ["ORGS", "a"],
  ["AFFILIATIONS", "a"],
  ["PROJECTS", "o"],
  ["MEMBERS", "o"],
  ["TASKS", "a"],
  ["COMMENTS", "o"],
  ["EVENTS", "o"],
  ["PROJECT_STATS", "o"],
]);

const actionLabels = new Map<string, string>([
  ["CREATE", "criou"],
  ["UPDATE", "atualizou"],
  ["DELETE", "excluiu"],
  ["ADD", "adicionou"],
  ["REMOVE", "removeu"],
  ["COMMENT", "comentou em"],
  ["STATUS_CHANGE", "alterou o status de"],
  ["SYSTEM_UPDATE", "atualizou automaticamente"],
]);

const taskStageLabels = new Map<string, string>([
  ["STARTED", "Iniciada"],
  ["PENDING", "Pendente"],
  ["REVIEW", "Em revisão"],
  ["DONE", "Concluída"],
  ["COMPLETED", "Concluída"],
]);

const fieldLabels = new Map<string, string>([
  ["title", "Título"],
  ["name", "Nome"],
  ["stage", "Status"],
  ["delayed", "Prazo"],
  ["userkey", "Usuário"],
  ["estimate", "Estimativa"],
  ["labels", "Marcadores"],
  ["metadata", "Metadados"],
]);

function isChange(value: unknown): value is AuditLogFieldChange {
  return Boolean(
    value
    && typeof value === "object"
    && !Array.isArray(value)
    && Object.prototype.hasOwnProperty.call(value, "oldValue")
    && Object.prototype.hasOwnProperty.call(value, "newValue"),
  );
}

function valueFrom(log: AuditLogDTO, field: string, side: "oldValue" | "newValue") {
  const change = log.changes[field];
  return isChange(change) ? change[side] : undefined;
}

function namedResource(log: AuditLogDTO): string | null {
  const candidate = valueFrom(log, "title", "newValue")
    ?? valueFrom(log, "name", "newValue")
    ?? valueFrom(log, "title", "oldValue")
    ?? valueFrom(log, "name", "oldValue");

  return typeof candidate === "string" && candidate.trim() ? candidate : null;
}

function formatValue(value: AuditJsonValue | undefined, field: string): string {
  if (value === undefined || value === null) return "Não definido";
  if (field === "stage" && typeof value === "string") {
    return taskStageLabels.get(value) ?? value;
  }
  if (typeof value === "boolean") {
    if (field === "delayed") return value ? "Atrasada" : "No prazo";
    return value ? "Sim" : "Não";
  }
  if (typeof value === "string" || typeof value === "number") return String(value);

  try {
    return JSON.stringify(value);
  } catch {
    return "Valor indisponível";
  }
}

function formatMessage(log: AuditLogDTO, resourceLabel: string): string {
  const stage = log.changes.stage;
  const delayed = log.changes.delayed;
  const userkey = log.changes.userkey;
  const resourceName = namedResource(log);
  const article = resourceArticles.get(log.resource);
  const target = article ? `${article} ${resourceLabel}` : "uma atividade";
  const statusTarget = article === "o" ? `do ${resourceLabel}` : `da ${resourceLabel}`;

  if (log.action === "STATUS_CHANGE" && isChange(stage)) {
    return `alterou o status ${statusTarget} de ${formatValue(stage.oldValue, "stage")} para ${formatValue(stage.newValue, "stage")}`;
  }
  if (log.action === "SYSTEM_UPDATE" && log.resource === "TASKS" && isChange(delayed) && delayed.newValue === true) {
    return "marcou automaticamente a tarefa como atrasada";
  }
  if (log.action === "ADD" && log.resource === "MEMBERS" && isChange(userkey)) {
    return `adicionou ${formatValue(userkey.newValue, "userkey")} ao projeto`;
  }
  if (log.action === "REMOVE" && log.resource === "MEMBERS" && isChange(userkey)) {
    return `removeu ${formatValue(userkey.oldValue, "userkey")} do projeto`;
  }
  if (log.action === "COMMENT" && log.resource === "COMMENTS") {
    return "adicionou um comentário";
  }

  const actionLabel = actionLabels.get(log.action) ?? "realizou uma ação em";
  return `${actionLabel} ${target}${resourceName ? ` ${resourceName}` : ""}`;
}

export function formatAuditLog(log: AuditLogDTO): AuditLogItemViewModel {
  const resourceLabel = resourceLabels.get(log.resource) ?? "atividade";
  const rawChanges = log.changes && typeof log.changes === "object" && !Array.isArray(log.changes)
    ? Object.entries(log.changes)
    : [];
  const isSystem = log.actorType === "SYSTEM";

  return {
    id: log.id,
    actorName: isSystem ? "Sistema" : log.actor?.name ?? "Usuário removido",
    actorUsername: isSystem ? null : log.actor?.username ?? log.actorkey,
    actorPhotoUrl: isSystem ? null : log.actor?.photo?.url ?? null,
    isSystem,
    message: formatMessage(log, resourceLabel),
    resourceLabel,
    occurredAt: log.created_at,
    details: rawChanges.flatMap(([field, change]) => isChange(change)
      ? [{
          field: fieldLabels.get(field) ?? field,
          oldValue: formatValue(change.oldValue, field),
          newValue: formatValue(change.newValue, field),
        }]
      : []),
  };
}
