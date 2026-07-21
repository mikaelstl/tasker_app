import { Title } from "../../base/Title";
import { Card, Cards, Container, Header } from "./style";
import { Text } from "../../base/Text";
import Palette from "../../../assets/palette";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

interface DeadlineAlert {
  projectkey: string;
  title: string;
  daysRemaining: number;
}

interface DeadlineAlertsCardProps {
  deadlines: DeadlineAlert[];
}

export function DeadlineAlertsCard({ deadlines }: DeadlineAlertsCardProps) {
  return (
    <Container className="tskr-deadline-alerts-card">
      <Header>
        <ExclamationTriangleIcon fill={Palette.red} width={22}/>
        <Title>Alertas de prazo</Title>
      </Header>
      <Cards>
        {deadlines.length === 0 ? (
          <Text>Nenhum alerta de prazo</Text>
        ) : deadlines.map((deadline) => (
          <Card key={deadline.projectkey}>
            <Title>{deadline.title}</Title>
            <Text>
              {deadline.daysRemaining < 0
                ? `${Math.abs(deadline.daysRemaining)} dias em atraso`
                : `Vence em ${deadline.daysRemaining} dias`}
            </Text>
          </Card>
        ))}
      </Cards>

    </Container>
  )
}
