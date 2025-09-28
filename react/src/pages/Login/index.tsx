import { Screen } from "../../components/base/Screen";
import { Logo } from "../../components/images/Logo";
import LogoImage from "../../assets/images/logo.svg";
import { LoginForm } from "../../components/LoginForm";
import { Content } from "./style";

export function Login() {
  return (
    <Screen>
      <Content>
        <Logo source={LogoImage}/>
        <LoginForm/>
      </Content>
    </Screen>
  )
}