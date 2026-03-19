import { Title } from "../../base/Title";
import { Container, Date, Header, Infos } from "./style";
import { CalendarIcon } from "@heroicons/react/24/solid";
import { Subtitle } from "../../base/Subtitle";

export function NextDeadlineCard() {
  return (
    <Container className="tskr-next-deadline-card">
      <Header>
        <Title>Next Deadline</Title>
        <CalendarIcon width={20}/>
      </Header>
      <Infos>
        <Date>Mm DD, YYYY</Date>
        <Subtitle>Project</Subtitle>
      </Infos>
    </Container>
  )
}