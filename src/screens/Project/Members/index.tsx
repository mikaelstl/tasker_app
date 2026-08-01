import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ContentHeader } from "@/components/base/ContentHeader";
import { CreateButton } from "@/components/buttons/CreateButton";
import { Text } from "@/components/base/Text";
import { Scroller } from "@/components/misc/Scroller";
import { SearchField } from "@/components/textfields/SearchField";
import { MemberStatTile } from "@/components/tiles/MemberStatTile";
import { useOrganization } from "@/hooks/useOrganization";
import { useServices } from "@/hooks/useServices";
import { useToast, type ToastNotifications } from "@/hooks/useToast";
import type { AffiliationDTO } from "@/service/types/affiliation/affiliation.dto";
import type { ProjectMember } from "@/service/types/member/member.dto";
import type { ProjectDTO } from "@/service/types/project/project.dto";
import type { MemberStats } from "@/service/types/stats/stats.types";
import type { ApiError } from "@/service/types/response/error";
import {
  Container,
  Content,
  EmptyState,
  MembersArea
} from "./style";
import { AddProjectMember } from "@/components/popups/AddProjectMember";

function reportApiError(
  error: unknown,
  fallback: string,
  notifications: ToastNotifications,
) {
  const { errors } = error as ApiError;

  if (!errors?.length) {
    notifications.error(fallback);
    return;
  }

  errors.forEach((item) => {
    notifications[item.level](item.message);
  });
}

function getProjectMemberName(member: ProjectMember) {
  return member.user?.user?.name
    ?? member.user?.userkey
    ?? member.userkey;
}

function getProjectMemberUsername(member: ProjectMember) {
  return member.user?.user?.username
    ?? member.user?.userkey
    ?? member.userkey;
}

function getAffiliationName(member: AffiliationDTO) {
  return member.user?.name ?? member.userkey;
}

function getAffiliationUsername(member: AffiliationDTO) {
  return member.user?.username ?? member.userkey;
}

function normalizeSearchTerm(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pt-BR")
    .trim();
}

