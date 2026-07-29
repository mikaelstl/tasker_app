import { DateTime } from "luxon"
import { Actions, Container, Status, Timeline } from "./style"
import { SectionTitle } from "../base/SectionTitle"
import { UpdateCard } from "../cards/UpdateCard"
import type { AuditLogDTO } from "@/service/types/audit-log/audit-log.dto"
import { ItalicTitle } from "../base/ItalicTitle"
import { formatAuditLog } from "@/utils/audit-log/formatAuditLog"
import { Button } from "../buttons/Button"

interface UpdatesProps {
  updates: AuditLogDTO[];
  hasMore?: boolean;
  loadingMore?: boolean;
  error?: string | null;
  onLoadMore?: () => void;
}

export function Updates({
  updates,
  hasMore = false,
  loadingMore = false,
  error = null,
  onLoadMore,
}: UpdatesProps) {
  const items = updates.map(formatAuditLog);

  return (
    <Container className="tskr-updates">
      <SectionTitle>Atualizações</SectionTitle>

      <Timeline orientation="vertical" role="list">
        {items.length === 0
          ? <ItalicTitle>Nenhuma atualização encontrada</ItalicTitle>
          :
          items.map((update, index) =>
            <UpdateCard
              key={update.id}
              actorName={update.actorName}
              actorUsername={update.actorUsername}
              actorPhotoUrl={update.actorPhotoUrl}
              isSystem={update.isSystem}
              message={update.message}
              resourceLabel={update.resourceLabel}
              details={update.details}
              date={DateTime.fromISO(update.occurredAt)}
              hasPrevious={index > 0}
              hasNext={index < items.length - 1}
            />
          )}
        <Actions>
          {error && <Status role="alert">{error}</Status>}
          {(hasMore || error) && onLoadMore && (
            <Button type="button" disabled={loadingMore} onClick={onLoadMore}>
              {loadingMore ? "Carregando..." : error ? "Tentar novamente" : "Carregar mais"}
            </Button>
          )}
        </Actions>
      </Timeline>
    </Container>
  )
}
