import Palette from "../../../assets/palette";
import { Text } from "../../base/Text";
import { Button } from "../Button";

interface DeleteButtonProps {
  onClick?: () => void
}

export function DeleteBtn({
  onClick
}: DeleteButtonProps) {
  return (
    <Button onClick={onClick} color={Palette.red}>
      <Text>Delete</Text>
    </Button>
  )
}