export function Members() {
  const navigate = useNavigate();
  const notifications = useToast();
  const { id } = useParams();
  const { org } = useOrganization();
  const { AffiliationService, MemberService, ProjectService } = useServices();

  const [project, setProject] = useState<ProjectDTO | null>(null);
  const [members, setMembers] = useState<ProjectMember[]>([]);
  const [memberStats, setMemberStats] = useState<MemberStats[]>([]);
  const [affiliations, setAffiliations] = useState<AffiliationDTO[]>([]);
  const [loadingProject, setLoadingProject] = useState(true);
  const [loadingMembers, setLoadingMembers] = useState(true);
  const [loadingAffiliations, setLoadingAffiliations] = useState(true);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const loading = loadingProject || loadingMembers || loadingAffiliations;
  const projectTitle = project?.title ?? "";
  const projectMemberIds = useMemo(
    () => new Set(members.map((member) => member.userkey)),
    [members],
  );

  useEffect(() => {
    if (!id || !org?.orgkey) {
      navigate("..");
    }
  }, [id, navigate, org?.orgkey]);

  useEffect(() => {
    let active = true;

    const loadProject = async () => {
      if (!id) return;

      setLoadingProject(true);

      try {
        const response = await ProjectService.find(id);

        if (!active) return;

        setProject(response.data);
      } catch (error) {
        if (!active) return;

        reportApiError(error, "Não foi possível carregar o projeto.", notifications);
        navigate("..");
      } finally {
        if (active) {
          setLoadingProject(false);
        }
      }
    };

    void loadProject();

    return () => {
      active = false;
    };
  }, [ProjectService, id, navigate, notifications]);

  useEffect(() => {
    let active = true;

    const loadMembers = async () => {
      if (!id) return;

      setLoadingMembers(true);

      try {
        const [membersResponse, statsResponse] = await Promise.all([
          MemberService.list(id),
          ProjectService.getProjectMemberStats(id),
        ]);

        if (!active) return;

        console.log(statsResponse);
        

        setMembers(membersResponse.data);
        setMemberStats(statsResponse.data);
      } catch (error) {
        if (!active) return;

        reportApiError(error, "Não foi possível carregar os membros do projeto.", notifications);
        navigate("..");
      } finally {
        if (active) {
          setLoadingMembers(false);
        }
      }
    };

    void loadMembers();

    return () => {
      active = false;
    };
  }, [MemberService, ProjectService, id, navigate, notifications]);

  useEffect(() => {
    let active = true;

    const loadAffiliations = async () => {
      if (!org?.orgkey) return;

      setLoadingAffiliations(true);

      try {
        const response = await AffiliationService.listByOrganization(org.orgkey);

        if (!active) return;

        setAffiliations(response.data);
      } catch (error) {
        if (!active) return;

        reportApiError(error, "Não foi possível carregar os membros da organização.", notifications);
        navigate("..");
      } finally {
        if (active) {
          setLoadingAffiliations(false);
        }
      }
    };

    void loadAffiliations();

    return () => {
      active = false;
    };
  }, [AffiliationService, navigate, notifications, org?.orgkey]);

  const searchValue = normalizeSearchTerm(search);

  const filteredProjectMembers = useMemo(() => (
    members.filter((member) => {
      if (!searchValue) return true;

      const name = normalizeSearchTerm(getProjectMemberName(member));
      const username = normalizeSearchTerm(getProjectMemberUsername(member));
      return name.includes(searchValue) || username.includes(searchValue);
    })
  ), [members, searchValue]);

  const filteredOrganizationMembers = useMemo(() => (
    affiliations.filter((member) => {
      if (!searchValue) return true;

      const name = normalizeSearchTerm(getAffiliationName(member));
      const username = normalizeSearchTerm(getAffiliationUsername(member));
      return name.includes(searchValue) || username.includes(searchValue);
    })
  ), [affiliations, searchValue]);

  const addProjectMember = async (memberkey: string) => {
    if (!id) return;

    if (projectMemberIds.has(memberkey)) {
      notifications.info("Esse membro já está no projeto.");
      return;
    }

    try {
      const response = await MemberService.create({
        project: id,
        user: memberkey,
      });

      setMembers((current) => [...current, response.data]);
      const statsResponse = await ProjectService.getProjectMemberStats(id);
      setMemberStats(statsResponse.data);
      notifications.info("Membro adicionado ao projeto.");
    } catch (error) {
      reportApiError(error, "Não foi possível adicionar o membro ao projeto.", notifications);
    }
  };

  const removeProjectMember = async (memberkey: string) => {
    if (!id) return;

    try {
      await MemberService.delete(memberkey);

      setMembers((current) => current.filter((item) => item.id !== memberkey));
      setMemberStats((current) => current.filter((item) => item.user.affiliationId !== memberkey));
      notifications.info("Membro removido do projeto.");
    } catch (error) {
      reportApiError(error, "Não foi possível remover o membro do projeto.", notifications);
    }
  };

  return (
    <Container className="tskr-proj-members">
      <ContentHeader title="Membros do projeto">
        <CreateButton type="button" onClick={() => setModalOpen(true)} disabled={loading}>
          <Text>Editar Membros</Text>
        </CreateButton>
      </ContentHeader>

      <Content id="team">
        <SearchField
          value={search}
          onChange={setSearch}
          placeholder="Pesquisar membro por nome ou usuário"
        />

        <MembersArea>
          {loading ? (
            <EmptyState>Carregando membros do projeto...</EmptyState>
          ) : filteredProjectMembers.length > 0 ? (
            <Scroller orientation="vertical" gap={16}>
              {filteredProjectMembers.map((member) => {
                const stats = memberStats.find((item) => item.user.affiliationId === member.userkey);
                
                if (!stats) return null;

                return (
                  <MemberStatTile
                    key={stats.memberId}
                    affiliationId={stats.user.affiliationId}
                    project={projectTitle}
                    started={stats.startedTasks}
                    done={stats.completedTasks}
                    overdue={stats.delayedTasks}
                    review={stats.reviewTasks}
                    tasks={stats.tasks}
                  />
                );
              })}
            </Scroller>
          ) : (
            <EmptyState>Nenhum membro encontrado para este projeto.</EmptyState>
          )}
        </MembersArea>
      </Content>

      <AddProjectMember
        open={modalOpen}
        loading={loading}
        projectTitle={projectTitle}
        members={filteredOrganizationMembers}
        projectMembers={members}
        onClose={() => setModalOpen(false)}
        onAddMember={addProjectMember}
        onRemoveMember={removeProjectMember}
      />
    </Container>
  );
}
