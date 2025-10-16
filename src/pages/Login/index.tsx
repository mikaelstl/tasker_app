import { Screen } from "../../components/base/Screen";
import { Logo } from "../../components/images/Logo";
import { LoginForm } from "../../components/LoginForm";
import { Container, Content, Label } from "./style";
import { useAuth } from "../../hooks/useAuth";

export function Login() {
  const { login } = useAuth();

  return (
    <Screen>
      <Content>
        <Container>
          <Logo />
          <Label>PROJECT MANAGER</Label>
        </Container>
        <LoginForm login={login}/>
      </Content>
    </Screen>
  )
}