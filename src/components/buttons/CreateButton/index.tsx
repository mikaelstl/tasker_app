import { Text } from "../../base/Text";
import { Button } from "../Button";

interface CreateButtonProps {
  type: "button" | "submit" | "reset" | undefined;
  text: string;
  onClick?: () => void
}

export function CreateButton(props: CreateButtonProps) {
  return (
    <Button type={props.type} className="tskr-create-btn" onClick={props.onClick}>
      <Text>{props.text}</Text>
    </Button>
  )
}