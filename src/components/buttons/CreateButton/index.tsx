import { PlusIcon } from "@heroicons/react/24/solid";
import { Text } from "../../base/Text";
import { Button } from "./style";

interface CreateButtonProps {
  children: string;
  onClick?: () => void
}

export function CreateButton(props: CreateButtonProps) {
  return (
    <Button className="create-project-btn" onClick={props.onClick}>
      {/* <PlusIcon width="22"/> */}
      <Text>{props.children}</Text>
    </Button>
  )
}