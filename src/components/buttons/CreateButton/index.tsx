import { PlusIcon } from "@heroicons/react/24/solid";
import { Text } from "../../base/Text";
import { Button } from "./style";

interface CreateButtonProps {
  type: "button" | "submit" | "reset" | undefined;
  children: string;
  onClick?: () => void
}

export function CreateButton(props: CreateButtonProps) {
  return (
    <Button type={props.type} className="create-project-btn" onClick={props.onClick}>
      {/* <PlusIcon width="22"/> */}
      <Text>{props.children}</Text>
    </Button>
  )
}