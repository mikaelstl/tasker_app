import { Logo } from "../../components/images/Logo";
import { LoginForm } from "../../components/LoginForm";
import { Container, Content, Label } from "./style";
import { useAuth } from "../../hooks/useAuth";

export function Login() {
  const { login } = useAuth();

  return (
    <Content>
      <Container>
        <Logo width={182} />
        <Label>GERENCIADOR DE PROJETOS</Label>
      </Container>
      <LoginForm login={login} />
    </Content>
  )
}
