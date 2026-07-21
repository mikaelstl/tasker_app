import { Container, Content } from "./style.ts";
import { CreateButton } from "../../components/buttons/CreateButton/index.tsx";
import { SearchField } from "../../components/textfields/SearchField/index.tsx";
import { Scroller } from "../../components/misc/Scroller/index.ts";
import { useEffect, useState } from "react";
import { ProjectProgress, type ProjectDTO } from "../../service/types/project/project.dto.ts";
import { useAuth } from "../../hooks/useAuth.ts";
import { CreateProjectPopup } from "../../components/popups/CreateProject/index.tsx";
import { ContentHeader } from "../../components/base/ContentHeader/index.tsx";
import { Text } from "../../components/base/Text/index.ts";
import { useServices } from "../../hooks/useServices.ts";
import { ProjectCard } from "@/components/cards/ProjectCard/index.tsx";

export function Projects() {
  const { ProjectService } = useServices();

  const { user } = useAuth();

  const [projects, setProjects] = useState<ProjectDTO[]>([{
    id: 'b7d621f9',
    title: 'TCC',
    description: 'TCC',
    ownerkey: '653c6be4',
    managerkey: null,
    due_date: new Date().toISOString(),
    progress: ProjectProgress.STARTED,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handlePopup = () => {
    setIsPopupOpen((prev) => !prev);
    console.log(isPopupOpen);
  };

  useEffect(() => {
    ProjectService.list({
      ownerkey: user?.username
    }).then(
      (result) => {
        setProjects(result.data);
      }
    );
  }, [ProjectService, isPopupOpen, user?.username]);

  return (
    <Container className="projects-content">
      <CreateProjectPopup showPopup={isPopupOpen} closePopup={handlePopup} />
      <ContentHeader
        title=""
      >
        <CreateButton type="button" onClick={handlePopup}>
          <Text>
            Criar novo projeto
          </Text>
        </CreateButton>
      </ContentHeader>
      <Content id="projects">
        <SearchField filter sort />
        <Scroller className="vertical">
          {
            projects.map((project) => <ProjectCard
              key={project.id}
              id={project.id}
              title={project.title}
              description={project.description}
              stage={project.progress}
              deadline={project.due_date}
              members={project.members ?? []}
            />)
          }
        </Scroller>
      </Content>
    </Container>
  )
}
