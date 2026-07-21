import { DateTime } from "luxon";
import {
  Card,
  Content,
  Description,
  Header,
  TrackerDot,
  TimelineMarker,
  UpdateDate,
} from "./style";
import { User } from "@/components/misc/User";

interface UpdateCardDTO {
  readonly content: string;
  readonly date: DateTime;
  readonly owner: string;
  readonly hasPrevious?: boolean;
  readonly hasNext?: boolean;
}

export function UpdateCard({
  content,
  date,
  owner,
  hasPrevious = false,
  hasNext = false,
}: UpdateCardDTO) {
  const localizedDate = date.setLocale("pt-BR");

  return (
    <Card className="tskr-update-card" role="listitem">
      <TimelineMarker
        $hasPrevious={hasPrevious}
        $hasNext={hasNext}
        aria-hidden="true"
      >
        <TrackerDot />
      </TimelineMarker>

      <Content>
        <Header>
          <User username={owner}/>
          <UpdateDate as="time" dateTime={date.toISO() ?? undefined}>
            {localizedDate.toFormat("dd LLL • HH:mm")}
          </UpdateDate>
        </Header>
        <Description>{content}</Description>
      </Content>
    </Card>
  )
}
