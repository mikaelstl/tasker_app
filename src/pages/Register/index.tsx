import { Content } from "./style";
import { Logo } from "../../components/images/Logo";
import { useApi } from "../../hooks/useApi";
import type { CreateUserDTO } from "../../service/types/user/create.dto";
import type { ApiError } from "../../service/types/response/error";
import { Toasts } from "../../maps/toasts";
import { useAuth } from "../../hooks/useAuth";
import type { UserDTO } from "../../service/types/user/user.dto";
import { useState } from "react";
import type { CreateAccountDTO } from "../../service/types/account/create.dto";
import type { AccountDTO } from "../../service/types/account/account.dto";
import { Title } from "../../components/base/Title";
import { CreateAccountForm, type UserData } from "../../components/CreateAccountForm";

export function Register() {
  const api = useApi();

  const { login } = useAuth();

  const [user, setUser] = useState<UserDTO | null>(null);
  const [account, setAccount] = useState<AccountDTO | null>(null);

  const createUser = async (data: CreateUserDTO) => {
    try {
      const response = await api.post<CreateUserDTO>({
        route: "/users",
        data: data,
      });

      setUser(response.data as UserDTO);
    } catch (error) {
      const { errors } = error as ApiError;

      errors.forEach((err) => {
        const notification = Toasts[err.level];

        notification(err.message);
      });
    }
  };

  const createAccount = async (data: UserData) => {
    try {
      const response = await api.post<CreateAccountDTO>({
        route: "/accounts/register",
        data: {
          email: data.email,
          password: data.password
        },
      });

      const { id } = response.data as AccountDTO;

      setAccount(response.data);

      createUser({
        name: data.name,
        username: data.username,
        accountkey: id,
      });

      Toasts["info"](response.message);

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
