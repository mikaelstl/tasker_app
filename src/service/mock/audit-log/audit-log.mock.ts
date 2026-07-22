import type { AuditLogServiceI } from "@/service/modules/audit-log/audit-log.service";
import type { AuditLogPageDTO } from "@/service/types/audit-log/audit-log.dto";
import type { AuditLogQueryDTO } from "@/service/types/audit-log/audit-log.query.dto";
import type { ApiResponse } from "@/service/types/response/response";
import { createMockResponse, mockData } from "../data";
import {
  createMockRequestError,
  requireMockOrgRequest,
} from "../request-context";

export class AuditLogMockService implements AuditLogServiceI {
  async list(
    orgId: string,
    query: AuditLogQueryDTO = {},
  ): Promise<ApiResponse<AuditLogPageDTO>> {
    const path = `/org/${orgId}/audit-logs`;
    const context = requireMockOrgRequest(path, mockData.affiliations);

    if (context.orgkey !== orgId) {
      throw createMockRequestError(
        path,
        403,
        "A organização da rota difere da organização selecionada.",
      );
    }

    const page = query.page ?? 1;
    const limit = query.limit ?? 20;

    if (!Number.isInteger(page) || page < 1) {
      throw createMockRequestError(path, 400, "A página deve ser um inteiro maior ou igual a 1.");
    }

    if (!Number.isInteger(limit) || limit < 1 || limit > 100) {
      throw createMockRequestError(path, 400, "O limite deve ser um inteiro entre 1 e 100.");
    }

    const startTimestamp = query.startDate ? Date.parse(query.startDate) : null;
    const endTimestamp = query.endDate ? Date.parse(query.endDate) : null;

    if (
      (startTimestamp !== null && Number.isNaN(startTimestamp))
      || (endTimestamp !== null && Number.isNaN(endTimestamp))
    ) {
      throw createMockRequestError(path, 400, "O intervalo deve usar datas ISO 8601 válidas.");
    }

    const filtered = mockData.auditLogs
      .filter((log) => log.orgkey === orgId)
      .filter((log) => !query.actorkey || log.actorkey === query.actorkey)
      .filter((log) => !query.action || log.action === query.action)
      .filter((log) => !query.resource || log.resource === query.resource)
      .filter((log) => !query.resourcekey || log.resourcekey === query.resourcekey)
      .filter((log) => startTimestamp === null || Date.parse(log.created_at) >= startTimestamp)
      .filter((log) => endTimestamp === null || Date.parse(log.created_at) <= endTimestamp)
      .sort((left, right) => Date.parse(right.created_at) - Date.parse(left.created_at));
    const total = filtered.length;
    const start = (page - 1) * limit;

    return createMockResponse(
      {
        items: filtered.slice(start, start + limit),
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
      path,
      "Logs de auditoria listados com sucesso.",
    );
  }
}
