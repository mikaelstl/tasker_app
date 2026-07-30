import { Container, Content, Items, StageFilterControl } from "./style.ts";
import { CreateButton } from "../../components/buttons/CreateButton/index.tsx";
import { SearchField } from "../../components/textfields/SearchField/index.tsx";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ProjectStage, type ProjectDTO } from "../../service/types/project/project.dto.ts";
import { CreateProjectPopup } from "../../components/popups/CreateProject/index.tsx";
import { ContentHeader } from "../../components/base/ContentHeader/index.tsx";
import { Text } from "../../components/base/Text/index.ts";
import { useServices } from "../../hooks/useServices.ts";
import { ProjectCard } from "@/components/cards/ProjectCard/index.tsx";
import { useToast } from "@/hooks/useToast.tsx";
import type { ApiError } from "@/service/types/response/error.ts";
import { useOrganization } from "@/hooks/useOrganization.ts";
import { OrgRole } from "@/utils/enums/OrgRole.ts";

type StageFilter = ProjectStage | "ALL";

function stageLabel(stage: ProjectStage): string {
  switch (stage) {
    case ProjectStage.STARTED: return "Iniciado";
    case ProjectStage.IN_PROGRESS: return "Em andamento";
    case ProjectStage.PAUSED: return "Pausado";
    case ProjectStage.COMPLETED: return "Concluído";
    case ProjectStage.PENDING:
    default:
      return "Pendente";
  }
}

function normalizeSearchTerm(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pt-BR")
    .trim();
}

export function Projects() {
  const { ProjectService } = useServices();
  const notifications = useToast();

  const { org } = useOrganization();

  const [projects, setProjects] = useState<ProjectDTO[]>([]);
  const [search, setSearch] = useState("");
  const [stageFilter, setStageFilter] = useState<StageFilter>("ALL");
  const [showStageFilter, setShowStageFilter] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handlePopup = () => {
    setIsPopupOpen((prev) => !prev);
  };

  const loadProjects = useCallback(async () => {
    if (!org?.orgkey) {
      setProjects([]);
      return;
    }

    try {
      const response = await ProjectService.list();

      setProjects(response.data);
    } catch (error) {
      const { errors } = error as ApiError;

      errors?.forEach((item) => {
        notifications[item.level](item.message);
      });
    }
  }, [ProjectService, notifications, org?.orgkey]);

  useEffect(() => {
    void loadProjects();
  }, [isPopupOpen, loadProjects]);

  const filteredProjects = useMemo(() => {
    const normalizedSearch = normalizeSearchTerm(search);

    return projects.filter((project) => {
      const title = normalizeSearchTerm(project.title);
      const description = normalizeSearchTerm(project.description ?? "");
      const matchesSearch = !normalizedSearch
        || title.includes(normalizedSearch)
        || description.includes(normalizedSearch);
      const matchesStage = stageFilter === "ALL" || project.stage === stageFilter;

      return matchesSearch && matchesStage;
    });
  }, [projects, search, stageFilter]);

  return (
    <Container className="projects-content">
      <CreateProjectPopup showPopup={isPopupOpen} closePopup={handlePopup} />
      <ContentHeader
        title=""
      >
        {
          org?.role === OrgRole.OWNER
            ? <CreateButton type="button" onClick={handlePopup}>
              <Text>
                Criar novo projeto
              </Text>
            </CreateButton>
            : <></>
        }
      </ContentHeader>
      <Content id="projects">
        <SearchField
          onFilter={() => setShowStageFilter((current) => !current)}
          value={search}
          onChange={setSearch}
          placeholder="Pesquisar projetos por título ou descrição"
        />
        {showStageFilter
          ? <StageFilterControl htmlFor="project-stage-filter">
            Estágio
            <select
              id="project-stage-filter"
              value={stageFilter}
              onChange={(event) => setStageFilter(event.target.value as StageFilter)}
            >
              <option value="ALL">Todos</option>
              {Object.values(ProjectStage).map((stage) => (
                <option key={stage} value={stage}>{stageLabel(stage)}</option>
              ))}
            </select>
          </StageFilterControl>
          : <></>
        }
        <Items orientation="vertical">
          {filteredProjects.length === 0
            ? <Text>Nenhum projeto encontrado.</Text>
            : filteredProjects.map((project) => <ProjectCard
              key={project.id}
              id={project.id}
              title={project.title}
              description={project.description}
              stage={project.stage}
              managerkey={project.managerkey}
              deadline={project.deadline}
              members={[]}
            />)}
        </Items>
      </Content>
    </Container>
  )
}
