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
import { ToastContainer } from "react-toastify";

export function Register() {
  const api = useApi();

  const navigate = useNavigate();

  const createAccount = async (data: CreateUserDTO) => {
    try {
      await api.post<CreateUserDTO>({ route: '/auth/register', data: data });

      navigate('/');
    } catch (error) {
      const { errors } = error as ApiError;
      console.log(errors);
      

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
      <ToastContainer
        position="bottom-right"
        hideProgressBar={true}
        autoClose={4000}
        closeOnClick
      />
    </Screen>
  )
}