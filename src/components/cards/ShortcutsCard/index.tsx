import { Plus, Settings, TrendingUp } from "@/components/icons";
import { Title } from "@/components/base/Title";
import { Action, Actions, Container, Header } from "./style";

export function ShortcutsCard() {
  return (
    <Container className="tskr-shortcuts-card">
      <Header>
        <Title>Shortcuts</Title>
      </Header>
      <Actions>
        <Action>
          <Plus/>
          <Title>New Project</Title>
        </Action>
        <Action>
          <TrendingUp />
          <Title>Generate Report</Title>
        </Action>
        <Action>
          <Settings />
          <Title>Org Settings</Title>
        </Action>
      </Actions>

    </Container>
  )
}