import { Button } from "../../components/buttons/Button";
import { Content, HeaderContainer } from "./style";
import { Logo } from "../../components/images/Logo";
import { SectionTitle } from "../../components/base/SectionTitle";

// VIRAR TELA PROPRIA

export function ChoseWorkspace() {
  return (
    <Content>
      <HeaderContainer className="tskr-stage-header-container">
        <Logo width={182} />
        <SectionTitle>CREATE YOUR ACCOUNT</SectionTitle>
      </HeaderContainer>
      <Button onClick={() => console.log("Chosed")}>Chose</Button>
    </Content>
  )
}