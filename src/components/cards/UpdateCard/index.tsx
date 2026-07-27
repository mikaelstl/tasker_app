import { DateTime } from "luxon";
import {
  ActorDetails,
  Card,
  Content,
  Description,
  Detail,
  DetailField,
  DetailIcon,
  DetailValue,
  Details,
  Header,
  ResourceBadge,
  TrackerDot,
  TimelineMarker,
  UpdateDate,
} from "./style";
import { User } from "@/components/misc/User";
import { ArrowsRightLeftIcon } from "@heroicons/react/24/outline";

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
          <UpdateDate as="time" dateTime={date.toISO() ?? undefined}>
            {date.isValid
              ? localizedDate.toFormat("dd/MM/yyyy, HH:mm:ss")
              : "Data indisponível"}
          </UpdateDate>
          <ResourceBadge>{resourceLabel}</ResourceBadge>
        </Header>

        <Description>{message}</Description>

        <ActorDetails>
          <User
            actorName={actorName}
            actorUsername={actorUsername}
            actorPhotoUrl={actorPhotoUrl}
            isSystem={isSystem}
          />
        </ActorDetails>

        {details.length > 0 && (
          <Details>
            {details.map((detail) => (
              <Detail key={detail.field}>
                <DetailIcon aria-hidden="true">
                  <ArrowsRightLeftIcon />
                </DetailIcon>
                <DetailField>{detail.field}</DetailField>
                <DetailValue>
                  {detail.oldValue} <span aria-hidden="true">→</span> {detail.newValue}
                </DetailValue>
              </Detail>
            ))}
          </Details>
        )}
      </Content>
    </Card>
  );
}
