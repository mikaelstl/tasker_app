import Palette from "../../../assets/palette";
import { Badge } from "../../badge/Badge";
import { Subtitle } from "../../base/Subtitle";
import { User } from "../../misc/User";
import { Container, Indicator, Leading } from "./style";

interface MemberStatTileProps {
  username: string;
  project: string;
  // tasks: {
  //   total: number,
  //   done: number
  // },
}

export function MemberStatTile(props: MemberStatTileProps) {
  return (
    <Container className="tskr-member-stats-tile">
      <Leading>
        <Subtitle>{props.project}</Subtitle>
        <User username={props.username} />
      </Leading>
      <Indicator>
        <Subtitle>Started</Subtitle>
        <Badge color={Palette.lightBlue_50}>00</Badge>
      </Indicator>
      <Indicator>
        <Subtitle>Done</Subtitle>
        <Badge color={Palette.green_50}>00</Badge>
      </Indicator>
      <Indicator>
        <Subtitle>Overdue</Subtitle>
        <Badge color={Palette.red_50}>00</Badge>
      </Indicator>
    </Container>
  )
}