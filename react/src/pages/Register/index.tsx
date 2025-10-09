import { Screen } from "../../components/base/Screen";
import { Logo } from "../../components/images/Logo";
import LogoImage from "../../assets/images/logo.svg";
import { LoginForm } from "../../components/LoginForm";
import { Content } from "./style";
import { Image } from "../../components/images/Logo/style";
import { CreateAccountForm } from "../../components/CreateAccountForm";
import { Title } from "../../components/base/Title";

export function Register() {
  return (
    <Screen>
      <Content>
        <Image src={LogoImage}/>
        <Title>CREATE YOUR ACCOUNT</Title>
        <CreateAccountForm/>
      </Content>
    </Screen>
  )
}