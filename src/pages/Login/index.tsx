import { Screen } from "../../components/base/Screen";
import { Logo } from "../../components/images/Logo";
import { LoginForm } from "../../components/LoginForm";
import { Container, Content, Label } from "./style";
import { ToastContainer } from "react-toastify";
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
      <ToastContainer
        position="bottom-right"
        hideProgressBar={true}
        autoClose={4000}
        closeOnClick
      />
    </Screen>
  )
}