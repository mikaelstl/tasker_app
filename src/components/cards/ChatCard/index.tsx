import { Badge } from "../../badge/Badge";
import { Subtitle } from "../../base/Subtitle";
import { Title } from "../../base/Title";
import { Avatar } from "../../misc/Avatar";
import { Container, Leading } from "./style";

export function ChatCard() {
  return (
    <Container className="chat-card">
      <Leading className="chat-leading">
        <Avatar online={false} size="small" image=""/>
        <div id="texts">
          <Title>Nome do chat</Title>
          <Subtitle>Mensagem</Subtitle>
        </div>
      </Leading>
      <Badge>+n</Badge>
    </Container>
  )
}
