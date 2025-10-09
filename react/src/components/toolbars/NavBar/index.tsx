import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/16/solid"
import { ChatBubbleOvalLeftIcon, Cog6ToothIcon, InboxStackIcon, UsersIcon, WindowIcon } from "@heroicons/react/24/solid"
import Palette from "../../../assets/palette"
import { Actions, Container, Nav, NavItem } from "./style"
import { useNavigate } from "react-router-dom"

export function NavBar() {
  const navigate = useNavigate();

  return (
    <Container className="nav-bar">
      <Nav>
        <NavItem className="nav-item" type="button" onClick={() => navigate('workspace')}>
          <WindowIcon width="18" />
          Workspace
        </NavItem>
        <NavItem className="nav-item" type="button" onClick={() => navigate('projects')}>
          <InboxStackIcon width="18"/>
          Projects
        </NavItem>
        {// ADICIONAR DEPOIS
        /* <NavItem className="nav-item" type="button" onClick={() => navigate('inbox')}>
          <ChatBubbleOvalLeftIcon width="18"/>
          Inbox
        </NavItem >
        <NavItem className="nav-item" type="button" onClick={() => navigate('social')}>
          <UsersIcon width="18"/>
          Social
        </NavItem > */}
      </Nav>
        <Actions className="actions">
          {/* <NavItem className="nav-item">
            <Cog6ToothIcon width="18"/>
            Settings
          </NavItem> */}
          <NavItem className="nav-item log-out" onClick={() => navigate('/login')}>
            <ArrowLeftStartOnRectangleIcon width="18" fill={Palette.red}/>
            Logout
          </NavItem>
        </Actions>
    </Container>
  )
}