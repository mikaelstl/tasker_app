import { KeyIcon, TagIcon, UserIcon } from "@heroicons/react/16/solid";
import { FormInput } from "./FormInput";
import { Container, Form, Inputs, LoginButton } from "./style";
import { useNavigate } from "react-router-dom";
import { EnvelopeIcon } from "@heroicons/react/16/solid";

export function CreateAccountForm() {
  const navigate = useNavigate();

  return (
    <Container className="create-account-form">
      <Form action=''>
        <Inputs className="create-account-inputs">
          <FormInput icon={<UserIcon style={{ width: 24, height: 24 }}/>} placeholder="Name"/>
          <FormInput icon={<EnvelopeIcon style={{ width: 24, height: 24 }}/>} placeholder="E-mail"/>
          <FormInput icon={<TagIcon style={{ width: 24, height: 24 }}/>} placeholder="Username"/>
          <FormInput type="password" icon={<KeyIcon style={{ width: 24, height: 24 }}/>} placeholder="Password"/>
        </Inputs>
        <LoginButton onClick={() => navigate("/home")}>Create Account</LoginButton>
      </Form>
    </Container>
  )
}