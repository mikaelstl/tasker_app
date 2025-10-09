import { Container, Content, ContentHeader, ProjectsArea } from "./style.ts";
import { CreateButton } from "../../components/buttons/CreateButton/index.tsx";
import { SearchField } from "../../components/textfields/SearchField/index.tsx";
import { Scroller } from "../../components/misc/Scroller/index.ts";
import { ProjectTile } from "../../components/tiles/ProjectTile/index.tsx";
import { Title } from "../../components/base/Title/index.ts";

export function Projects() {
  const projects = Array.from({ length: 10 }, (_, i) => i)

  return (
    <Container className="projects-content">
      <CreateButton>Create new project</CreateButton>
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
              projects.map((index) => <ProjectTile key={index} />)
            }
          </Scroller>
        </ProjectsArea>
      </Content>
    </Container>
  )
}