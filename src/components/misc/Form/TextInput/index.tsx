import { EyeIcon, EyeSlashIcon } from "@/components/icons/heroicons";
import { Container, Field, Input, Label, ShowPassword } from "./style";
import { useId, useState } from "react";

type InputType = "text" | "password" | "email";

interface TextInputProps {
  placeholder: string;
  icon: React.ReactNode;
  label?: string;
  name?: string;
  type?: InputType;
  value?: string;
  onChange?: (value: string) => void;
}

export function TextInput(props: TextInputProps) {
  const id = useId();
  const [ type, setType ] = useState<InputType>(props.type ?? 'text');

  const handleToggle = () => {
    if (type === "password") {
      setType('text')
    } else {
      setType('password')
    }
  }

  return (
    <Field>
      {props.label && <Label htmlFor={id}>{props.label}</Label>}
      <Container className="form-input">
        {props.icon}
        <Input
          id={id}
          name={props.name}
          type={type}
          placeholder={props.placeholder}
          value={props.value}
          onChange={(evt) => props.onChange?.(evt.target.value)}
        />
        {
          props.type === 'password'
            ? <ShowPassword type="button" onClick={handleToggle}>
                {type === 'text' ? <EyeIcon width={24}/> : <EyeSlashIcon width={24}/>}
              </ShowPassword>
            : <></>
        }
      </Container>
    </Field>
  )
}
