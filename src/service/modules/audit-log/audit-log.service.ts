import type { ApiClient } from "@/service/api";
import type {
  AuditLogPageDTO,
} from "@/service/types/audit-log/audit-log.dto";
import type { AuditLogQueryDTO } from "@/service/types/audit-log/audit-log.query.dto";
import type { ApiResponse } from "@/service/types/response/response";

export interface AuditLogServiceI {
  list(
    orgId: string,
    query?: AuditLogQueryDTO,
  ): Promise<ApiResponse<AuditLogPageDTO>>;
}

export class AuditLogService implements AuditLogServiceI {
  constructor(private readonly api: ApiClient) {}

  list(orgId: string, query: AuditLogQueryDTO = {}) {
    return this.api.load<AuditLogPageDTO, AuditLogQueryDTO>({
      route: `/org/${encodeURIComponent(orgId)}/audit-logs`,
      // params: query,
    });
  }
}
