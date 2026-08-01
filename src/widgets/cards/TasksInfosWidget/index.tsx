import { CheckIcon20, } from "@/components/icons/heroicons";
import { Text } from "../../../components/base/Text";
import { Title } from "../../../components/base/Title";
import { Content } from "./style";
import Palette from "../../../assets/palette";
import { ArrowTrendingUpIcon, ExclamationTriangleIcon } from "@/components/icons/heroicons";
import { Container, Header, Tile } from "../../base/style";

interface TasksInfosWidgetProps {
  total: number;
  done: number;
  started: number;
  delayed: number;
}

export function TasksInfosWidget({ total, done, started, delayed }: TasksInfosWidgetProps) {
  return (
    <Container>
      <Header>
        <Title>{total}</Title>
        <Text>Total de tarefas</Text>
      </Header>
      <Content>
        <Tile>
          <CheckIcon20 width={22} fill={Palette.green} />
          <Title>{done}</Title>
          <Text>Concluídas</Text>
        </Tile>
        <Tile>
          <ArrowTrendingUpIcon width={22} fill={Palette.yellow} />
          <Title>{started}</Title>
          <Text>Em andamento</Text>
        </Tile>
        <Tile>
          <ExclamationTriangleIcon width={22} fill={Palette.red} />
          <Title>{delayed}</Title>
          <Text>Atrasadas</Text>
        </Tile>
      </Content>
    </Container>
  )
}
