import { Subtitle } from "../../../components/base/Subtitle";
import { Text } from "../../../components/base/Text";
import { ToggleSwitch } from "../../../components/base/ToggleSwitch";
import { Container } from "./style";

export function EnableTimeTrackWidget() {
  return (
    <Container className="tskr-enable-time-track">
      <Text>Enable Time Tracking</Text>
      <ToggleSwitch/>
      <Subtitle>Enable time tracking on tasks to monitor the amount of time team members spend on each task.</Subtitle>
    </Container>
  )
}