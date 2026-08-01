import { ArrowLeftStartOnRectangleIcon, ChevronDownIcon, ChevronUpIcon } from "@/components/icons/heroicons"
import { BuildingOffice2Icon, InboxStackIcon, WindowIcon } from "@/components/icons/heroicons"
import Palette from "../../../assets/palette"
import { Accordion, Actions, Container, Leading, Nav, NavItem, ProjectNav } from "./style"
import { useLocation, useMatch, useNavigate } from "react-router-dom"
import { useAuth } from "../../../hooks/useAuth"
import { FolderOpenIcon as FolderOpenIcon20 } from "@/components/icons/heroicons"
import { useEffect, useState } from "react"
import { ArrowsRightLeftIcon, CalendarIcon, ChartBarIcon, ClipboardIcon, UserIcon } from "@/components/icons/heroicons"
import { useOrganization } from "../../../hooks/useOrganization"

interface ProjectNavAccordionProps {
  isOpen: boolean
  projectId: string
}

const ProjectNavAccordion = ({
  isOpen,
  projectId
}: ProjectNavAccordionProps) => {
  const navigate = useNavigate();

  const location = useLocation();
  const projectPath = `/home/project/${projectId}`;

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
          <FolderOpenIcon20 width={20} />
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
              onClick={() => navigate(`${projectPath}/overview`)}
              $activated={path === `${projectPath}/overview`}
            >
              <WindowIcon width="18" />
              Visão geral
            </NavItem>
            <NavItem 
              className="tskr-nav-item"
              type="button"
              onClick={() => navigate(`${projectPath}/tasks`)}
              $activated={path === `${projectPath}/tasks`}
            >
              <ClipboardIcon width="18" />
              Tarefas
            </NavItem>
            <NavItem 
              className="tskr-nav-item"
              type="button"
              onClick={() => navigate(`${projectPath}/calendar`)}
              $activated={path === `${projectPath}/calendar`}
            >
              <CalendarIcon width="18" />
              Calendário
            </NavItem>
            <NavItem 
              className="tskr-nav-item"
              type="button"
              onClick={() => navigate(`${projectPath}/members`)}
              $activated={path === `${projectPath}/members`}
            >
              <UserIcon width="18" />
              Membros
            </NavItem>
            <NavItem 
              className="tskr-nav-item"
              type="button"
              onClick={() => navigate(`${projectPath}/stats`)}
              $activated={path === `${projectPath}/stats`}
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

export function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const projectMatch = useMatch("/home/project/:id/*");
  const projectId = projectMatch?.params.id;
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
      {projectId ? <ProjectNavAccordion isOpen projectId={projectId} /> : null}
      <Actions className="tskr-nav-actions">
        <NavItem className="tskr-nav-item" onClick={onChangeWorkspace}>
          <ArrowsRightLeftIcon width="18" />
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
