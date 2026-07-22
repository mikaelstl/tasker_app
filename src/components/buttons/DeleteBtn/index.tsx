import Palette from "../../../assets/palette";
import { Text } from "../../base/Text";
import { Button } from "../Button";

interface DeleteButtonProps {
  onClick?: () => void;
  label?: string;
  type?: "button" | "submit" | "reset";
}

export function DeleteBtn({
  onClick,
  label = "Cancelar",
  type = "button",
}: DeleteButtonProps) {
  return (
    <Button type={type} onClick={onClick} color={Palette.red}>
      <Text>{label}</Text>
    </Button>
  )
}
