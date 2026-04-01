import { Text } from "../../../components/base/Text";
import { DeleteBtn } from "../../../components/buttons/DeleteBtn";
import { Container, Description } from "./style";

export function DeleteWidget() {
  return (
    <Container className="tskr-delete-widget">
      <Text>Delete Project</Text>
      <Description>Once you delete the project there is no going back. Please be certain.</Description>
      <DeleteBtn/>
    </Container>
  )
}