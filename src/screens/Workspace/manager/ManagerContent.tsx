import { useEffect, useState } from "react";
import { ImportantDates } from "@/components/ImportantDates";
import { ItalicTitle } from "@/components/base/ItalicTitle";
import { SectionTitle } from "@/components/base/SectionTitle";
import { Text } from "@/components/base/Text";
import { Title } from "@/components/base/Title";
import { Button } from "@/components/buttons/Button";
import { NextDeadlineCard } from "@/components/cards/NextDeadlineCard";
import { TasksProgressCard } from "@/components/cards/TasksProgressCard";
import { useOrganization } from "@/hooks/useOrganization";
import { Greating, Infos, Items, Main } from "../style";
import { useManagerDashboard } from "./useManagerDashboard";
import { MemberStatsAccordion } from "@/components/accordions/MemberStatsAccordion";
import { ProjectFilter, ProjectSelect } from "./style";

interface ManagerContentProps {
  username: string;
}

export function ManagerContent({ username }: ManagerContentProps) {
  const { org } = useOrganization();
  const { loading, error, data, loadDashboard } = useManagerDashboard(org?.orgkey);
  const [selectedProjectId, setSelectedProjectId] = useState("");

  useEffect(() => {
    setSelectedProjectId((currentProjectId) => {
      const projectStillExists = data.projects.some(
        (project) => project.id === currentProjectId,
      );

      return projectStillExists ? currentProjectId : (data.projects[0]?.id ?? "");
    });
  }, [data.projects]);

  if (loading) {
    return (
      <Main>
        <Greating><SectionTitle>Olá, {username}!</SectionTitle></Greating>
        <Text>Carregando dashboard...</Text>
      </Main>
    );
  }

  if (error) {
    return (
      <Main>
        <Greating><SectionTitle>Olá, {username}!</SectionTitle></Greating>
        <Text>{error}</Text>
        <Button type="button" onClick={() => void loadDashboard()}>Tentar novamente</Button>
      </Main>
    );
  }

  const selectedProject = data.projectData.find(
    ({ project }) => project.id === selectedProjectId,
  ) ?? data.projectData[0];
  const selectedStats = selectedProject?.stats ?? {
    started: 0,
    done: 0,
    review: 0,
    overdue: 0,
  };
  const selectedDeadlines = selectedProject?.deadlines ?? [];
  const selectedMembersStats = selectedProject?.membersStats ?? [];
  const selectedEvents = selectedProject?.events ?? [];
  const selectedProjects = selectedProject ? [selectedProject.project] : [];

  return (
    <>
      <Main>
        <Greating><SectionTitle>Olá, {username}!</SectionTitle></Greating>
        <ProjectFilter>
          <label htmlFor="manager-project-select">Projeto</label>
          <ProjectSelect
            id="manager-project-select"
            value={selectedProject?.project.id ?? ""}
            onChange={(event) => setSelectedProjectId(event.target.value)}
            disabled={data.projects.length === 0}
          >
            {data.projects.length > 0 ? (
              data.projects.map((project) => (
                <option key={project.id} value={project.id}>{project.title}</option>
              ))
            ) : (
              <option value="">Nenhum projeto gerenciado</option>
            )}
          </ProjectSelect>
        </ProjectFilter>
        <Infos>
          <TasksProgressCard stats={selectedStats} />
          {selectedDeadlines[0] ? (
            <NextDeadlineCard deadline={selectedDeadlines[0]} />
          ) : (
            <ItalicTitle>Nenhum prazo encontrado</ItalicTitle>
          )}
        </Infos>
        <Items>
          <Title>Estatísticas dos membros</Title>
          {selectedMembersStats.length > 0 ? (
            selectedMembersStats.map((member) => (
              <MemberStatsAccordion
                key={`${member.username}-${member.project}`}
                username={member.username}
                project={member.project}
                tasks={{
                  started: member.started,
                  review: member.review,
                  delayed: member.overdue,
                  done: member.done,
                }}
              />
            ))
          ) : (
            <ItalicTitle>Nenhuma estatística de membro encontrada</ItalicTitle>
          )}
        </Items>
      </Main>
      <ImportantDates events={selectedEvents} projects={selectedProjects} />
    </>
  );
}
