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
import { Abstract, AbstractItem, Comments, Container, Content, ImportantTasks, ProjectInfo } from "./style";

export function Overview() {
  const tasks = Array.from({length: 10}, (_, i) => i);

  return (
    <Container className="overview">
      <Abstract className="abstract">
        <ProjectInfo>
          <div id="leading">
            <Title>Project name</Title>
            <Text>description</Text>
          </div>
          <Badge>Pending</Badge>
        </ProjectInfo>
        <AbstractItem className="abstract-item">
          <Label>Owner</Label>
          <User />
        </AbstractItem>
        <AbstractItem className="abstract-item">
          <Label>Due date</Label>
          <DateBadge />
        </AbstractItem>
      </Abstract>
      <Content className="content">
        {/* <project-menu /> */}
        <ImportantTasks className="important-tasks">
          <Title>Most important</Title>
          <Scroller className="horizontal">
            {
              tasks.map((_) => <TaskCard title="Task" description="Description"/>)
            }
          </Scroller>
        </ImportantTasks>
        <Comments className="overview-comments">
          <Title>Comments</Title>
          <div id="cards">
            {
              tasks.map((_) => <CommentCard/>)
            }
          </div>
        </Comments>
      </Content>
      <ImportantDates/>
    </Container>
  )
}