import { useState } from "react";
import Palette from "../../../assets/palette";
import type { MemberPerformance as MemberPerformanceDTO } from "../../../service/types/stats/stats.types";
import { Title } from "../../../components/base/Title";
import { Container, Content, Header } from "../../base/style";
import { LineChart } from "./chart";
import { Option, Select, SelectUser } from "./style";

interface SelectUserInputProps {
  data: any[],
  onChange: (key: string) => void
}

const SelectUserInput = ({
  data,
  onChange
}: SelectUserInputProps) => {
  return (
    <SelectUser className="tskr-select-user-data">
      <Select name="tskr-proj-id" id="tskr-proj-id"
        onChange={(evt) => onChange(evt.target.value)}
      >
        {
          data.map(
            (user) => <Option key={user.id} value={user.id}>{user.id}</Option>
          )
        }
      </Select>
    </SelectUser>
  )
}

export type MemberPerformance = {
  id: string;
  color: string;
  data: any[]
}

export function PerformanceChart({ performance }: { performance: MemberPerformanceDTO[] }) {
  const data: MemberPerformance[] = performance.map((item, index) => ({
    id: item.user.username,
    color: [Palette.green, Palette.yellow, Palette.blue, Palette.red][index % 4],
    data: item.months.map((month) => ({ x: month.month, y: month.averageHours })),
  }));
  const [selectedId, setSelectedId] = useState(data[0]?.id ?? "");
  const user = data.find((item) => item.id === selectedId) ?? data[0];
  const handleSelect = (username: string) => {
    setSelectedId(username);
  }

  if (!user) return null;

  return (
    <Container className="tskr-performance-chart">
      <Header>
        <Title>Desempenho por membro</Title>
        <SelectUserInput data={data} onChange={handleSelect}/>
      </Header>
      <Content>
        <LineChart values={[user]} lineColor={user.color}/>
      </Content>
    </Container>
  )
}
