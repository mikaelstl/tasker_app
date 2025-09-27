import { Divider } from "../../base/Divider";
import { Text } from "../../base/Text";
import { Container, CreateAccountBtn, Separator } from "./style";

export function CreateAccount() {
  return (
    <Container className="create-account">
      <Separator className="saparator">
        <Divider/>
        <Text>OR</Text>
        <Divider/>
      </Separator>
      <CreateAccountBtn className="create-account-btn">Create account</CreateAccountBtn>
    </Container>
  )
}