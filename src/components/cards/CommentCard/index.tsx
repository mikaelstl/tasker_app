import { DateTime } from "luxon";
import { Label } from "../../base/Label";
import { Subtitle } from "../../base/Subtitle";
import { Text } from "../../base/Text";
import { Avatar } from "../../misc/Avatar";
import { Card, Container, Texts } from "./style";
import { formatNumber } from "../../../utils/formatNumber";

interface CommentCardDTO {
  readonly content:     string;
  readonly date:        DateTime;
  readonly owner:    string;
}

export function CommentCard({
  content,
  date,
  owner,
}: CommentCardDTO) {
  return (
    <Card className="comment-card">
      <Container id="comment-leading">
        <Avatar size="medium" image=""/>
        <div id="text">
          <Texts id="message-label">
            <Label>{owner}</Label>
            <Subtitle>, in {date.monthShort} {formatNumber(date.day)}, {date.year}</Subtitle>
          </Texts>
          <Text>{content}</Text>
        </div>
      </Container>
    </Card>
  )
}