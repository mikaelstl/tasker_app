import Palette from "../../../assets/palette";
import { Badge } from "../../badge/Badge";
import { Subtitle } from "../../base/Subtitle";
import { User } from "../../misc/User";
import { Container, Indicator, Leading } from "./style";
import type { MemberStatDTO } from "@/service/types/member/member-stat.dto";

interface MemberStatTileProps {
  member: MemberStatDTO;
}

export function MemberStatTile(props: MemberStatTileProps) {
  return (
    <Container className="tskr-member-stats-tile">
      <Leading>
        <Subtitle>{props.member.project}</Subtitle>
        <User username={props.member.username} />
      </Leading>
      <Indicator>
        <Subtitle>Started</Subtitle>
        <Badge color={Palette.lightBlue_50}>{String(props.member.started).padStart(2, "0")}</Badge>
      </Indicator>
      <Indicator>
        <Subtitle>Done</Subtitle>
        <Badge color={Palette.green_50}>{String(props.member.done).padStart(2, "0")}</Badge>
      </Indicator>
      <Indicator>
        <Subtitle>Overdue</Subtitle>
        <Badge color={Palette.red_50}>{String(props.member.overdue).padStart(2, "0")}</Badge>
      </Indicator>
    </Container>
  )
}
