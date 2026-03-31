import { useState } from "react";
import Palette from "../../../assets/palette";
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
            (user) => <Option value={user.id}>{user.id}</Option>
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

const data: MemberPerformance[] = [
  {
    id: 'mikaelstl',
    color: Palette.green,
    data: [
      { x: 'week 0', y: NaN },
      { x: 'week 1', y: 2.5 },
      { x: 'week 2', y: 3 },
      { x: 'week 3', y: 2 },
      { x: 'week 4', y: 3.2 },
      { x: 'week 5', y: 4.5 },
      { x: 'week 6', y: 3.5 },
      { x: 'week 7', y: 4.2 },
      { x: 'week 8', y: NaN },
    ],
  },{
    id: 'siegfried',
    color: Palette.yellow,
    data: [
      { x: "week 0", y: NaN },
      { x: "week 1", y: 2.5 },
      { x: "week 2", y: 1.8 },
      { x: "week 3", y: 2.2 },
      { x: "week 4", y: 3.2 },
      { x: "week 5", y: 3.6 },
      { x: "week 6", y: 2.8 },
      { x: "week 7", y: 1.2 },
      { x: "week 8", y: 2.3 },
    ],
  }
]

export function PerformanceChart() {
  const [ user, setUser ] = useState<any>(data[0]);
  const handleSelect = (username: string) => {
    const selected = data.find((user) => user.id === username);

    setUser(selected);
  }

  return (
    <Container className="tskr-performance-chart">
      <Header>
        <Title>Performance per member</Title>
        <SelectUserInput data={data} onChange={handleSelect}/>
      </Header>
      <Content>
        <LineChart values={[user]} lineColor={user.color}/>
      </Content>
    </Container>
  )
}