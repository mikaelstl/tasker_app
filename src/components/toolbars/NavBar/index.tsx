import { ArrowLeftStartOnRectangleIcon, ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/16/solid"
import { BuildingOffice2Icon, InboxStackIcon, WindowIcon } from "@heroicons/react/20/solid"
import Palette from "../../../assets/palette"
import { Accordion, Actions, Container, Leading, Nav, NavItem, ProjectNav } from "./style"
import { useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../../../hooks/useAuth"
import { FolderOpenIcon } from "@heroicons/react/20/solid"
import { useEffect, useState } from "react"
import { CalendarIcon, ChartBarIcon, ClipboardIcon, UserIcon } from "@heroicons/react/24/solid"
import { useOrganization } from "../../../hooks/useOrganization"

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
          Projeto
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
              $activated={path.includes('project/overview')}
            >
              <WindowIcon width="18" />
              Visão geral
            </NavItem>
            <NavItem 
              className="tskr-nav-item"
              type="button"
              onClick={() => navigate('./project/tasks')}
              $activated={path.includes('project/tasks')}
            >
              <ClipboardIcon width="18" />
              Tarefas
            </NavItem>
            <NavItem 
              className="tskr-nav-item"
              type="button"
              onClick={() => navigate('./project/calendar')}
              $activated={path.includes('project/calendar')}
            >
              <CalendarIcon width="18" />
              Calendário
            </NavItem>
            <NavItem 
              className="tskr-nav-item"
              type="button"
              onClick={() => navigate('./project/members')}
              $activated={path.includes('project/members')}
            >
              <UserIcon width="18" />
              Membros
            </NavItem>
            <NavItem 
              className="tskr-nav-item"
              type="button"
              onClick={() => navigate('./project/stats')}
              $activated={path.includes('project/stats')}
            >
              <ChartBarIcon width="18" />
              Estatísticas
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
  const location = useLocation();
  const isActive = (route: string) => {
    const routePath = `/home/${route}`;

    return location.pathname === routePath || location.pathname.startsWith(`${routePath}/`);
  };

  const { logout } = useAuth();
  const { clearOrg } = useOrganization();

  const onChangeWorkspace = () => {
    clearOrg();
    navigate('/workspaces', { replace: true });
  }

  const onLogout = () => {
    logout();
    navigate('/login');
  }

  return (
    <Container className="tskr-nav-bar">
      <Nav className="tskr-nav-pages">
        <NavItem
          className="tskr-nav-item"
          type="button"
          onClick={() => navigate('workspace')}
          $activated={isActive('workspace')}
        >
          <WindowIcon width="18" />
          Área de trabalho
        </NavItem>
        <NavItem
          className="tskr-nav-item"
          type="button"
          onClick={() => navigate('projects')}
          $activated={isActive('projects')}
        >
          <InboxStackIcon width="18" />
          Projetos
        </NavItem>
        <NavItem
          className="tskr-nav-item"
          type="button"
          onClick={() => navigate('organization')}
          $activated={isActive('organization')}
        >
          <BuildingOffice2Icon width="18" />
          Organização
        </NavItem>
      </Nav>
      { onProject ? <ProjectNavAccordion isOpen/> : <></> }
      <Actions className="tskr-nav-actions">
        <NavItem className="tskr-nav-item" onClick={onChangeWorkspace}>
          <WindowIcon width="18" />
          Trocar workspace
        </NavItem>
        {/* <NavItem className="tskr-nav-item" $activated>
          <Cog6ToothIcon width="18"/>
          Settings
        </NavItem> */}
        <NavItem className="tskr-nav-item log-out" onClick={onLogout}>
          <ArrowLeftStartOnRectangleIcon width="18" fill={Palette.red} />
          Sair
        </NavItem>
      </Actions>
    </Container >
  )
}
