import { Badge } from "../../../components/badge/Badge";
import { DateBadge } from "../../../components/badge/DateBadge";
import { Label } from "../../../components/base/Label";
import { Text } from "../../../components/base/Text";
import { Title } from "../../../components/base/Title";
import { CommentCard } from "../../../components/cards/CommentCard";
import { TaskCard } from "../../../components/cards/TaskCard";
import { ImportantDates } from "../../../components/ImportantDates";
import { Scroller } from "../../../components/misc/Scroller";
import { User } from "../../../components/misc/User";
import { ProjectMenu } from "../../../components/ProjectMenu";
import { Abstract, AbstractItem, Comments, Container, Content, ImportantTasks, ProjectInfo } from "./style";

export function Members() {
  const tasks = Array.from({length: 10}, (_, i) => i);

  return (
    <Container className="members">
      <Text>Members</Text>
    </Container>
  )
}