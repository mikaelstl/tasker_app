import { Screen } from "../../components/base/Screen";
import { Actions, BackButton, Content, HeaderContainer, StageButton, StageContainer } from "./style";
import { Logo } from "../../components/images/Logo";
import { useApi } from "../../hooks/useApi";
import type { CreateUserDTO } from "../../service/types/user/create.dto";
import type { ApiError } from "../../service/types/response/error";
import { Toasts } from "../../maps/toasts";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import type { UserDTO } from "../../service/types/user/user.dto";
import type { LoginDTO } from "../../service/types/auth/login.dto";
import { useEffect, useState } from "react";
import { SectionTitle } from "../../components/base/SectionTitle";
import { TextInput } from "../../components/misc/Form/TextInput";
import { ArrowLeftIcon, BuildingOfficeIcon, EnvelopeIcon, IdentificationIcon, KeyIcon, UserIcon } from "@heroicons/react/24/solid";
import { Text } from "../../components/base/Text";
import { Button } from "../../components/buttons/Button";
import Palette from "../../assets/palette";
import { Title } from "../../components/base/Title";
import type { CreateAccountDTO } from "../../service/types/account/create.dto";
import type { AccountDTO } from "../../service/types/account/account.dto";

enum CreateAccountStageEnum {
  EMAIL = "EMAIL",
  SET_ACCOUNT = "SET_ACCOUNT",
  USE_SYSTEM = "USE_SYSTEM",
  CREATE_ORG = "CREATE_ORG",
}

type CreateAccountStage = {
  [K in CreateAccountStageEnum]: React.ReactNode
}

export function Register() {
  const api = useApi();

  const navigate = useNavigate();

  const { login } = useAuth();

  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [user, setUser] = useState<UserDTO | null>(null);

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
    try {
      const response = await api.post<CreateAccountDTO>({ route: '/auth/register', data: data });

      const { id, email } = response.data as AccountDTO;

      /* const loginData: LoginDTO = {
        email,
        password: data.password
      } */

      createUser({
        name,
        username,
        accountkey: id
      });

      // await login(loginData);

      handleStage(CreateAccountStageEnum.USE_SYSTEM);
    } catch (error) {
      const { errors } = error as ApiError;

      errors.forEach(
        err => {
          const notification = Toasts[err.level];

          notification(err.message);
        }
      );

      handleStage(CreateAccountStageEnum.EMAIL);
    }
  }

  const SetEmailStage = () => {
    return (
      <>
        <div className="tskr-stage-input">
          <TextInput
            type="email"
            placeholder="Enter your e-mail"
            value={email}
            icon={<EnvelopeIcon width={24} />}
          />
          <Text>Please enter an e-mail</Text>
        </div>
        <StageButton onClick={() => handleStage(CreateAccountStageEnum.SET_ACCOUNT)}>
          <Text>Advance</Text>
        </StageButton>
      </>
    )
  }

  const SetAccountStage = () => {
    return (
      <>
        <div className="task-stage-inputs">
          <div className="tskr-stage-input">
            <TextInput
              type="text"
              placeholder="Username"
              value={username}
              icon={<UserIcon width={24} />}
            />
            <Text>Please enter an username</Text>
          </div>
          <div className="tskr-stage-input">
            <TextInput
              type="text"
              placeholder="Name"
              value={name}
              icon={<IdentificationIcon width={24} />}
            />
            <Text>Please enter your name</Text>
          </div>
          <div className="tskr-stage-input">
            <TextInput
              type="password"
              placeholder="Password"
              value={password}
              icon={<KeyIcon width={24} />}
            />
            <Text>Please enter a password</Text>
          </div>
        </div>
        <Actions>
          <StageButton onClick={() => createAccount({
            email,
            password
          })}>
            <Text>Finish</Text>
          </StageButton>
          <BackStageBtn stage={CreateAccountStageEnum.EMAIL} />
        </Actions>
      </>
    )
  }

  const UseSystemStage = () => {
    return (
      <>
        <Title>What you want to do now?</Title>
        <Actions>
          <div className="tskr-use-system-stage-btns">
            <Button onClick={() => handleStage(CreateAccountStageEnum.CREATE_ORG)}><Text>Create Organization</Text></Button>
            <Button onClick={() => console.log("DO LOGIN")} color={Palette.details}><Text>Use system</Text></Button>
          </div>
          <BackStageBtn stage={CreateAccountStageEnum.SET_ACCOUNT} />
        </Actions>
      </>
    )
  }

  const CreateOrgStage = (): React.ReactNode => {
    return (
      <>
        <div className="tskr-stage-input">
          <Text>Give a name for your organization</Text>
          <TextInput
            type="text"
            placeholder="Name"
            icon={<BuildingOfficeIcon width={24} />}
          />
        </div>
        <Actions>
          <StageButton onClick={() => console.log("DO LOGIN")}>
            <Text>Create organization</Text>
          </StageButton>
          <BackStageBtn stage={CreateAccountStageEnum.USE_SYSTEM} />
        </Actions>
      </>
    )
  }

  const BackStageBtn = (props: {
    stage: CreateAccountStageEnum
  }): React.ReactNode => {
    return (
      <BackButton onClick={() => handleStage(props.stage)}>
        <ArrowLeftIcon width={20} />
        <Text>Back stage</Text>
      </BackButton>
    )
  }

  const CreateAccountStageMap: CreateAccountStage = {
    "EMAIL": <SetEmailStage />,
    "SET_ACCOUNT": <SetAccountStage />,
    "USE_SYSTEM": <UseSystemStage />,
    "CREATE_ORG": <CreateOrgStage />,
  }

  useEffect(() => {
    return handleStage(CreateAccountStageEnum.EMAIL);
  }, [])

  return (
    <Screen>
      <Content>
        <HeaderContainer className="tskr-stage-header-container">
          <Logo width={182} />
          <SectionTitle>CREATE YOUR ACCOUNT</SectionTitle>
        </HeaderContainer>
        <StageContainer className="tskr-stage-container">
          {CreateAccountStageMap[stage]}
        </StageContainer>
      </Content>
    </Screen>
  )
}