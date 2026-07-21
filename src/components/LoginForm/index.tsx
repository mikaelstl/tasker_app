import { KeyIcon, UserIcon } from "@heroicons/react/16/solid";
import { TextInput } from "../misc/Form/TextInput";
import { Container, Form, SubmitButton, Inputs } from "../misc/Form/style";
import { CreateAccount } from "./CreateAccount";
import type { LoginDTO } from "../../service/types/auth/login.dto";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SectionTitle } from "../base/SectionTitle";

interface LoginFormProps {
  login: (data: LoginDTO) => Promise<void>
}

export function LoginForm({ login }: LoginFormProps) {
  const navigate = useNavigate();

  const [email, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const onSubmit = async (ev: React.MouseEvent) => {
    ev.preventDefault()

    const data: LoginDTO = {
      email,
      password
    };

    console.log("submit");

    try {
      await login(data);

      console.log("login success");

      navigate('/workspaces');
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Container className="tskr-login-form">
      <SectionTitle>ENTRAR</SectionTitle>
      <Form>
        <Inputs className="tskr-form-inputs">
          <TextInput
            icon={<UserIcon width={24} />}
            placeholder="Usuário"
            value={email}
            onChange={(value) => setUsername(value)}
          />
          <TextInput
            type="password"
            icon={<KeyIcon width={24} />}
            placeholder="Senha"
            value={password}
            onChange={(value) => setPassword(value)}
          />
        </Inputs>
        <SubmitButton onClick={onSubmit}>Entrar</SubmitButton>
      </Form>
      <CreateAccount />
    </Container>
  )
}
