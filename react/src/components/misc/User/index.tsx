import { Text } from "../../base/Text";
import { Avatar } from "../Avatar";
import { Container } from "./style";

export function User() {
  return (
    <Container className="user">
      <Avatar online={true} size="small" image=""/>
      <Text>username</Text>
    </Container>
  )
}