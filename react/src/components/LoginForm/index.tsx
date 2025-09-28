import { KeyIcon, UserIcon } from "@heroicons/react/16/solid";
import { Title } from "../base/Title";
import { FormInput } from "./FormInput";
import { Container, Form, LoginButton } from "./style";
import { CreateAccount } from "./CreateAccount";
import { useNavigate } from "react-router-dom";

export function LoginForm() {
  const navigate = useNavigate();

  return (
    <Container className="login-form">
      <Title>LOGIN</Title>
      <Form action=''>
        <div className="inputs">
          <FormInput icon={<UserIcon style={{ width: 24, height: 24 }}/>} placeholder="User"/>
          <FormInput type="password" icon={<KeyIcon style={{ width: 24, height: 24 }}/>} placeholder="Password"/>
        </div>
        <LoginButton onClick={() => navigate("/workspace")}>Login</LoginButton>
      </Form>
      <CreateAccount/>
    </Container>
  )
}