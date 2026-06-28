import { Title } from "../../base/Title";
import { Card, Cards, Container, Header } from "./style";
import { Text } from "../../base/Text";
import Palette from "../../../assets/palette";
import { TriangleAlert } from "@/components/icons";

export function DeadlineAlertsCard() {
  return (
    <Container className="tskr-deadline-alerts-card">
      <Header>
        <TriangleAlert color={Palette.red}/>
        <Title>Deadline Alerts</Title>
      </Header>
      <Cards>
        <Card>
          <Title>Title</Title>
          <Text>Due in 00 days</Text>
        </Card>
        <Card>
          <Title>Title</Title>
          <Text>00/00</Text>
        </Card>
        <Card>
          <Title>Title</Title>
          <Text>00/00</Text>
        </Card>
        <Card>
          <Title>Title</Title>
          <Text>00/00</Text>
        </Card>
      </Cards>

    </Container>
  )
}