import type React from "react";
import { Button } from "../Button";

interface CreateButtonProps {
  type: "button" | "submit" | "reset" | undefined;
  children: React.ReactNode | string;
  onClick?: (evt: React.MouseEvent) => void
}

export function CreateButton(props: CreateButtonProps) {
  return (
    <Button type={props.type} className="tskr-create-btn" onClick={props.onClick}>
      {props.children}
    </Button>
  )
}