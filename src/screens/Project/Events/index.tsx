import { CreateButton } from "../../../components/buttons/CreateButton";
import { ProjectMenu } from "../../../components/ProjectMenu";
import { CalendarArea, Container, Header } from "./style";
import { Calendar } from "../../../components/misc/Calendar";

export function Events() {
  return (
    <Container className="calendar-page">
      <Header id="calendar-header">
        <ProjectMenu />
        <CreateButton>New Task</CreateButton>
      </Header>
      <CalendarArea id="calendar-area">
        <Calendar />
      </CalendarArea>
    </Container>
  )
}