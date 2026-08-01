import { Title } from "../../base/Title";
import { Container, Date, Header, Infos } from "./style";
import { CalendarIcon } from "@/components/icons/heroicons";
import { Subtitle } from "../../base/Subtitle";
import { DateTime } from "luxon";

interface NextDeadlineCardProps {
  deadline: {
    title: string;
    dueDate: string;
  };
}

export function NextDeadlineCard({ deadline }: NextDeadlineCardProps) {
  return (
    <Container className="tskr-next-deadline-card">
      <Header>
        <Title>Próximo prazo</Title>
        <CalendarIcon width={20}/>
      </Header>
      <Infos>
        <Date>{DateTime.fromISO(deadline.dueDate).setLocale("pt-BR").toFormat("dd 'de' LLL 'de' yyyy")}</Date>
        <Subtitle>{deadline.title}</Subtitle>
      </Infos>
    </Container>
  )
}
