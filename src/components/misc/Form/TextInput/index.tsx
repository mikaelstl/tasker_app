import { Eye, EyeOff } from "@/components/icons";
import { Container, Input, ShowPassword } from "./style";
import { useState } from "react";

type InputType = "text" | "password" | "email";

interface LoginFormProps {
  placeholder: string;
  icon: React.ReactNode;
  type?: InputType;
  value?: string;
  onChange?: (value: string) => void;
}

export function TextInput(props: LoginFormProps) {
  const [ type, setType ] = useState<InputType>(props.type ?? 'text');

  const handleToggle = () => {
    if (type === "password") {
      setType('text')
    } else {
      setType('password')
    }
  }

  return (
    <Container className="form-input">
      {props.icon}
      <Input type={type}
        placeholder={props.placeholder}
        value={props.value}
        onChange={(evt) => props.onChange!(evt.target.value)}
      />
      {
        props.type === 'password'
          ? <ShowPassword type="button" onClick={handleToggle}>
              {type === 'text' ? <Eye/> : <EyeOff size={24}/>}
            </ShowPassword>
          : <></>
      }
    </Container>
  )
}
