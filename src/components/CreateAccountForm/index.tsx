import { TextInput } from "@/components/misc/Form/TextInput";
import { Container, Form, Inputs, SubmitButton } from "@/components/misc/Form/style";
import { useState } from "react";
import { User, Tag, KeyRound, Mail,  } from "@/components/icons";

export type UserData = {
  email: string;
  password: string;
  name: string;
  username: string;
}

interface CreateAccountFormProps {
  createAccount: (
    user: UserData
  ) => Promise<void>
}

export function CreateAccountForm(props: CreateAccountFormProps) {
  const [ username, setUsername ] = useState<string>('');
  const [ password, setPassword ] = useState<string>('');
  const [ name, setName ] = useState<string>('');
  const [ email, setEmail ] = useState<string>('');

  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();

    const data: UserData = {
      email,
      password,
      name,
      username
    }

    props.createAccount(data);
  }

  return (
    <Container className="create-account-form">
      <Form onSubmit={onSubmit}>
        <Inputs className="create-account-inputs">
          <TextInput
            icon={<User />}
            placeholder="Name"
            value={name}
            onChange={(value) => setName(value)}
          />
          <TextInput 
            icon={<Mail />} 
            placeholder="E-mail"
            value={email}
            onChange={(value) => setEmail(value)}
          />
          <TextInput 
            icon={<Tag />} 
            placeholder="Username"
            value={username}
            onChange={(value) => setUsername(value)}
          />
          <TextInput type="password" 
            icon={<KeyRound />} 
            placeholder="Password"
            value={password}
            onChange={(value) => setPassword(value)}
          />
        </Inputs>
        <SubmitButton type="submit">Create Account</SubmitButton>
      </Form>
    </Container>
  )
}