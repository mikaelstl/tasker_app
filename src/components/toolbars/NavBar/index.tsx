import Palette from "../../../assets/palette"
import { Accordion, Actions, Container, Leading, Nav, NavItem, ProjectNav } from "./style"
import { useLocation, useMatch, useNavigate } from "react-router-dom"
import { useAuth } from "../../../hooks/useAuth"
import { useEffect, useState } from "react"
import {
  TransferHorizontal,
  Calendar,
  Chart,
  Clipboard,
  User,
  Logout,
  AltArrowDown,
  AltArrowUp,
  Buildings2,
  Inbox,
  WindowFrame,
  FolderOpen
} from "@/components/icons/solar-icons"
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
  const [icon, set] = useState(<AltArrowDown width={20} />)

  const [open, setOpen] = useState(isOpen);
  const handleOpen = () => {
    setOpen(!open);
  }

  useEffect(() => {
    if (open) {
      set(<AltArrowUp width={20} />)
    } else {
      set(<AltArrowDown width={20} />)
    }
  }, [open]);

  useEffect(() => {
    setPath(location.pathname);
  }, [location]);

  return (
    <ProjectNav>
      <Accordion type="button" onClick={handleOpen}>
        <Leading>
          <FolderOpen width={20} />
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
              <WindowFrame width="18" />
              Visão geral
            </NavItem>
            <NavItem 
              className="tskr-nav-item"
              type="button"
              onClick={() => navigate(`${projectPath}/tasks`)}
              $activated={path === `${projectPath}/tasks`}
            >
              <Clipboard width="18" />
              Tarefas
            </NavItem>
            <NavItem 
              className="tskr-nav-item"
              type="button"
              onClick={() => navigate(`${projectPath}/calendar`)}
              $activated={path === `${projectPath}/calendar`}
            >
              <Calendar width="18" />
              Calendário
            </NavItem>
            <NavItem 
              className="tskr-nav-item"
              type="button"
              onClick={() => navigate(`${projectPath}/members`)}
              $activated={path === `${projectPath}/members`}
            >
              <User width="18" />
              Membros
            </NavItem>
            <NavItem 
              className="tskr-nav-item"
              type="button"
              onClick={() => navigate(`${projectPath}/stats`)}
              $activated={path === `${projectPath}/stats`}
            >
              <Chart width="18" />
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
          <WindowFrame width="18" />
          Área de trabalho
        </NavItem>
        <NavItem
          className="tskr-nav-item"
          type="button"
          onClick={() => navigate('projects')}
          $activated={isActive('projects')}
        >
          <Inbox width="18" />
          Projetos
        </NavItem>
        <NavItem
          className="tskr-nav-item"
          type="button"
          onClick={() => navigate('organization')}
          $activated={isActive('organization')}
        >
          <Buildings2 width="18" />
          Organização
        </NavItem>
      </Nav>
      {projectId ? <ProjectNavAccordion isOpen projectId={projectId} /> : null}
      <Actions className="tskr-nav-actions">
        <NavItem className="tskr-nav-item" onClick={onChangeWorkspace}>
          <TransferHorizontal width="18" />
          Trocar workspace
        </NavItem>
        {/* <NavItem className="tskr-nav-item" $activated>
          <Cog6Tooth width="18"/>
          Settings
        </NavItem> */}
        <NavItem className="tskr-nav-item log-out" onClick={onLogout}>
          <Logout width="20" color={Palette.red} />
          Sair
        </NavItem>
      </Actions>
    </Container >
  )
}
