import { Title } from "@/components/base/Title";
import { DaysTile, Date } from "./style";
import { SectionTitle } from "@/components/base/SectionTitle";
import { Subtitle } from "@/components/base/Subtitle";
import { Bold } from "@/components/base/Bold";
import { Container, Header } from "../../base/style";

interface DeadlineWidgetProps {
  dueDate: string;
  daysLeft: number;
}

export function DeadlineWidget({ dueDate, daysLeft }: DeadlineWidgetProps) {
  return (
    <Container>
      <Header>
        <Title>Prazo</Title>
      </Header>
      <Date>
        <SectionTitle>
          {new Intl.DateTimeFormat("pt-BR", { dateStyle: "medium" }).format(new globalThis.Date(dueDate))}
        </SectionTitle>
      </Date>
      <DaysTile>
        <Subtitle><Bold>{Math.abs(daysLeft)}</Bold> {daysLeft < 0 ? "dias em atraso" : "dias restantes"}</Subtitle>
      </DaysTile>
    </Container>
  )
}
