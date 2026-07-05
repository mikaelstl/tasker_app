import { Container, Content } from "./style.ts";
import { CreateButton } from "../../components/buttons/CreateButton/index.tsx";
import { SearchField } from "../../components/textfields/SearchField/index.tsx";
import { Scroller } from "../../components/misc/Scroller/index.ts";
import { ProjectTile } from "../../components/tiles/ProjectTile/index.tsx";
import { useEffect, useState } from "react";
import type { ProjectDTO } from "../../service/types/project/project.dto.ts";
import { useAuth } from "../../hooks/useAuth.ts";
import { CreateProjectPopup } from "../../components/popups/CreateProject/index.tsx";
import { ContentHeader } from "../../components/base/ContentHeader/index.tsx";
import { Text } from "../../components/base/Text/index.ts";
import { useServices } from "@/hooks/useServices.ts";

export function Projects() {
  const { user } = useAuth();
  const { ProjectService } = useServices();

  const [projects, setProjects] = useState<ProjectDTO[]>([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handlePopup = () => {
    setIsPopupOpen((prev) => !prev);
  };

  useEffect(() => {
    if (!user?.username) return;

    ProjectService.list({
      ownerkey: user.username,
    }).then(({ data }) => {
      setProjects(data);
    });
  }, [isPopupOpen, user?.username]);

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
