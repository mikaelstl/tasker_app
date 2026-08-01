import {
  Key,
  Letter,
  Tag,
  User,
} from "@/components/icons/solar-icons";
import { TextInput } from "../misc/Form/TextInput";
import { Container, Form, Inputs, SubmitButton } from "../misc/Form/style";
import { useState } from "react";

export interface CreateAccountFormData {
  name: string;
  username: string;
  email: string;
  password: string;
}

interface CreateAccountFormProps {
  createAccount: (data: CreateAccountFormData) => Promise<void>;
}

export function CreateAccountForm({
  createAccount
}: CreateAccountFormProps) {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const onSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    const data: CreateAccountFormData = {
      name,
      username,
      email,
      password,
    };

    await createAccount(data);
  };

  return (
    <Container className="tskr-create-account-form">
      <Form as="form" onSubmit={onSubmit}>
        <Inputs className="tskr-create-account-inputs">
          <TextInput
            label="Nome"
            name="name"
            icon={<User style={{ width: 24, height: 24 }} />}
            placeholder="Nome"
            value={name}
            onChange={(value) => setName(value)}
          />
          <TextInput
            label="E-mail"
            name="email"
            type="email"
            icon={<Letter style={{ width: 24, height: 24 }} />}
            placeholder="E-mail"
            value={email}
            onChange={(value) => setEmail(value)}
          />
          <TextInput
            label="Nome de usuário"
            name="username"
            icon={<Tag style={{ width: 24, height: 24 }} />}
            placeholder="Nome de usuário"
            value={username}
            onChange={(value) => setUsername(value)}
          />
          <TextInput
            label="Senha"
            name="password"
            type="password"
            icon={<Key style={{ width: 24, height: 24 }} />}
            placeholder="Senha"
            value={password}
            onChange={(value) => setPassword(value)}
          />
        </Inputs>
        <SubmitButton type="submit">Criar conta</SubmitButton>
      </Form>
    </Container>
  );
}
