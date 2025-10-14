import { Screen } from "../../components/base/Screen";
import { Logo } from "../../components/images/Logo";
import { LoginForm } from "../../components/LoginForm";
import { Container, Content, Label } from "./style";
import { useApi } from "../../hooks/useApi";
import type { LoginDTO } from "../../service/types/auth/login.dto";
import { useNavigate } from "react-router-dom";
import type { ApiError } from "../../service/types/response/error";
import { ToastContainer } from "react-toastify";
import { Toasts } from "../../toasts";

export function Login() {
  const navigate = useNavigate();

  const api = useApi();
  
  const login = async (data: LoginDTO) => {
    try {
      await api.post<LoginDTO>({route: '/auth/login', data: data});

      navigate('/home/workspace')
    } catch (error: any) {
      const { errors } = error as ApiError;
      
      errors?.map(
        err => {
          const notification = Toasts[err.level];

          return notification(err.message)
        }
      );
    }
  }

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