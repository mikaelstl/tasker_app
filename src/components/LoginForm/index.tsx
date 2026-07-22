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
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault()

    const normalizedEmail = email.trim();

    const data: LoginDTO = { email: normalizedEmail, password };

    try {
      setSubmitting(true);
      await login(data);

      navigate("/workspaces");
    } catch {
      // O erro da requisição já é apresentado pelo interceptor da API.
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Container className="tskr-login-form">
      <SectionTitle>ENTRAR</SectionTitle>
      <Form as="form" onSubmit={onSubmit}>
        <Inputs className="tskr-form-inputs">
          <TextInput
            icon={<UserIcon width={24} />}
            placeholder="E-mail"
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
        <SubmitButton type="submit" disabled={submitting}>
          {submitting ? "Entrando..." : "Entrar"}
        </SubmitButton>
      </Form>
      <CreateAccount />
    </Container>
  )
}
