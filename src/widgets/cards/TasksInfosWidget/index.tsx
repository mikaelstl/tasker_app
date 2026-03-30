import { CheckIcon, } from "@heroicons/react/20/solid";
import { Text } from "../../../components/base/Text";
import { Title } from "../../../components/base/Title";
import { Content } from "./style";
import Palette from "../../../assets/palette";
import { ArrowTrendingUpIcon, ExclamationTriangleIcon } from "@heroicons/react/16/solid";
import { Container, Header, Tile } from "../../base/style";

export function TasksInfosWidget() {
  return (
    <Container>
      <Header>
        <Title>00</Title>
        <Text>Total Tasks</Text>
      </Header>
      <Content>
        <Tile>
          <CheckIcon width={22} fill={Palette.green} />
          <Title>00</Title>
          <Text>Done</Text>
        </Tile>
        <Tile>
          <ArrowTrendingUpIcon width={22} fill={Palette.yellow} />
          <Title>00</Title>
          <Text>In progress</Text>
        </Tile>
        <Tile>
          <ExclamationTriangleIcon width={22} fill={Palette.red} />
          <Title>00</Title>
          <Text>Overdue</Text>
        </Tile>
      </Content>
    </Container>
  )
}