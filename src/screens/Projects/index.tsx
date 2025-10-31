import { Container, Content } from "./style.ts";
import { CreateButton } from "../../components/buttons/CreateButton/index.tsx";
import { SearchField } from "../../components/textfields/SearchField/index.tsx";
import { Scroller } from "../../components/misc/Scroller/index.ts";
import { ProjectTile } from "../../components/tiles/ProjectTile/index.tsx";
import { useEffect, useState } from "react";
import type { ProjectDTO } from "../../service/types/project/project.dto.ts";
import { useApi } from "../../hooks/useApi.ts";
import { useAuth } from "../../hooks/useAuth.ts";
import { CreateProjectPopup } from "../../components/popups/CreateProject/index.tsx";
import type { ProjectQueryDTO } from "../../service/types/project/project.query.dto.ts";

export function Projects() {
  const api = useApi();

  const { user } = useAuth();

  const [projects, setProjects] = useState<ProjectDTO[]>([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handlePopup = () => {
    setIsPopupOpen((prev) => !prev);
    console.log(isPopupOpen);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    console.log(isPopupOpen);
  };

  useEffect(() => {
    api.get<ProjectQueryDTO>({
      route: '/project/list',
      params: {
        ownerkey: user?.username
      }
    }).then(
      (result) => {
        setProjects(result.data);
      }
    );
  }, [isPopupOpen]);

  return (
    <Container className="projects-content">
      <CreateProjectPopup showPopup={isPopupOpen} closePopup={handlePopup} />
      <CreateButton type="button" onClick={handlePopup}>Create new project</CreateButton>
      <SearchField filter sort />
      <Content id="projects">
        <Scroller className="vertical">
          {
            projects.map((project) => <ProjectTile
              key={project.id}
              id={project.id}
              title={project.title}
              description={project.description}
              owner={project.ownerkey}
              progress={project.progress}
              due_date={project.due_date}
            />)
          }
        </Scroller>
      </Content>
    </Container>
  )
}