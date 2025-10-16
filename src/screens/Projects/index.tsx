import { Container, Content, ContentHeader, ProjectsArea } from "./style.ts";
import { CreateButton } from "../../components/buttons/CreateButton/index.tsx";
import { SearchField } from "../../components/textfields/SearchField/index.tsx";
import { Scroller } from "../../components/misc/Scroller/index.ts";
import { ProjectTile } from "../../components/tiles/ProjectTile/index.tsx";
import { Title } from "../../components/base/Title/index.ts";
import { useEffect, useState } from "react";
import type { ProjectDTO } from "../../service/types/project/project.dto.ts";
import { useApi } from "../../hooks/useApi.ts";
import { useAuth } from "../../hooks/useAuth.ts";
import { CreateProjectPopup } from "../../components/popups/CreateProject/index.tsx";

export function Projects() {
  const api = useApi();

  const { user } = useAuth();

  const [projects, setProjects] = useState<ProjectDTO[]>([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  useEffect(() => {
    api.get({
      route: '/project/list',
      headers: {
        'user': user?.username
      }
    }).then(
      (result) => {
        setProjects(result.data);
      }
    );
  }, [isPopupOpen]);
  
  return (
    <Container className="projects-content">
      <CreateProjectPopup showPopup={isPopupOpen} closePopup={handleClosePopup}/>
      <CreateButton onClick={handleOpenPopup}>Create new project</CreateButton>
      <SearchField filter sort/>
      <Content id="projects">
        <ContentHeader id="projects-header">
          <Title className="head-cell">Project</Title>
          <Title className="head-cell">Owner</Title>
          <Title className="head-cell">Stage</Title>
          <Title className="head-cell">Doned Tasks</Title>
          <Title className="head-cell">Members</Title>
        </ContentHeader>
        <ProjectsArea>
          <Scroller className="vertical">
            {
              projects.map((project) => <ProjectTile key={project.id} />)
            }
          </Scroller>
        </ProjectsArea>
      </Content>
    </Container>
  )
}