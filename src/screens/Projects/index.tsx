import { Container, Content } from "./style.ts";
import { CreateButton } from "../../components/buttons/CreateButton/index.tsx";
import { SearchField } from "../../components/textfields/SearchField/index.tsx";
import { Scroller } from "../../components/misc/Scroller/index.ts";
import { ProjectTile } from "../../components/tiles/ProjectTile/index.tsx";
import { useEffect, useState } from "react";
import { ProjectProgress, type ProjectDTO } from "../../service/types/project/project.dto.ts";
import { useApi } from "../../hooks/useApi.ts";
import { useAuth } from "../../hooks/useAuth.ts";
import { CreateProjectPopup } from "../../components/popups/CreateProject/index.tsx";
import type { ProjectQueryDTO } from "../../service/types/project/project.query.dto.ts";
import { ContentHeader } from "../../components/base/ContentHeader/index.tsx";
import { Text } from "../../components/base/Text/index.ts";

export function Projects() {
  const api = useApi();

  const { user } = useAuth();

  const [projects, setProjects] = useState<ProjectDTO[]>([{
    id: 'b7d621f9',
    title: 'TCC',
    description: 'TCC',
    ownerkey: '653c6be4',
    due_date: new Date().toISOString(),
    progress: ProjectProgress.STARTED
  }]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handlePopup = () => {
    setIsPopupOpen((prev) => !prev);
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
      <ContentHeader
        title=""
      >
        <CreateButton type="button" onClick={handlePopup}>
          <Text>
            Create new project
          </Text>
        </CreateButton>
      </ContentHeader>
      <Content id="projects">
        <SearchField filter sort />
        <Scroller className="vertical">
          {
            projects.map((project) => <ProjectTile
              key={project.id}
              id={project.id}
              title={project.title}
              progress={project.progress}
              due_date={project.due_date}
            />)
          }
        </Scroller>
      </Content>
    </Container>
  )
}