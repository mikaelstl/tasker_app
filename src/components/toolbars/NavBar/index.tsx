import { ArrowLeftStartOnRectangleIcon, ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/16/solid"
import { InboxStackIcon, WindowIcon } from "@heroicons/react/20/solid"
import Palette from "../../../assets/palette"
import { Accordion, Actions, Container, Leading, Nav, NavItem, ProjectNav } from "./style"
import { useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../../../hooks/useAuth"
import { FolderOpenIcon } from "@heroicons/react/20/solid"
import { useEffect, useState } from "react"
import { CalendarIcon, ChartBarIcon, ClipboardIcon, UserIcon } from "@heroicons/react/24/solid"

interface ProjectNavAccordionProps {
  isOpen: boolean
}

const ProjectNavAccordion = ({
  isOpen
}: ProjectNavAccordionProps) => {
  const navigate = useNavigate();

  const location = useLocation();

  const [path, setPath] = useState('');
  const [icon, setIcon] = useState(<ChevronDownIcon width={20} />)

  const [open, setOpen] = useState(isOpen);
  const handleOpen = () => {
    setOpen(!open);
  }

  useEffect(() => {
    if (open) {
      setIcon(<ChevronUpIcon width={20} />)
    } else {
      setIcon(<ChevronDownIcon width={20} />)
    }
  }, [open]);

  useEffect(() => {
    setPath(location.pathname);
  }, [location]);

  return (
    <ProjectNav>
      <Accordion type="button" onClick={handleOpen}>
        <Leading>
          <FolderOpenIcon width={20} />
          Project
        </Leading>
        {icon}
      </Accordion>
      {
        open
          ? <Nav>
            <NavItem 
              className="tskr-nav-item"
              type="button"
              onClick={() => navigate('../overview')}
              activated={ path.includes('project/overview') ? true : false }
            >
              <WindowIcon width="18" />
              Overview
            </NavItem>
            <NavItem 
              className="tskr-nav-item"
              type="button"
              onClick={() => navigate('../tasks')}
              activated={ path.includes('project/tasks') ? true : false }
            >
              <ClipboardIcon width="18" />
              Tasks
            </NavItem>
            <NavItem 
              className="tskr-nav-item"
              type="button"
              onClick={() => navigate('../calendar')}
              activated={ path.includes('project/calendar') ? true : false }
            >
              <CalendarIcon width="18" />
              Calendar
            </NavItem>
            <NavItem 
              className="tskr-nav-item"
              type="button"
              onClick={() => navigate('../members')}
              activated={ path.includes('project/members') ? true : false }
            >
              <UserIcon width="18" />
              Members
            </NavItem>
            <NavItem 
              className="tskr-nav-item"
              type="button"
              onClick={() => navigate('../stats')}
              activated={ path.includes('project/stats') ? true : false }
            >
              <ChartBarIcon width="18" />
              Stats
            </NavItem>
          </Nav>
          : <></>
      }
    </ProjectNav>
  )
}

interface NavBarProps {
  onProject: boolean
}

export function NavBar({
  onProject
}: NavBarProps) {
  const navigate = useNavigate();

  const { logout } = useAuth();

  const onLogout = () => {
    logout();
    navigate('/');
  }

  return (
    <Container className="tskr-nav-bar">
      <Nav>
        <NavItem
          className="tskr-nav-item"
          type="button"
          onClick={() => navigate('workspace')}
          activated={true}
        >
          <WindowIcon width="18" />
          Workspace
        </NavItem>
        <NavItem
          className="tskr-nav-item"
          type="button"
          onClick={() => navigate('projects')}
          activated={true}
        >
          <InboxStackIcon width="18" />
          Projects
        </NavItem>
      </Nav>
      { onProject ? <ProjectNavAccordion isOpen/> : <></> }
      <Actions className="tskr-nav-actions">
        {/* <NavItem className="nav-item">
          <Cog6ToothIcon width="18"/>
          Settings
        </NavItem> */}
        <NavItem className="tskr-nav-item log-out" onClick={onLogout}>
          <ArrowLeftStartOnRectangleIcon width="18" fill={Palette.red} />
          Logout
        </NavItem>
      </Actions>
    </Container >
  )
}