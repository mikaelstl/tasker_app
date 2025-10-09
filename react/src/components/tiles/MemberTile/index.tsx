import Palette from "../../../assets/palette";
import { Badge } from "../../badge/Badge";
import { Text } from "../../base/Text";
import { User } from "../../misc/User";
import { Container } from "./style";

interface MemberTile {
  tasks: {
    total: string,
    done: string
  },
  type: 'member' | 'owner',
}

export function MemberTile(props: MemberTile) {
  return (
    <Container id="member-tile">
      <User />
      <Badge color={props.type === 'member' ? Palette.light_blue : Palette.lightRed}>{props.type}</Badge>
      <Text id="total-tasks">{props.tasks.done} out of {props.tasks.total}</Text>
    </Container>
  )
}