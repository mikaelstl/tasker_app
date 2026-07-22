import { Title } from "../../../components/base/Title";
import { Container, Content, Header } from "../../base/style";
import { Chart } from "./chart";
import type { MemberProductivity } from "../../../service/types/stats/stats.types";
import type { MemberStats } from "../../../service/types/stats/stats.types";
import { Text } from "../../../components/base/Text";

export type WeekProdutivity = {
  week: string;
  done: number;
  overdue: number;
}

export function ProdutivityChart({ productivity, members }: { productivity: MemberProductivity[]; members: MemberStats[] }) {
  const memberNames = new Map(members.map((member) => [member.memberId, member.user.name]));
  const data: WeekProdutivity[] = productivity.map((item) => ({
    week: memberNames.get(item.memberId) ?? item.memberId,
    done: item.completed,
    overdue: item.delayed,
  }));
  return (
    <Container className="tskr-performance-chart">
      <Header>
        <Title>Produtividade</Title>
      </Header>
      <Content>
        {data.length > 0 ? <Chart data={data}/> : <Text>Sem dados de produtividade no período.</Text>}
      </Content>
    </Container>
  )
}
