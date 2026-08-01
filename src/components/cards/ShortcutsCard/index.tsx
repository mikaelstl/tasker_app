import { ArrowTrendingUpIcon, Cog6ToothIcon, PlusIcon } from "@/components/icons/heroicons";
import { Title } from "../../base/Title";
import { Action, Actions, Container, Header } from "./style";

export function ShortcutsCard() {
  return (
    <Container className="tskr-shortcuts-card">
      <Header>
        <Title>Atalhos</Title>
      </Header>
      <Actions>
        <Action>
          <PlusIcon width={20}/>
          <Title>Novo projeto</Title>
        </Action>
        <Action>
          <ArrowTrendingUpIcon width={20} />
          <Title>Gerar relatório</Title>
        </Action>
        <Action>
          <Cog6ToothIcon width={20} />
          <Title>Configurações da organização</Title>
        </Action>
      </Actions>

    </Container>
  )
}
