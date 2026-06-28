import { Title } from "../../base/Title";
import { Container, Date, Header, Infos } from "./style";
import { Subtitle } from "../../base/Subtitle";
import { Calendar } from "@/components/icons";

export function NextDeadlineCard() {
  return (
    <Container className="tskr-next-deadline-card">
      <Header>
        <Title>Next Deadline</Title>
        <Calendar />
      </Header>
      <Infos>
        <Date>Mm DD, YYYY</Date>
        <Subtitle>Project</Subtitle>
      </Infos>
    </Container>
  )
}