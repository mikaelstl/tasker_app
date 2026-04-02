import { KeyIcon, UserIcon } from "@heroicons/react/16/solid";
import { FormInput } from "../misc/Form/FormInput";
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
  
  const [ username, setUsername ] = useState<string>('');
  const [ password, setPassword ] = useState<string>('');

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault()

    const data: LoginDTO = {
      username,
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
          <FormInput
            icon={<UserIcon width={24}/>}
            placeholder="User"
            value={username}
            onChange={(value) => setUsername(value)}
          />
          <FormInput
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