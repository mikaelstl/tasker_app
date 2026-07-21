import { Subtitle } from "../../../components/base/Subtitle";
import { Text } from "../../../components/base/Text";
import { ToggleSwitch } from "../../../components/base/ToggleSwitch";
import { Container } from "./style";

export function EnableTimeTrackWidget() {
  return (
    <Container className="tskr-enable-time-track">
      <Text>Ativar controle de tempo</Text>
      <ToggleSwitch/>
      <Subtitle>Ative o controle de tempo nas tarefas para acompanhar quanto tempo os membros da equipe dedicam a cada uma delas.</Subtitle>
    </Container>
  )
}
