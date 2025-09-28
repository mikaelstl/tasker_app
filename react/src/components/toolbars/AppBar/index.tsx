import { LogoIcon } from "../../images/LogoIcon";
import Icon from "../../../assets/icons/favicon.svg";
import { BellIcon } from "@heroicons/react/24/solid";
import { Title } from "../../base/Title";
import { Container, Logo, UserInfos } from "./style";
import { Avatar } from "../../misc/Avatar";

export function AppBar() {
  return (
    <Container className="app-bar">
      <Logo className="appbar-logo">
        <LogoIcon source={Icon}/>
        <Title>Tasker</Title>
      </Logo>
      <UserInfos className="user-infos">
        <BellIcon width={28}/>
        <Avatar online={false} image="" size="medium"/>
      </UserInfos>
    </Container>
  )
}