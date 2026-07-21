import { useNavigate } from "react-router-dom";
import { Divider } from "../../base/Divider";
import { Text } from "../../base/Text";
import { Container, CreateAccountBtn, Separator } from "./style";

export function CreateAccount() {
  const navigate = useNavigate();
  
  return (
    <Container className="tskr-create-account">
      <Separator className="tskr-saparator">
        <Divider/>
        <Text>OU</Text>
        <Divider/>
      </Separator>
      <CreateAccountBtn className="tskr-create-account-btn"
        onClick={() => navigate("/register")}
      >Criar conta</CreateAccountBtn>
    </Container>
  )
}
