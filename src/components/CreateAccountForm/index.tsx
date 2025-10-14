import { KeyIcon, TagIcon, UserIcon } from "@heroicons/react/16/solid";
import { FormInput } from "../misc/Form/FormInput";
import { Container, Form, Inputs, SubmitButton } from "../misc/Form/style";
import { EnvelopeIcon } from "@heroicons/react/16/solid";
import type { CreateUserDTO } from "../../service/types/user/create.dto";
import { useState } from "react";

interface CreateAccountFormProps {
  createAccount: (data: CreateUserDTO) => Promise<void>
}

export function CreateAccountForm(props: CreateAccountFormProps) {
  const [ username, setUsername ] = useState<string>('');
  const [ password, setPassword ] = useState<string>('');
  const [ name, setName ] = useState<string>('');
  const [ email, setEmail ] = useState<string>('');

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();

    const data: CreateUserDTO = {
      name,
      username,
      email,
      password
    }

    await props.createAccount(data);
  }

  return (
    <Container className="create-account-form">
      <Form action='' onSubmit={onSubmit}>
        <Inputs className="create-account-inputs">
          <FormInput
            icon={<UserIcon style={{ width: 24, height: 24 }}/>}
            placeholder="Name"
            value={name}
            onChange={(value) => setName(value)}
          />
          <FormInput 
            icon={<EnvelopeIcon style={{ width: 24, height: 24 }}/>} 
            placeholder="E-mail"
            value={email}
            onChange={(value) => setEmail(value)}
          />
          <FormInput 
            icon={<TagIcon style={{ width: 24, height: 24 }}/>} 
            placeholder="Username"
            value={username}
            onChange={(value) => setUsername(value)}
          />
          <FormInput type="password" 
            icon={<KeyIcon style={{ width: 24, height: 24 }}/>} 
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