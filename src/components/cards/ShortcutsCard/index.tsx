import { ArrowTrendingUpIcon, Cog6ToothIcon, PlusIcon } from "@heroicons/react/16/solid";
import { Title } from "../../base/Title";
import { Action, Actions, Container, Header } from "./style";

export function ShortcutsCard() {
  return (
    <Container className="tskr-shortcuts-card">
      <Header>
        <Title>Shortcuts</Title>
      </Header>
      <Actions>
        <Action>
          <PlusIcon width={20}/>
          <Title>New Project</Title>
        </Action>
        <Action>
          <ArrowTrendingUpIcon width={20} />
          <Title>Generate Report</Title>
        </Action>
        <Action>
          <Cog6ToothIcon width={20} />
          <Title>Org Settings</Title>
        </Action>
      </Actions>

    </Container>
  )
}