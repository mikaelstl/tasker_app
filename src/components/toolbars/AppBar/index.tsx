import { LogoIcon } from "../../images/LogoIcon";
import Icon from "../../../assets/icons/favicon.svg";
import { BellIcon } from "@heroicons/react/24/solid";
import { Title } from "../../base/Title";
import { Container, Logo, UserInfos } from "./style";
import { Avatar } from "../../misc/Avatar";
import { useNavigate } from "react-router-dom";

export function AppBar() {
  const navigate = useNavigate();
  
  const goToProfile = () => {
    navigate('/home/profile')
  }

  return (
    <Container className="tskr-app-bar">
      <Logo className="tskr-appbar-logo">
        <LogoIcon source={Icon}/>
        <Title>Tasker</Title>
      </Logo>
      <UserInfos className="tskr-user-infos">
        <BellIcon width={28}/>
        <button type="button" onClick={goToProfile}>
          <Avatar online={false} image="" size="medium"/>
        </button>
      </UserInfos>
    </Container>
  )
}