import { Text } from "../../base/Text";
import { Card } from "./style";

interface MessageCardProps {
  children: string;
  type: "sent" | "recived"
}

export function MessageCard(props: MessageCardProps) {
  return (
    <Card className={`message-card ${props.type}`}>
      <Text>{props.children}</Text>
    </Card>
  )
}