import Palette from "../../../assets/palette";
import { formatNumber } from "../../../utils/formatNumber";
import { Badge } from "../../badge/Badge";
import { Text } from "../../base/Text";
import { User } from "../../misc/User";
import { Container } from "./style";

interface MemberTile {
  username: string;
  tasks: {
    total: number,
    done: number
  },
  type: 'member' | 'owner',
}

export function MemberTile(props: MemberTile) {
  return (
    <Container id="member-tile">
      <User username={props.username}/>
      <Badge color={props.type === 'member' ? Palette.lightBlue : Palette.lightRed}>{props.type}</Badge>
      <Text id="total-tasks">{formatNumber(props.tasks.done)} out of {formatNumber(props.tasks.total, 3)}</Text>
    </Container>
  )
}