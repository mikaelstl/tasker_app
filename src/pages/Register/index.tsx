import { Screen } from "../../components/base/Screen";
import LogoImage from "../../assets/images/logo.svg";
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