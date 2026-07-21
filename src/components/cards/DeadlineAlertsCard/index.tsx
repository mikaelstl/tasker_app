import { ClockIcon } from "@heroicons/react/24/outline";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import { DateTime } from "luxon";
import { useNavigate } from "react-router-dom";
import Palette from "../../../assets/palette";
import { Text } from "../../base/Text";
import { Title } from "../../base/Title";
import {
  Card,
  CardContent,
  Cards,
  Clock,
  Container,
  Header,
  ProjectInfo,
  StatusBadge,
} from "./style";

interface DeadlineAlert {
  projectkey: string;
  title: string;
  dueDate: string;
  daysRemaining: number;
}

interface DeadlineAlertsCardProps {
  deadlines: DeadlineAlert[];
}

function getDeadlineStatus(daysRemaining: number) {
  if (daysRemaining < 0) {
    return {
      label: `${Math.abs(daysRemaining)} dias em atraso`,
      background: Palette.red_25,
      color: Palette.red,
    };
  }

  if (daysRemaining === 0) {
    return {
      label: "Vence hoje",
      background: Palette.red_25,
      color: Palette.red,
    };
  }

  return {
    label: daysRemaining === 1 ? "Vence amanhã" : `${daysRemaining} dias restantes`,
    background: daysRemaining <= 7 ? Palette.yellow_25 : Palette.blue_50,
    color: daysRemaining <= 7 ? Palette.yellow : Palette.lightBlue,
  };
}

export function DeadlineAlertsCard({ deadlines }: DeadlineAlertsCardProps) {
  const navigate = useNavigate();

  return (
    <Container className="tskr-deadline-alerts-card">
      <Header>
        <ExclamationTriangleIcon fill={Palette.red} width={22} />
        <Title>Alertas de prazo</Title>
      </Header>
      <Cards>
        {deadlines.length === 0 ? (
          <Text>Nenhum alerta de prazo</Text>
        ) : deadlines.map((deadline) => {
          const status = getDeadlineStatus(deadline.daysRemaining);
          const dueDate = DateTime.fromISO(deadline.dueDate)
            .setLocale("pt-BR")
            .toFormat("dd 'de' LLL 'de' yyyy");

          return (
            <Card
              key={deadline.projectkey}
              type="button"
              className="tskr-deadline-alert-card"
              onClick={() => navigate(`/home/project/${deadline.projectkey}/overview`)}
              aria-label={`Abrir projeto ${deadline.title}`}
            >
              <CardContent>
                <Clock>
                  <ClockIcon width={16} />
                </Clock>
                <ProjectInfo>
                  <Title>{deadline.title}</Title>
                  <Text className="tskr-deadline-date">Prazo: {dueDate}</Text>
                </ProjectInfo>
              </CardContent>
              <StatusBadge bg={status.background} $color={status.color}>
                {status.label}
              </StatusBadge>
            </Card>
          );
        })}
      </Cards>
    </Container>
  );
}
