import { Container, Content, Items, StageFilterControl } from "./style.ts";
import { CreateButton } from "../../components/buttons/CreateButton/index.tsx";
import { SearchField } from "../../components/textfields/SearchField/index.tsx";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ProjectStage, type ProjectDTO } from "../../service/types/project/project.dto.ts";
import { useAuth } from "../../hooks/useAuth.ts";
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

const stageLabels: Record<ProjectStage, string> = {
  [ProjectStage.OVERDUE]: "Atrasado",
  [ProjectStage.STARTED]: "Em andamento",
  [ProjectStage.REVIEW]: "Em revisão",
  [ProjectStage.PENDING]: "Pendente",
  [ProjectStage.DONE]: "Concluído",
};

export function Projects() {
  const { MemberService, ProjectService } = useServices();
  const notifications = useToast();

  const { user } = useAuth();
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
    if (!org?.orgkey || !org.role || !user?.username) {
      setProjects([]);
      return;
    }

    try {
      const response = await ProjectService.list({
        orgkey: org.orgkey,
      });

      const organizationProjects = response.data.filter(
        (project) => project.orgkey === org.orgkey,
      );

      if (org.role === OrgRole.OWNER) {
        setProjects(organizationProjects);
        return;
      }

      if (org.role === OrgRole.MANAGER) {
        setProjects(organizationProjects.filter(
          (project) => project.managerkey === user.username,
        ));
        return;
      }

      const projectsWithMembers = await Promise.all(
        organizationProjects.map(async (project) => {
          if (project.members) {
            return project;
          }

          const membersResponse = await MemberService.list(project.id);

          return {
            ...project,
            members: membersResponse.data,
          };
        }),
      );
      const memberProjects = projectsWithMembers.filter((project) =>
        project.members?.some(
          (member) =>
            member.userkey === user.username ||
            member.user?.userkey === user.username ||
            member.user?.user?.username === user.username,
        ),
      );

      setProjects(memberProjects);
    } catch (error) {
      const { errors } = error as ApiError;

      errors?.forEach((item) => {
        notifications[item.level](item.message);
      });
    }
  }, [MemberService, ProjectService, notifications, org?.orgkey, org?.role, user?.username]);

  useEffect(() => {
    void loadProjects();
  }, [isPopupOpen, loadProjects]);

  const filteredProjects = useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase("pt-BR");

    return projects.filter((project) => {
      const matchesSearch = !normalizedSearch || project.title
        .toLocaleLowerCase("pt-BR")
        .includes(normalizedSearch);
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
          placeholder="Pesquisar projetos por título"
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
                <option key={stage} value={stage}>{stageLabels[stage]}</option>
              ))}
            </select>
          </StageFilterControl>
          : <></>
        }
        <Items className="vertical">
          {
            filteredProjects.map((project) => <ProjectCard
              key={project.id}
              id={project.id}
              title={project.title}
              description={project.description}
              stage={project.stage}
              deadline={project.due_date}
              members={project.members ?? []}
            />)
          }
        </Items>
      </Content>
    </Container>
  )
}
