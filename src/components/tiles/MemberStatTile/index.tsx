import Palette from "../../../assets/palette";
import { Badge } from "../../badge/Badge";
import { Subtitle } from "../../base/Subtitle";
import { User } from "../../misc/User";
import { Container, Indicator, Leading } from "./style";

interface MemberStatTileProps {
  username: string;
  project: string;
  started: number;
  done: number;
  overdue: number;
}

export function MemberStatTile(props: MemberStatTileProps) {
  return (
    <Container className="tskr-member-stats-tile">
      <Leading>
        <Subtitle>{props.project}</Subtitle>
        <User username={props.username} />
      </Leading>
      <Indicator>
        <Subtitle>Iniciadas</Subtitle>
        <Badge bg={Palette.lightBlue_50} text={Palette.lightBlue}>{props.started}</Badge>
      </Indicator>
      <Indicator>
        <Subtitle>Concluídas</Subtitle>
        <Badge bg={Palette.green_50} text={Palette.green}>{props.done}</Badge>
      </Indicator>
      <Indicator>
        <Subtitle>Atrasadas</Subtitle>
        <Badge bg={Palette.red_50} text={Palette.red}>{props.overdue}</Badge>
      </Indicator>
    </Container>
  )
}
