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
        <Title>Deadline Alerts</Title>
      </Header>
      <Cards>
        {deadlines.length === 0 ? (
          <Text>Nenhum alerta de prazo</Text>
        ) : deadlines.map((deadline) => (
          <Card key={deadline.projectkey}>
            <Title>{deadline.title}</Title>
            <Text>
              {deadline.daysRemaining < 0
                ? `${Math.abs(deadline.daysRemaining)} days overdue`
                : `Due in ${deadline.daysRemaining} days`}
            </Text>
          </Card>
        ))}
      </Cards>

    </Container>
  )
}
