import { useNavigate } from "react-router-dom";
import { Divider } from "../../base/Divider";
import { Text } from "../../base/Text";
import { Container, CreateAccountBtn, Separator } from "./style";

export function CreateAccount() {
  const navigate = useNavigate();
  
  return (
    <Container className="create-account">
      <Separator className="saparator">
        <Divider/>
        <Text>OR</Text>
        <Divider/>
      </Separator>
      <CreateAccountBtn className="create-account-btn"
        onClick={() => navigate("/register")}
      >Create account</CreateAccountBtn>
    </Container>
  )
}