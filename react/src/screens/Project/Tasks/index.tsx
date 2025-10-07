import { Title } from "../../../components/base/Title";
import { CreateButton } from "../../../components/buttons/CreateButton";
import { TaskCard } from "../../../components/cards/TaskCard";
import { Scroller } from "../../../components/misc/Scroller";
import { ProjectMenu } from "../../../components/ProjectMenu";
import { SearchField } from "../../../components/textfields/SearchField";
import {  Container, Content, Header, Step } from "./style";

export function Tasks() {
  const tasks = Array.from({ length: 10 }, (_, i) => i);

  return (
    <Container className="tasks">
      <Header id="tasks-header">
        <ProjectMenu/>
        <CreateButton>New Task</CreateButton>
      </Header>
      <SearchField filter sort/>
      <Content id="taks-steps">
        <Step className="taks-step">
          <Title>Pending</Title>
          <Scroller className="vertical">
            {
              tasks.map((_) => <TaskCard title="Task" description="Description"/>)
            }
          </Scroller>
        </Step>
        <Step className="step">
          <Title>Development</Title>
          <Scroller className="vertical">
            {
              tasks.map((_) => <TaskCard title="Task" description="Description"/>)
            }
          </Scroller>
        </Step>
        <Step className="step">
          <Title>Review</Title>
          <Scroller className="vertical">
            {
              tasks.map((_) => <TaskCard title="Task" description="Description"/>)
            }
          </Scroller>
        </Step>
        <Step className="step">
          <Title>Done</Title>
          <Scroller className="vertical">
            {
              tasks.map((_) => <TaskCard title="Task" description="Description"/>)
            }
          </Scroller>
        </Step>
      </Content>
    </Container>
  )
}