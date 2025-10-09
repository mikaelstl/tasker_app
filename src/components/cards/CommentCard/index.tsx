import { Label } from "../../base/Label";
import { Subtitle } from "../../base/Subtitle";
import { Text } from "../../base/Text";
import { Avatar } from "../../misc/Avatar";
import { Flag, Indicator } from "../TaskCard/style";
import { Card, Container, Texts } from "./style";

export function CommentCard() {
  return (
    <Card className="comment-card">
      <Indicator className="indicator">
        <Flag/>
        <div className="flag"></div>
      </Indicator>
      <Container id="comment-leading">
        <Avatar size="medium" image=""/>
        <div id="text">
          <Texts id="message-label">
            <Label>Username</Label>
            <Subtitle>, in mm 00, aaaa</Subtitle>
          </Texts>
          <Text>Message</Text>
        </div>
      </Container>
    </Card>
  )
}