import { Content, HeaderContainer } from "./style";
import { Logo } from "../../components/images/Logo";
import type { ApiError } from "../../service/types/response/error";
import { useAuth } from "../../hooks/useAuth";
import { SectionTitle } from "../../components/base/SectionTitle";
import { useServices } from "../../hooks/useServices";
import {
  CreateAccountForm,
  type CreateAccountFormData,
} from "@/components/CreateAccountForm";
import { useToast } from "@/hooks/useToast";

export function Register() {
  const { AccountService, UserService } = useServices();
  const { login } = useAuth();
  const { info, warning, error, critical, validation } = useToast();
  const notifications = { info, warning, error, critical, validation };

  const handleRegister = async (data: CreateAccountFormData) => {
    if (Object.values(data).some((value) => !value.trim())) {
      validation("Preencha todos os campos.");
      return;
    }

    try {
      const response = await AccountService.register({
        email: data.email,
        password: data.password,
      });

      const account = response.data;

      await UserService.create({
        name: data.name,
        username: data.username,
        accountkey: account.id,
      });

      await login({
        email: data.email,
        password: data.password,
      });

      info("Conta criada com sucesso.");
    } catch (caughtError: unknown) {
      const errors = (caughtError as Partial<ApiError>).errors;

      if (!errors?.length) {
        error("Não foi possível criar a conta.");
        return;
      }

      errors.forEach((item) => {
        notifications[item.level](item.message);
      });
    }
  };

  return (
    <Content>
      <HeaderContainer className="tskr-register-header-container">
        <Logo width={182} />
        <SectionTitle>CRIE SUA CONTA</SectionTitle>
      </HeaderContainer>

      <CreateAccountForm createAccount={handleRegister} />
    </Content>
  );
}
