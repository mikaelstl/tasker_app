import { DateTime } from "luxon";
import {
  Card,
  Content,
  Description,
  Detail,
  DetailField,
  Details,
  Header,
  ResourceBadge,
  TrackerDot,
  TimelineMarker,
  UpdateDate,
} from "./style";
import { User } from "@/components/misc/User";

interface UpdateCardDTO {
  readonly actorName: string;
  readonly actorUsername: string | null;
  readonly actorPhotoUrl: string | null;
  readonly isSystem: boolean;
  readonly message: string;
  readonly resourceLabel: string;
  readonly date: DateTime;
  readonly details: Array<{
    field: string;
    oldValue: string;
    newValue: string;
  }>;
  readonly hasPrevious?: boolean;
  readonly hasNext?: boolean;
}

export function UpdateCard({
  actorName,
  actorUsername,
  actorPhotoUrl,
  isSystem,
  message,
  resourceLabel,
  date,
  details,
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
          <User
            actorName={actorName}
            actorUsername={actorUsername}
            actorPhotoUrl={actorPhotoUrl}
            isSystem={isSystem}
          />
          <UpdateDate as="time" dateTime={date.toISO() ?? undefined}>
            {date.isValid ? localizedDate.toFormat("dd LLL • HH:mm") : "Data indisponível"}
          </UpdateDate>
        </Header>
        <Description>{message}</Description>
        <ResourceBadge>{resourceLabel}</ResourceBadge>
        {details.length > 0 && (
          <Details>
            {details.map((detail) => (
              <Detail key={detail.field}>
                <DetailField>{detail.field}</DetailField>
                <span>{detail.oldValue} → {detail.newValue}</span>
              </Detail>
            ))}
          </Details>
        )}
      </Content>
    </Card>
  )
}
