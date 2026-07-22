import { Title } from "../../../components/base/Title";
import { Container, Content, Header } from "../../base/style";
import { Chart } from "./chart";
import type { MemberProductivity } from "../../../service/types/stats/stats.types";

export type WeekProdutivity = {
  week: string;
  done: number;
  overdue: number;
}

export function ProdutivityChart({ productivity }: { productivity: MemberProductivity[] }) {
  const data: WeekProdutivity[] = productivity.map((item) => ({
    week: item.memberId,
    done: item.completed,
    overdue: item.delayed,
  }));
  return (
    <Container className="tskr-performance-chart">
      <Header>
        <Title>Produtividade</Title>
      </Header>
      <Content>
        <Chart data={data}/>
      </Content>
    </Container>
  )
}
