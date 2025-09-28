import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/16/solid"
import { ChatBubbleOvalLeftIcon, Cog6ToothIcon, InboxStackIcon, UsersIcon, WindowIcon } from "@heroicons/react/24/solid"
import Palette from "../../../assets/palette"
import { Actions, Container, Nav, NavItem } from "./style"

export function NavBar() {
  return (
    <Container className="nav-bar">
      <Nav>
        <NavItem className="nav-item" type="button">
          <WindowIcon width="18" />
          Workspace
        </NavItem>
        <NavItem className="nav-item" type="button">
          <InboxStackIcon width="18"/>
          Projects
        </NavItem>
        <NavItem className="nav-item" type="button">
          <ChatBubbleOvalLeftIcon width="18"/>
          Inbox
        </NavItem >
        <NavItem className="nav-item" type="button" >
          <UsersIcon width="18"/>
          Affiliations
        </NavItem >
      </Nav>
        <Actions className="actions">
          <NavItem className="nav-item">
            <Cog6ToothIcon width="18"/>
            Settings
          </NavItem>
          <NavItem className="nav-item log-out">
            <ArrowLeftStartOnRectangleIcon width="18" color={Palette.red}/>
            Logout
          </NavItem>
        </Actions>
    </Container>
  )
}