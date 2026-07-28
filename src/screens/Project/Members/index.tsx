import { useEffect, useMemo, useState } from "react";
import { XMarkIcon } from "@heroicons/react/16/solid";
import { useNavigate, useParams } from "react-router-dom";
import { ContentHeader } from "../../../components/base/ContentHeader";
import { CreateButton } from "../../../components/buttons/CreateButton";
import { Text } from "../../../components/base/Text";
import { Scroller } from "../../../components/misc/Scroller";
import { SearchField } from "../../../components/textfields/SearchField";
import { MemberStatTile } from "../../../components/tiles/MemberStatTile";
import { useOrganization } from "../../../hooks/useOrganization";
import { useServices } from "../../../hooks/useServices";
import { useToast } from "@/hooks/useToast";
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
  MemberActions,
  MemberCard,
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
  notifications: ReturnType<typeof useToast>,
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

interface MemberModalProps {
  open: boolean;
  loading: boolean;
  projectTitle: string;
  members: AffiliationDTO[];
  projectMembers: ProjectMember[];
  addingMemberId: string | null;
  onClose: () => void;
  onAddMember: (member: AffiliationDTO) => void;
}

function MembersModal({
  open,
  loading,
  projectTitle,
  members,
  projectMembers,
  addingMemberId,
  onClose,
  onAddMember,
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
          <ModalTitle id="project-members-modal-title">Adicionar membros</ModalTitle>
          <ModalCloseButton type="button" onClick={onClose} aria-label="Fechar modal">
            <XMarkIcon />
          </ModalCloseButton>
        </ModalHeader>

        <ModalDescription>
          Selecione um membro da organização para adicioná-lo ao projeto {projectTitle || "selecionado"}.
        </ModalDescription>

        <ModalContent>
          {loading ? (
            <EmptyState>Carregando membros da organização...</EmptyState>
          ) : members.length > 0 ? (
            <Scroller className="vertical" gap={16}>
              {members.map((member) => {
                const projectMember = projectMembers.find((item) => item.userkey === member.id);
                const isAlreadyAdded = projectMemberIds.has(member.id);
                const counts = projectMember ? getTaskCounts(projectMember.tasks) : {
                  started: 0,
                  review: 0,
                  done: 0,
                  overdue: 0,
                };
                const statsTasks = projectMember ? toStatsTasks(projectMember.tasks) : [];

                return (
                  <MemberCard key={member.id}>
                    <MemberStatTile
                      username={getAffiliationUsername(member)}
                      name={getAffiliationName(member)}
                      project={projectTitle}
                      started={counts.started}
                      review={counts.review}
                      done={counts.done}
                      overdue={counts.overdue}
                      tasks={statsTasks}
                    />
                    <MemberActions>
                      <CreateButton
                        type="button"
                        onClick={() => onAddMember(member)}
                        disabled={isAlreadyAdded || addingMemberId === member.id}
                      >
                        <Text>
                          {isAlreadyAdded
                            ? "Já está no projeto"
                            : addingMemberId === member.id
                              ? "Adicionando..."
                              : "Adicionar ao projeto"}
                        </Text>
                      </CreateButton>
                    </MemberActions>
                  </MemberCard>
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
  const [addingMemberId, setAddingMemberId] = useState<string | null>(null);

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

  const searchValue = search.trim().toLowerCase();

  const filteredProjectMembers = useMemo(() => (
    members.filter((member) => {
      if (!searchValue) return true;

      const name = getProjectMemberName(member).toLowerCase();
      const username = getProjectMemberUsername(member).toLowerCase();
      return name.includes(searchValue) || username.includes(searchValue);
    })
  ), [members, searchValue]);

  const filteredOrganizationMembers = useMemo(() => (
    affiliations.filter((member) => {
      if (!searchValue) return true;

      const name = getAffiliationName(member).toLowerCase();
      const username = getAffiliationUsername(member).toLowerCase();
      return name.includes(searchValue) || username.includes(searchValue);
    })
  ), [affiliations, searchValue]);

  const addProjectMember = async (member: AffiliationDTO) => {
    if (!id) return;

    if (projectMemberIds.has(member.id)) {
      notifications.info("Esse membro já está no projeto.");
      return;
    }

    setAddingMemberId(member.id);

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
      setAddingMemberId(null);
    }
  };

  return (
    <Container className="tskr-proj-members">
      <ContentHeader title="Membros do projeto">
        <CreateButton type="button" onClick={() => setModalOpen(true)} disabled={loading}>
          <Text>Adicionar Membros</Text>
        </CreateButton>
      </ContentHeader>

      <Content id="team">
        <SearchField
          value={search}
          onChange={setSearch}
          placeholder="Pesquisar membro"
        />

        <MembersArea>
          {loading ? (
            <EmptyState>Carregando membros do projeto...</EmptyState>
          ) : filteredProjectMembers.length > 0 ? (
            <Scroller className="vertical" gap={16}>
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
        addingMemberId={addingMemberId}
        onClose={() => setModalOpen(false)}
        onAddMember={addProjectMember}
      />
    </Container>
  );
}
