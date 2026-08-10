import { useCallback, useEffect, useMemo, useState } from "react";
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
import type { ProjectDTO } from "@/service/types/project/project.dto";
import type { MemberStats } from "@/service/types/stats/stats.types";
import type { ApiError } from "@/service/types/response/error";
import {
  Container,
  Content,
  EmptyState,
  MembersArea
} from "./style";
import {
  AddProjectMember,
  type ProjectMemberReference,
} from "@/components/popups/AddProjectMember";
import { useAccessControl } from "@/hooks/useAccessControl";

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

function getMemberName(member: MemberStats) {
  return member.user.name || member.user.username;
}

function getMemberUsername(member: MemberStats) {
  return member.user.username;
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
  const { canManageProjectMembers } = useAccessControl();
  const { AffiliationService, MemberService, ProjectService } = useServices();

  const [project, setProject] = useState<ProjectDTO | null>(null);

  const [memberStats, setMemberStats] = useState<MemberStats[]>([]);
  const [affiliations, setAffiliations] = useState<AffiliationDTO[]>([]);
  const [loadingProject, setLoadingProject] = useState(true);
  const [loadingMembers, setLoadingMembers] = useState(true);
  const [loadingAffiliations, setLoadingAffiliations] = useState(true);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const loading = loadingProject || loadingMembers || loadingAffiliations;
  const projectTitle = project?.title ?? "";

  const loadProject = useCallback(async () => {
    if (!id) return;

    setLoadingProject(true);

    try {
      const response = await ProjectService.find(id);
      setProject(response.data);
    } catch (error) {
      reportApiError(error, "Não foi possível carregar o projeto.", notifications);
      navigate("..");
    } finally {
      setLoadingProject(false);
    }
  }, [ProjectService, id, navigate, notifications]);

  const loadMemberStats = useCallback(async () => {
    if (!id) return;

    setLoadingMembers(true);

    try {
      const response = await ProjectService.getProjectMemberStats(id);
      setMemberStats(response.data);
    } catch (error) {
      reportApiError(error, "Não foi possível carregar os membros do projeto.", notifications);
      navigate("..");
    } finally {
      setLoadingMembers(false);
    }
  }, [ProjectService, id, navigate, notifications]);

  const loadAffiliations = useCallback(async () => {
    if (!org?.orgkey) return;

    setLoadingAffiliations(true);

    try {
      const response = await AffiliationService.listByOrganization(org.orgkey);
      setAffiliations(response.data);
    } catch (error) {
      reportApiError(error, "Não foi possível carregar os membros da organização.", notifications);
      navigate("..");
    } finally {
      setLoadingAffiliations(false);
    }
  }, [AffiliationService, navigate, notifications, org?.orgkey]);

  useEffect(() => {
    if (!id || !org?.orgkey) {
      navigate("..");
      return;
    }

    void loadProject();
    void loadMemberStats();
    void loadAffiliations();
  }, [id, loadAffiliations, loadMemberStats, loadProject, navigate, org?.orgkey]);

  const searchValue = normalizeSearchTerm(search);

  const filteredMemberStats = useMemo(() => (
    memberStats.filter((member) => {
      if (!searchValue) return true;

      const name = normalizeSearchTerm(getMemberName(member));
      const username = normalizeSearchTerm(getMemberUsername(member));
      return name.includes(searchValue) || username.includes(searchValue);
    })
  ), [memberStats, searchValue]);

  const projectMembers = useMemo<ProjectMemberReference[]>(() => (
    memberStats.map((member) => ({
      id: member.memberId,
      userkey: member.user.affiliationId,
    }))
  ), [memberStats]);

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

    if (projectMembers.some((member) => member.id === memberkey)) {
      notifications.info("Esse membro já está no projeto.");
      return;
    }

    console.log(memberkey);
    

    try {
      await MemberService.create({
        project: id,
        user: memberkey,
      });

      await loadMemberStats();
      notifications.info("Membro adicionado ao projeto.");
    } catch (error) {
      reportApiError(error, "Não foi possível adicionar o membro ao projeto.", notifications);
    }
  };

  const removeProjectMember = async (memberkey: string) => {
    if (!id) return;

    try {
      await MemberService.delete(memberkey);

      await loadMemberStats();
      notifications.info("Membro removido do projeto.");
    } catch (error) {
      reportApiError(error, "Não foi possível remover o membro do projeto.", notifications);
    }
  };

  return (
    <Container className="tskr-proj-members">
      <ContentHeader title="Membros do projeto">
        {canManageProjectMembers() && (
          <CreateButton type="button" onClick={() => setModalOpen(true)} disabled={loading}>
            <Text>Editar Membros</Text>
          </CreateButton>
        )}
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
          ) : filteredMemberStats.length > 0 ? (
            <Scroller orientation="vertical" gap={16}>
              {filteredMemberStats.map((stats) => {

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
        open={modalOpen && canManageProjectMembers()}
        loading={loading}
        projectTitle={projectTitle}
        members={filteredOrganizationMembers}
        projectMembers={projectMembers}
        onClose={() => setModalOpen(false)}
        onAddMember={addProjectMember}
        onRemoveMember={removeProjectMember}
      />
    </Container>
  );
}
