import { Content } from "./style";
import { Logo } from "../../components/images/Logo";
import type { ApiError } from "../../service/types/response/error";
import { Toasts } from "../../maps/toasts";
import { useAuth } from "../../hooks/useAuth";
import { Title } from "../../components/base/Title";
import { CreateAccountForm, type UserData } from "../../components/CreateAccountForm";
import { useServices } from "@/hooks/useServices";

export function Register() {
  const { login } = useAuth();
  const { AccountService, UserService } = useServices();

  const createAccount = async (data: UserData) => {
    try {
      const response = await AccountService.register({
        email: data.email,
        password: data.password
      });

      const account = response.data;

      await UserService.create({
        name: data.name,
        username: data.username,
        accountkey: account.id,
      });

      Toasts["info"]("Account created successfully");

      login({
        email: data.email, password: data.password
      });
    } catch (error: any) {
      const { errors } = error as ApiError;

      errors.forEach((err) => {
        const notification = Toasts[err.level];

        notification(err.message);
      });
    }
  };

  return (
    <Content>
      <Logo width={182}/>
      <Title>CREATE YOUR ACCOUNT</Title>
      <CreateAccountForm
        createAccount={createAccount}/>
    </Content>
  );
}
