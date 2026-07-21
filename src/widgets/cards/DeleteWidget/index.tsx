import { Text } from "../../../components/base/Text";
import { DeleteBtn } from "../../../components/buttons/DeleteBtn";
import { Container, Description } from "./style";

export function DeleteWidget() {
  return (
    <Container className="tskr-delete-widget">
      <Text>Excluir projeto</Text>
      <Description>Após excluir o projeto, não será possível recuperá-lo. Confirme antes de continuar.</Description>
      <DeleteBtn/>
    </Container>
  )
}
