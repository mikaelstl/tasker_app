import { Accordion, Actions, Container, Leading, Nav, NavItem, ProjectNav } from "./style"
import { useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../../../hooks/useAuth"
import { useEffect, useState } from "react"
import {
  AppWindow,
  Calendar,
  ChartBar,
  ChevronDown,
  ChevronUp,
  Clipboard,
  FolderOpen,
  Inbox,
  LogOut,
  User,
} from "@/components/icons"

interface ProjectNavAccordionProps {
  isOpen: boolean
}

const ProjectNavAccordion = ({
  isOpen
}: ProjectNavAccordionProps) => {
  const navigate = useNavigate();

  const location = useLocation();

  const [path, setPath] = useState('');
  const [icon, setIcon] = useState(<ChevronDown size={20} />)

  const [open, setOpen] = useState(isOpen);
  const handleOpen = () => {
    setOpen(!open);
  }

  useEffect(() => {
    if (open) {
      setIcon(<ChevronUp size={20} />)
    } else {
      setIcon(<ChevronDown size={20} />)
    }
  }, [open]);

  useEffect(() => {
    setPath(location.pathname);
  }, [location]);

  return (
    <ProjectNav>
      <Accordion type="button" onClick={handleOpen}>
        <Leading>
          <FolderOpen size={20} />
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
              onClick={() => navigate('./project/overview')}
              activated={ path.includes('project/overview') ? true : false }
            >
              <AppWindow size={18} />
              Overview
            </NavItem>
            <NavItem 
              className="tskr-nav-item"
              type="button"
              onClick={() => navigate('./project/tasks')}
              activated={ path.includes('project/tasks') ? true : false }
            >
              <Clipboard size={18} />
              Tasks
            </NavItem>
            <NavItem 
              className="tskr-nav-item"
              type="button"
              onClick={() => navigate('./project/calendar')}
              activated={ path.includes('project/calendar') ? true : false }
            >
              <Calendar size={18} />
              Calendar
            </NavItem>
            <NavItem 
              className="tskr-nav-item"
              type="button"
              onClick={() => navigate('./project/members')}
              activated={ path.includes('project/members') ? true : false }
            >
              <User size={18} />
              Members
            </NavItem>
            <NavItem 
              className="tskr-nav-item"
              type="button"
              onClick={() => navigate('./project/stats')}
              activated={ path.includes('project/stats') ? true : false }
            >
              <ChartBar size={18} />
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
    navigate('/login');
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
          <AppWindow size={18} />
          Workspace
        </NavItem>
        <NavItem
          className="tskr-nav-item"
          type="button"
          onClick={() => navigate('projects')}
          activated={true}
        >
          <Inbox size={18} />
          Projects
        </NavItem>
      </Nav>
      { onProject ? <ProjectNavAccordion isOpen/> : <></> }
      <Actions className="tskr-nav-actions">
        {/* <NavItem className="tskr-nav-item" activated>
          <Settings2 size={18}/>
          Settings
        </NavItem> */}
        <NavItem className="tskr-nav-item log-out" onClick={onLogout}>
          <LogOut size={18} />
          Logout
        </NavItem>
      </Actions>
    </Container >
  )
}
