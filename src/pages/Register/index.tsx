import { Screen } from "../../components/base/Screen";
import { Content } from "./style";
import { Logo } from "../../components/images/Logo";
import { CreateAccountForm } from "../../components/CreateAccountForm";
import { Title } from "../../components/base/Title";
import { useApi } from "../../hooks/useApi";
import type { CreateUserDTO } from "../../service/types/user/create.dto";
import type { ApiError } from "../../service/types/response/error";
import { Toasts } from "../../toasts";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import type { UserDTO } from "../../service/types/user/user.dto";
import type { LoginDTO } from "../../service/types/auth/login.dto";

export function Register() {
  const api = useApi();

  const navigate = useNavigate();

  const { login } = useAuth();

  const createAccount = async (data: CreateUserDTO) => {
    try {
      const response = await api.post<CreateUserDTO>({ route: '/auth/register', data: data });

      const { username, password } = response.data as UserDTO;

      const loginData: LoginDTO = {
        username,
        password
      }

      await login(loginData);

      navigate('/home/workspace');
    } catch (error) {
      const { errors } = error as ApiError;      

      errors?.map(
        err => {
          const notification = Toasts[err.level];

          return notification(err.message);
        }
      )
    }
  }

  return (
    <Screen>
      <Content>
        <Logo />
        <Title>CREATE YOUR ACCOUNT</Title>
        <CreateAccountForm createAccount={createAccount}/>
      </Content>
    </Screen>
  )
}