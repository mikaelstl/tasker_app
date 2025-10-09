import { Badge } from "../../badge/Badge";
import { Title } from "../../base/Title";
import { User } from "../../misc/User";
import { Card } from "./style";

export function ProjectTile() {
  return (
    <Card id="project-tile">
      <Title>Title</Title>
      <User />
      <Badge>Pending</Badge>
      <span>000/000</span>
      {/* <team /> */}
    </Card >
  )
}