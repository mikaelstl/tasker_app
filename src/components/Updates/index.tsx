import { DateTime } from "luxon"
import { Scroller } from "../misc/Scroller"
import { Container } from "./style"
import { SectionTitle } from "../base/SectionTitle"
import { UpdateCard } from "../cards/UpdateCard"
import { Margin } from "../misc/Margin"
import { ItalicTitle } from "../base/ItalicTitle"
import type { UpdateDTO } from "@/service/types/comment/update.dto"

interface UpdatesProps {
  updates: UpdateDTO[]
}

export function Updates({
  updates
}: UpdatesProps) {
  return (
    <Container className="tskr-updates">
      <SectionTitle>Updates</SectionTitle>

      <Scroller className="vertical">
        {
          updates.length !== 0
            ? updates.map((update) => (
              <Margin key={update.id} bottom="2px">
                <UpdateCard
                  content={update.content}
                  date={DateTime.fromISO(update.date)}
                  owner={update.ownerkey}
                />
              </Margin>
            ))
            : <ItalicTitle>Sem atualizações recentes</ItalicTitle>
        }
      </Scroller>
    </Container>
  )
}
