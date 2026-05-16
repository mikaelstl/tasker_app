import { Screen } from "../../components/base/Screen";
import { Content, HeaderContainer, StageContainer } from "./style";
import { Logo } from "../../components/images/Logo";
import { useApi } from "../../hooks/useApi";
import type { CreateUserDTO } from "../../service/types/user/create.dto";
import type { ApiError } from "../../service/types/response/error";
import { Toasts } from "../../maps/toasts";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import type { UserDTO } from "../../service/types/user/user.dto";
import { useEffect, useState } from "react";
import { SectionTitle } from "../../components/base/SectionTitle";
import type { CreateAccountDTO } from "../../service/types/account/create.dto";
import type { AccountDTO } from "../../service/types/account/account.dto";
import { CreateAccountStageEnum } from "../../utils/enums/CreateAccountStage";
import { SetEmailStage } from "./stages/SetEmailStage";
import { SetAccountStage } from "./stages/SetAccountStage";
import { CreateOrgStage } from "./stages/CreateOrgStage";
import { UseSystemStage } from "./stages/UseSystemStage";
import validator from 'validator';

export function Register() {
  const api = useApi();

  const navigate = useNavigate();

  const { login } = useAuth();

  const [email, setEmail] = useState<string>('');

  const [username, setUsername] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [user, setUser] = useState<UserDTO | null>(null);
  const [account, setAccount] = useState<AccountDTO | null>(null);

  const [stage, setStage] = useState<CreateAccountStageEnum>(CreateAccountStageEnum.EMAIL);
  const handleStage = (stg: CreateAccountStageEnum) => {
    setStage(stg);
  }

  const createUser = async (data: CreateUserDTO) => {
    try {
      const response = await api.post<CreateUserDTO>({ route: '/users', data: data });

      setUser(response.data as UserDTO);
    } catch (error) {
      const { errors } = error as ApiError;

      errors.forEach(
        err => {
          const notification = Toasts[err.level];

          notification(err.message);
        }
      );
    }
  }

  const createAccount = async (data: CreateAccountDTO) => {
    console.log(data);

    // try {
    //   const response = await api.post<CreateAccountDTO>({ route: '/auth/register', data: data });

    //   const { id } = response.data as AccountDTO;

    //   createUser({
    //     name,
    //     username,
    //     accountkey: id
    //   });

    //   handleStage(CreateAccountStageEnum.USE_SYSTEM);
    // } catch (error) {
    //   const { errors } = error as ApiError;

    //   errors.forEach(
    //     err => {
    //       const notification = Toasts[err.level];

    //       notification(err.message);
    //     }
    //   );

    //   handleStage(CreateAccountStageEnum.EMAIL);
    // }
  }

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
    <Screen>
      <Content>
        <HeaderContainer className="tskr-stage-header-container">
          <Logo width={182} />
          <SectionTitle>CREATE YOUR ACCOUNT</SectionTitle>
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
            createAccount={() => console.log("Create Account")}

            handleStage={handleStage}
          />
        </StageContainer>
      </Content>
    </Screen>
  );
}