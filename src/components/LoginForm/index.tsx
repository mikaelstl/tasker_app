import { KeyIcon, UserIcon } from "@heroicons/react/16/solid";
import { Title } from "../base/Title";
import { FormInput } from "./FormInput";
import { Container, Form, LoginButton } from "./style";
import { CreateAccount } from "./CreateAccount";
import type { LoginDTO } from "../../service/types/auth/login.dto";
import { useState } from "react";

interface LoginFormProps {
  login: (data: LoginDTO) => Promise<void>
}

export function LoginForm(props: LoginFormProps) {
  const [ username, setUsername ] = useState<string>('');
  const [ password, setPassword ] = useState<string>('');

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault()

    const data: LoginDTO = {
      username,
      password
    };

    await props.login(data);
  }

  return (
    <Container className="login-form">
      <Title>LOGIN</Title>
      <Form action='' onSubmit={onSubmit}>
        <div className="inputs">
          <FormInput
            icon={<UserIcon style={{ width: 24, height: 24 }}/>}
            placeholder="User"
            value={username}
            onChange={(value) => setUsername(value)}
          />
          <FormInput
            type="password"
            icon={<KeyIcon style={{ width: 24, height: 24 }}/>}
            placeholder="Password"
            value={password}
            onChange={(value) => setPassword(value)}
          />
        </div>
        <LoginButton type="submit">Login</LoginButton>
      </Form>
      <CreateAccount/>
    </Container>
  )
}