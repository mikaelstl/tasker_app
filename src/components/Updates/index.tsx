import { DateTime } from "luxon"
import { Scroller } from "../misc/Scroller"
import { Container } from "./style"
import { SectionTitle } from "../base/SectionTitle"
import { UpdateCard } from "../cards/UpdateCard"
import type { CommentDTO } from "../../service/types/comment/comment.dto"
import { Margin } from "../misc/Margin"

interface UpdatesProps {
  updates: CommentDTO[]
}

export function Updates({
  updates
}: UpdatesProps) {
  return (
    <Container className="tskr-updates">
      <SectionTitle>Updates</SectionTitle>

      <Scroller className="vertical">
        {
          updates.map((_) =>{
            return <Margin bottom="2px">
              <UpdateCard
                content="Atualização"
                date={DateTime.local()}
                owner="mikaelst"
              />
            </Margin>}
          )
        }
      </Scroller>
    </Container>
  )
}