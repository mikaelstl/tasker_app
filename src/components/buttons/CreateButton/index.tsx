import { PlusIcon } from "@heroicons/react/24/solid";
import { Text } from "../../base/Text";
import { Button } from "./style";

interface CreateButtonProps {
  children: string
}

export function CreateButton(props: CreateButtonProps) {
  return (
    <>
      <Button type="button" className="create-project-btn">
        <PlusIcon width="22"/>
        <Text>{props.children}</Text>
      </Button>
    </>
  )
}