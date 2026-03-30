import { useState } from "react";
import Palette from "../../../assets/palette";
import { Title } from "../../../components/base/Title";
import { Container, Content, Header } from "../../base/style";
import { Chart } from "./chart";
import { Option, Select, SelectUser } from "./style";

export type WeekProdutivity = {
  week: string;
  done: number;
  overdue: number;
}

const data: WeekProdutivity[] = [
  { week: 'week 1', done: 50, overdue: 12 },
  { week: 'week 2', done: 100, overdue: 40 },
  { week: 'week 3', done: 14, overdue: 67 },
  { week: 'week 4', done: 84, overdue: 8 },
  { week: 'week 5', done: 23, overdue: 34 },
  { week: 'week 6', done: 78, overdue: 56 }
]

export function ProdutivityChart() {
  return (
    <Container className="tskr-performance-chart">
      <Header>
        <Title>Produtivity</Title>
      </Header>
      <Content>
        <Chart data={data}/>
      </Content>
    </Container>
  )
}