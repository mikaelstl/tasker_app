import { Text } from "../../base/Text";
import { Avatar } from "../Avatar";
import { Container } from "./style";

interface UserProps {
  online?: boolean;
  username: string
}

export function User(props: UserProps) {
  return (
    <Container className="user">
      <Avatar online={props.online ?? false} size="small" image=""/>
      <Text>{props.username}</Text>
    </Container>
  )
}