import Palette from "../../../assets/palette";
import { Text } from "../../base/Text";
import { Button } from "../Button";

interface EditButtonProps {
  type: "button" | "submit" | "reset" | undefined;
  onClick?: () => void
}

export function EditButton(props: EditButtonProps) {
  return (
    <Button
      className="tskr-edit-btn"
      type={props.type}
      color={Palette.items}
      onClick={props.onClick}>
      <Text>Edit</Text>
    </Button>
  )
}