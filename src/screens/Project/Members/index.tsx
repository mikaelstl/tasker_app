import { useEffect, useMemo, useState } from "react";
import { PlusIcon, TrashIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { useNavigate, useParams } from "react-router-dom";
import { ContentHeader } from "../../../components/base/ContentHeader";
import { CreateButton } from "../../../components/buttons/CreateButton";
import { Text } from "../../../components/base/Text";
import { Scroller } from "../../../components/misc/Scroller";
import { User } from "../../../components/misc/User";
import { SearchField } from "../../../components/textfields/SearchField";
import { MemberStatTile } from "../../../components/tiles/MemberStatTile";
import { useOrganization } from "../../../hooks/useOrganization";
import { useServices } from "../../../hooks/useServices";
import { useToast, type ToastNotifications } from "@/hooks/useToast";
import type { AffiliationDTO } from "../../../service/types/affiliation/affiliation.dto";
import type { ProjectMember } from "../../../service/types/member/member.dto";
import type { ProjectDTO } from "../../../service/types/project/project.dto";
import type { StatsTask } from "../../../service/types/stats/stats.types";
import { TaskStage } from "../../../service/types/task/stage.dto";
import type { TaskDTO } from "../../../service/types/task/task.dto";
import type { ApiError } from "../../../service/types/response/error";
import {
  Container,
  Content,
  EmptyState,
  MemberActionButton,
  MemberActions,
  MemberCard,
  MemberRowCard,
  MemberRowInfo,
  MembersArea,
  ModalCloseButton,
  ModalContent,
  ModalDescription,
  ModalDialog,
  ModalHeader,
  ModalOverlay,
  ModalTitle,
} from "./style";

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

function toStatsTasks(tasks: TaskDTO[]): StatsTask[] {
  return tasks.map((task) => ({
    id: task.id,
    code: task.code,
    name: task.name,
    stage: task.stage,
    delayed: task.delayed,
    spentMinutes: 0,
    deadline: task.deadline,
    startedAt: task.started_at,
    doneAt: task.done_at,
  }));
}

function getTaskCounts(tasks: TaskDTO[]) {
  return {
    started: tasks.filter((task) => task.stage === TaskStage.STARTED).length,
    review: tasks.filter((task) => task.stage === TaskStage.REVIEW).length,
    done: tasks.filter((task) => task.stage === TaskStage.DONE).length,
    overdue: tasks.filter((task) => task.delayed).length,
  };
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

interface MemberModalProps {
  open: boolean;
  loading: boolean;
  projectTitle: string;
  members: AffiliationDTO[];
  projectMembers: ProjectMember[];
  pendingMemberId: string | null;
  onClose: () => void;
  onAddMember: (member: AffiliationDTO) => void;
  onRemoveMember: (member: ProjectMember) => void;
}

function MembersModal({
  open,
  loading,
  projectTitle,
  members,
  projectMembers,
  pendingMemberId,
  onClose,
  onAddMember,
  onRemoveMember,
}: MemberModalProps) {
  useEffect(() => {
    if (!open) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [onClose, open]);

  const projectMemberIds = new Set(projectMembers.map((member) => member.userkey));

  if (!open) return null;

  return (
    <ModalOverlay onMouseDown={onClose}>
      <ModalDialog
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-members-modal-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <ModalHeader>
          <ModalTitle id="project-members-modal-title">Editar membros</ModalTitle>
          <ModalCloseButton type="button" onClick={onClose} aria-label="Fechar modal">
            <XMarkIcon />
          </ModalCloseButton>
        </ModalHeader>

        <ModalDescription>
          Adicione ou remova membros da organização no projeto {projectTitle || "selecionado"}.
        </ModalDescription>

        <ModalContent>
          {loading ? (
            <EmptyState>Carregando membros da organização...</EmptyState>
          ) : members.length > 0 ? (
            <Scroller orientation="vertical" gap={16}>
              {members.map((member) => {
                const projectMember = projectMembers.find((item) => item.userkey === member.id);
                const isAlreadyAdded = projectMemberIds.has(member.id);

                return (
                  <MemberRowCard key={member.id} $active={isAlreadyAdded}>
                    <MemberRowInfo>
                      <User
                        username={getAffiliationUsername(member)}
                        actorName={getAffiliationName(member)}
                        actorUsername={getAffiliationUsername(member)}
                      />
                    </MemberRowInfo>
                    <MemberActions>
                      <MemberActionButton
                        type="button"
                        onClick={() => {
                          if (isAlreadyAdded && projectMember) {
                            onRemoveMember(projectMember);
                            return;
                          }

                          onAddMember(member);
                        }}
                        disabled={pendingMemberId === member.id}
                        $danger={isAlreadyAdded}
                        $loading={pendingMemberId === member.id}
                        title={isAlreadyAdded ? "Remover do projeto" : "Adicionar ao projeto"}
                        aria-label={isAlreadyAdded
                          ? `Remover ${getAffiliationName(member)} do projeto`
                          : `Adicionar ${getAffiliationName(member)} ao projeto`}
                      >
                        {isAlreadyAdded ? (
                          <TrashIcon />
                        ) : (
                          <PlusIcon />
                        )}
                      </MemberActionButton>
                    </MemberActions>
                  </MemberRowCard>
                );
              })}
            </Scroller>
          ) : (
            <EmptyState>Nenhum membro encontrado na organização.</EmptyState>
          )}
        </ModalContent>
      </ModalDialog>
    </ModalOverlay>
  );
}

export function Members() {
  const navigate = useNavigate();
  const notifications = useToast();
  const { id } = useParams();
  const { org } = useOrganization();
  const { AffiliationService, MemberService, ProjectService } = useServices();

  const [project, setProject] = useState<ProjectDTO | null>(null);
  const [members, setMembers] = useState<ProjectMember[]>([]);
  const [affiliations, setAffiliations] = useState<AffiliationDTO[]>([]);
  const [loadingProject, setLoadingProject] = useState(true);
  const [loadingMembers, setLoadingMembers] = useState(true);
  const [loadingAffiliations, setLoadingAffiliations] = useState(true);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [pendingMemberId, setPendingMemberId] = useState<string | null>(null);

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
        const response = await MemberService.list(id);

        if (!active) return;

        setMembers(response.data);
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
  }, [MemberService, id, navigate, notifications]);

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

  const addProjectMember = async (member: AffiliationDTO) => {
    if (!id) return;

    if (projectMemberIds.has(member.id)) {
      notifications.info("Esse membro já está no projeto.");
      return;
    }

    setPendingMemberId(member.id);

    try {
      const response = await MemberService.create({
        project: id,
        user: member.id,
      });

      setMembers((current) => [...current, response.data]);
      notifications.info("Membro adicionado ao projeto.");
    } catch (error) {
      reportApiError(error, "Não foi possível adicionar o membro ao projeto.", notifications);
    } finally {
      setPendingMemberId(null);
    }
  };

  const removeProjectMember = async (member: ProjectMember) => {
    if (!id) return;

    setPendingMemberId(member.userkey);

    try {
      await MemberService.delete(member.id);

      setMembers((current) => current.filter((item) => item.id !== member.id));
      notifications.info("Membro removido do projeto.");
    } catch (error) {
      reportApiError(error, "Não foi possível remover o membro do projeto.", notifications);
    } finally {
      setPendingMemberId(null);
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
                const counts = getTaskCounts(member.tasks);
                const statsTasks = toStatsTasks(member.tasks);

                return (
                  <MemberCard key={member.id}>
                    <MemberStatTile
                      username={getProjectMemberUsername(member)}
                      name={getProjectMemberName(member)}
                      project={projectTitle}
                      started={counts.started}
                      review={counts.review}
                      done={counts.done}
                      overdue={counts.overdue}
                      tasks={statsTasks}
                    />
                  </MemberCard>
                );
              })}
            </Scroller>
          ) : (
            <EmptyState>Nenhum membro encontrado para este projeto.</EmptyState>
          )}
        </MembersArea>
      </Content>

      <MembersModal
        open={modalOpen}
        loading={loading}
        projectTitle={projectTitle}
        members={filteredOrganizationMembers}
        projectMembers={members}
        pendingMemberId={pendingMemberId}
        onClose={() => setModalOpen(false)}
        onAddMember={addProjectMember}
        onRemoveMember={removeProjectMember}
      />
    </Container>
  );
}
