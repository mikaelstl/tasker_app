import { Page } from "../../components/base/Page";
import { Logo } from "../../components/images/Logo";
import LogoImage from "../../assets/images/logo.svg";
import { LoginForm } from "../../components/LoginForm";
import { Content } from "./style";

export function LoginPage() {
  return (
    <Page>
      <Content>
        <Logo source={LogoImage}/>
        <LoginForm/>
      </Content>
    </Page>
  )
}