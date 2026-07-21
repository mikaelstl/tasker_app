import { DateTime } from "luxon"
import { Container, Timeline } from "./style"
import { SectionTitle } from "../base/SectionTitle"
import { UpdateCard } from "../cards/UpdateCard"
import type { UpdateDTO } from "../../service/types/comment/update.dto"
import { ItalicTitle } from "../base/ItalicTitle"

interface UpdatesProps {
  updates: UpdateDTO[]
}

export function Updates({
  updates
}: UpdatesProps) {
  return (
    <Container className="tskr-updates">
      <SectionTitle>Atualizações</SectionTitle>

      <Timeline className="vertical" role="list">
        {updates.length === 0
          ? <ItalicTitle>Nenhuma atualização encontrada</ItalicTitle>
          :
          updates.map((update, index) =>
            <UpdateCard
              key={update.id}
              content={update.content}
              date={DateTime.fromISO(update.date)}
              owner={update.ownerkey}
              hasPrevious={index > 0}
              hasNext={index < updates.length - 1}
            />
          )}
      </Timeline>
    </Container>
  )
}
