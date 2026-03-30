import { Title } from "../../../components/base/Title";
import { DaysTile, Date } from "./style";
import { SectionTitle } from "../../../components/base/SectionTitle";
import { Subtitle } from "../../../components/base/Subtitle";
import { Bold } from "../../../components/base/Bold";
import { Container, Header } from "../../base/style";

export function DeadlineWidget() {
  return (
    <Container>
      <Header>
        <Title>Deadline</Title>
      </Header>
      <Date>
        <SectionTitle>
          00 mm yyyy
        </SectionTitle>
      </Date>
      <DaysTile>
        <Subtitle><Bold>00</Bold> Days left</Subtitle>
      </DaysTile>
    </Container>
  )
}