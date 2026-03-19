import { Title } from "../../base/Title";
import { Card, Cards, Container, Header, Select, SelectProjId, Option } from "./style";
import Palette from "../../../assets/palette";
import { ClipboardIcon } from "@heroicons/react/16/solid";

const SelectProjIdInput = () => {
  return (
    <SelectProjId>
      <ClipboardIcon width={20}/>
      <Select name="tskr-proj-id" id="tskr-proj-id">
        <Option value='c45d24bf'>c45d24bf</Option>
        <Option value='f6f18c75'>f6f18c75</Option>
        <Option value='3d13b7ae'>3d13b7ae</Option>
        <Option value='38b45656'>38b45656</Option>
      </Select>
    </SelectProjId>
  )
}

export function TasksProgressCard() {
  return (
    <Container className="tskr-active-projects-card">
      <Header>
        <Title>Tasks Progress</Title>
        <SelectProjIdInput/>
      </Header>
      <Cards>
        <Card>
          <Title className="tskr-title">STARTED</Title>
          <Title className="tskr-title">00</Title>
        </Card>
        <Card color={Palette.green_50}>
          <Title className="tskr-title">DONE</Title>
          <Title className="tskr-title">00</Title>
        </Card>
        <Card color={Palette.yellow_50}>
          <Title className="tskr-title">REVIEW</Title>
          <Title className="tskr-title">00</Title>
        </Card>
        <Card color={Palette.red_50}>
          <Title className="tskr-title">OVERDUE</Title>
          <Title className="tskr-title">00</Title>
        </Card>
      </Cards>

    </Container>
  )
}