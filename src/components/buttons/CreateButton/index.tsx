import type React from "react";
import { Button } from "../Button";

interface CreateButtonProps {
  type: "button" | "submit" | "reset" | undefined;
  children: React.ReactNode | string;
  onClick?: (evt: React.MouseEvent) => void;
  disabled?: boolean;
  form?: string;
}

export function CreateButton(props: CreateButtonProps) {
  return (
    <Button
      type={props.type}
      className="tskr-create-btn"
      onClick={props.onClick}
      disabled={props.disabled}
      form={props.form}
    >
      {props.children}
    </Button>
  )
}
