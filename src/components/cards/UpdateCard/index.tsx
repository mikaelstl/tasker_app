import { DateTime } from "luxon";
import { Subtitle } from "../../base/Subtitle";
import { Text } from "../../base/Text";
import { Avatar } from "../../misc/Avatar";
import { Card, Line, Texts } from "./style";
import { Title } from "../../base/Title";

interface UpdateCardDTO {
  readonly content:     string;
  readonly date:        DateTime;
  readonly owner:    string;
}

export function UpdateCard({
  content,
  date,
  owner,
}: UpdateCardDTO) {
  return (
    <Card className="comment-card">
      <Avatar size="medium" image=""/>
      <Texts>
        <Title>{owner}</Title>
        <Text>{content}</Text>
      </Texts>
      <Line/>
      <Subtitle className="tskr-subtitle">{date.day}, {date.monthShort} {date.hour}:{date.minute}</Subtitle>
    </Card>
  )
}