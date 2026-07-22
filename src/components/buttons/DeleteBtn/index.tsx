import Palette from "../../../assets/palette";
import { Text } from "../../base/Text";
import { Button } from "../Button";

interface DeleteButtonProps {
  onClick?: () => void;
  label?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export function DeleteBtn({
  onClick,
  label = "Cancelar",
  type = "button",
  disabled = false,
}: DeleteButtonProps) {
  return (
    <Button type={type} onClick={onClick} color={Palette.red} disabled={disabled}>
      <Text>{label}</Text>
    </Button>
  )
}
