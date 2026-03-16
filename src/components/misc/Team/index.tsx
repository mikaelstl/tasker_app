import { Avatar } from "../Avatar";
import { Container, type TeamContainerProps } from "./style";

export function Team(props: TeamContainerProps) {
  return (
    <Container className="tskr-team" color={props.color}>
      <Avatar size="small" image=""/>
      <Avatar size="small" image=""/>
      <Avatar size="small" image=""/>
    </Container>
  )
}