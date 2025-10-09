import { Container, Input } from "./style";

interface LoginFormProps {
  placeholder: string;
  icon: React.ReactNode;
  type?: "text" | "password";
}

export function FormInput(props: LoginFormProps) {
  return (
    <Container className="form-input">
      {props.icon}
      <Input type={props.type ?? "text"} placeholder={props.placeholder}/>
    </Container>
  )
}