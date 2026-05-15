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

export function LoginForm(props: LoginFormProps) {
  const navigate = useNavigate();
  
  const [ email, setUsername ] = useState<string>('');
  const [ password, setPassword ] = useState<string>('');

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault()

    const data: LoginDTO = {
      email,
      password
    };

    props.login(data).then(
      (_) => navigate('/home/workspace')
    );
  }

  return (
    <Container className="tskr-login-form">
      <SectionTitle>LOGIN</SectionTitle>
      <Form action='' onSubmit={onSubmit}>
        <Inputs className="tskr-form-inputs">
          <TextInput
            icon={<UserIcon width={24}/>}
            placeholder="User"
            value={email}
            onChange={(value) => setUsername(value)}
          />
          <TextInput
            type="password"
            icon={<KeyIcon width={24}/>}
            placeholder="Password"
            value={password}
            onChange={(value) => setPassword(value)}
          />
        </Inputs>
        <SubmitButton type="submit">Login</SubmitButton>
      </Form>
      <CreateAccount/>
    </Container>
  )
}