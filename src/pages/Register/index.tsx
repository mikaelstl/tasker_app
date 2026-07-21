import { Content, HeaderContainer, StageContainer } from "./style";
import { Logo } from "../../components/images/Logo";
import type { CreateUserDTO } from "../../service/types/user/create.dto";
import type { ApiError } from "../../service/types/response/error";
import { Toasts } from "../../maps/toasts";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { SectionTitle } from "../../components/base/SectionTitle";
import type { CreateAccountDTO } from "../../service/types/account/create.dto";
import type { AccountDTO } from "../../service/types/account/account.dto";
import type { UserDTO } from "../../service/types/user/user.dto";
import { CreateAccountStageEnum } from "../../utils/enums/CreateAccountStage";
import { SetEmailStage } from "./stages/SetEmailStage";
import { SetAccountStage } from "./stages/SetAccountStage";
import { CreateOrgStage } from "./stages/CreateOrgStage";
import { UseSystemStage } from "./stages/UseSystemStage";
import validator from "validator";
import { useServices } from "../../hooks/useServices";

export function Register() {
  const { AccountService, UserService } = useServices();

  const navigate = useNavigate();

  const { login } = useAuth();

  const [email, setEmail] = useState<string>("");

  const [username, setUsername] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [user, setUser] = useState<UserDTO | null>(null);
  const [account, setAccount] = useState<AccountDTO | null>(null);

  const [stage, setStage] = useState<CreateAccountStageEnum>(
    CreateAccountStageEnum.EMAIL,
  );
  const handleStage = (stg: CreateAccountStageEnum) => {
    setStage(stg);
  };

  const createUser = async (data: CreateUserDTO) => {
    try {
      const response = await UserService.create(data);

      setUser(response.data);
    } catch (error) {
      const { errors } = error as ApiError;

      errors.forEach((err) => {
        const notification = Toasts[err.level];

        notification(err.message);
      });
    }
  };

  const createAccount = async (data: CreateAccountDTO) => {
    try {
      const response = await AccountService.register(data);
      const { id } = response.data;

      setAccount(response.data);

      createUser({
        name,
        username,
        accountkey: id,
      });

      Toasts["info"](response.message);

      handleStage(CreateAccountStageEnum.USE_SYSTEM);
    } catch (error: any) {
      const { errors } = error as ApiError;

      errors.forEach((err) => {
        const notification = Toasts[err.level];

        notification(err.message);
      });

      handleStage(CreateAccountStageEnum.EMAIL);
    }
  };

  const CreateAccountStageMap = {
    EMAIL: SetEmailStage,
    SET_ACCOUNT: SetAccountStage,
    USE_SYSTEM: UseSystemStage,
    CREATE_ORG: CreateOrgStage,
  };

  const CurrentStage = CreateAccountStageMap[stage];

  useEffect(() => {
    handleStage(CreateAccountStageEnum.EMAIL);
  }, []);

  return (
    <Content>
      <HeaderContainer className="tskr-stage-header-container">
        <Logo width={182} />
        <SectionTitle>CRIE SUA CONTA</SectionTitle>
      </HeaderContainer>

      <StageContainer className="tskr-stage-container">
        <CurrentStage
          email={email}
          setEmail={setEmail}

          name={name}
          setName={setName}

          username={username}
          setUsername={setUsername}

          password={password}
          setPassword={setPassword}

          createOrg={() => console.log("Create Org")}
          createAccount={() => {
            if (
              validator.isEmpty(name) ||
              validator.isEmpty(username) ||
              validator.isEmpty(password)
            ) {
              Toasts["warning"]("Preencha todos os campos.");
              return;
            }

            createAccount({
              email,
              password,
            });
          }}

          login={() => login({ email: account?.email ?? "", password: account?.password ?? "" }).then((_) => navigate('/workspaces'))}

          handleStage={handleStage}
        />
      </StageContainer>
    </Content>
  );
}
