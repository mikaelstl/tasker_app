import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CalendarInput } from "../../../components/base/CalendarInput";
import { ContentHeader } from "../../../components/base/ContentHeader";
import { Text } from "../../../components/base/Text";
import { TextAreaInput } from "../../../components/base/TextAreaInput";
import { SelectInput } from "../../../components/base/SelectInput";
import { CreateButton } from "../../../components/buttons/CreateButton";
import { DeleteBtn } from "../../../components/buttons/DeleteBtn";
import { User } from "../../../components/misc/User";
import { ProjectMemberCard } from "@/components/cards/ProjectMemberCard";
import { DeleteWidget } from "../../../widgets/cards/DeleteWidget";
import { useServices } from "../../../hooks/useServices";
import { useToast } from "../../../hooks/useToast";
import type { AffiliationDTO } from "../../../service/types/affiliation/affiliation.dto";
import type { ApiError } from "../../../service/types/response/error";
import { OrgRole } from "../../../utils/enums/OrgRole";
import type { ProjectWithMembersDTO } from "../../../service/types/project/project.dto";
import { ProjectStage } from "../../../service/types/project/project.dto";
import { TextInput } from "@/components/base/TextInput";
import {
  Container,
  Content,
  FieldsGrid,
  FormGrid,
  FullWidth,
  InfoLabel,
  Layout,
  MainColumn,
  ManagerCurrent,
  ManagerField,
  ManagerSelect,
  MembersCount,
  MembersEmpty,
  MembersList,
  MembersMeta,
  Panel,
  PanelDescription,
  PanelHeader,
  PanelTitle,
  SelectBlock,
  SideColumn,
} from "./style";

const toLocalInput = (iso: string) => {
  const date = new Date(iso);
  const offset = date.getTimezoneOffset() * 60_000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 16);
};

const formatAffiliationName = (member: AffiliationDTO) => (
  member.user?.name ?? member.user?.username ?? member.userkey
);

const formatAffiliationUsername = (member: AffiliationDTO) => (
  member.user?.username ?? member.userkey
);

export function EditProject() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { ProjectService, AffiliationService, MemberService } = useServices();
  const notifications = useToast();
  const [project, setProject] = useState<ProjectWithMembersDTO | null>(null);
  const [loadingProject, setLoadingProject] = useState(true);
  const [projectError, setProjectError] = useState<string | null>(null);
  const [affiliations, setAffiliations] = useState<AffiliationDTO[]>([]);
  const [loadingAffiliations, setLoadingAffiliations] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [stage, setStage] = useState<ProjectStage>(ProjectStage.PENDING);
  const [managerkey, setManagerkey] = useState("");
  const [saving, setSaving] = useState(false);
  const [busyMemberId, setBusyMemberId] = useState<string | null>(null);

  const showError = useCallback((error: unknown, fallback: string) => {
    const apiError = error as ApiError;
    if (!apiError.errors?.length) {
      notifications.error(fallback);
      return;
    }
    apiError.errors.forEach((item) => notifications[item.level](item.message));
  }, [notifications]);

  useEffect(() => {
    let active = true;

    if (!id) {
      setProject(null);
      setProjectError("Projeto não encontrado.");
      setLoadingProject(false);
      return;
    }

    setLoadingProject(true);
    setProjectError(null);

    void ProjectService.find(id)
      .then(({ data }) => {
        if (!active) return;

        setProject(data);
        setTitle(data.title);
        setDescription(data.description);
        setDeadline(toLocalInput(data.deadline));
        setStage(data.stage);
        setManagerkey(data.managerkey ?? "");
      })
      .catch((error) => {
        if (!active) return;

        setProject(null);
        setProjectError("Não foi possível carregar o projeto.");
        showError(error, "Não foi possível carregar o projeto.");
      })
      .finally(() => {
        if (active) {
          setLoadingProject(false);
        }
      });

    return () => {
      active = false;
    };
  }, [ProjectService, id, showError]);

  useEffect(() => {
    let active = true;

    if (!project?.orgkey) {
      setAffiliations([]);
      setLoadingAffiliations(false);
      return;
    }

    setLoadingAffiliations(true);

    void AffiliationService.listByOrganization(project.orgkey)
      .then(({ data }) => {
        if (!active) return;
        setAffiliations(data);
      })
      .catch((error) => {
        if (!active) return;
        setAffiliations([]);
        showError(error, "Não foi possível carregar os participantes da organização.");
      })
      .finally(() => {
        if (active) {
          setLoadingAffiliations(false);
        }
      });

    return () => {
      active = false;
    };
  }, [AffiliationService, project?.orgkey, showError]);

  const managerOptions = useMemo(() => (
    affiliations
      .filter((member) => member.role === OrgRole.MANAGER)
      .slice()
      .sort((left, right) => formatAffiliationName(left).localeCompare(formatAffiliationName(right), "pt-BR"))
  ), [affiliations]);

  const currentManager = useMemo(() => (
    affiliations.find((member) => member.id === managerkey) ?? null
  ), [affiliations, managerkey]);

  const sortedAffiliations = useMemo(() => (
    affiliations
      .slice()
      .sort((left, right) => formatAffiliationName(left).localeCompare(formatAffiliationName(right), "pt-BR"))
  ), [affiliations]);

  const projectMembers = project?.members ?? [];
  const projectMemberIds = useMemo(() => (
    new Set(projectMembers.map((member) => member.userkey))
  ), [projectMembers]);

  const addProjectMember = useCallback(async (memberkey: string) => {
    if (!id || projectMemberIds.has(memberkey)) {
      if (projectMemberIds.has(memberkey)) {
        notifications.info("Esse participante já está no projeto.");
      }
      return;
    }

    setBusyMemberId(memberkey);
    try {
      const response = await MemberService.create({
        project: id,
        user: memberkey,
      });

      setProject((current) => (
        current
          ? { ...current, members: [...current.members, response.data] }
          : current
      ));
      notifications.info("Participante adicionado ao projeto.");
    } catch (error) {
      showError(error, "Não foi possível adicionar o participante ao projeto.");
    } finally {
      setBusyMemberId(null);
    }
  }, [MemberService, id, notifications, projectMemberIds, showError]);

  const removeProjectMember = useCallback(async (memberId: string) => {
    if (!id) return;

    setBusyMemberId(memberId);
    try {
      await MemberService.delete(memberId);

      setProject((current) => (
        current
          ? { ...current, members: current.members.filter((member) => member.id !== memberId) }
          : current
      ));
      notifications.info("Participante removido do projeto.");
    } catch (error) {
      showError(error, "Não foi possível remover o participante do projeto.");
    } finally {
      setBusyMemberId(null);
    }
  }, [MemberService, id, notifications, showError]);

  const save = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!id || !title.trim() || !description.trim() || !deadline) {
      notifications.warning("Preencha nome, descrição e prazo.");
      return;
    }

    if (managerkey && !managerOptions.some((member) => member.id === managerkey)) {
      notifications.warning("Escolha um gestor válido da organização ou deixe o projeto sem gestor.");
      return;
    }

    const parsedDeadline = new Date(deadline);
    if (Number.isNaN(parsedDeadline.getTime())) {
      notifications.validation("Informe um prazo válido.");
      return;
    }

    setSaving(true);
    try {
      await ProjectService.update(id, {
        title: title.trim(),
        description: description.trim(),
        deadline: parsedDeadline.toISOString(),
        stage,
        managerkey: managerkey || null,
      });
      notifications.info("Projeto atualizado.");
      navigate("../overview");
    } catch (error) {
      showError(error, "Não foi possível atualizar o projeto.");
    } finally {
      setSaving(false);
    }
  };

  const remove = async () => {
    if (!id || !window.confirm("Excluir este projeto permanentemente?")) return;

    try {
      await ProjectService.delete(id);
      notifications.info("Projeto excluído.");
      navigate("/home/projects");
    } catch (error) {
      showError(error, "Não foi possível excluir o projeto.");
    }
  };

  if (loadingProject) {
    return (
      <Container className="tskr-edit-project-page">
        <ContentHeader title="Editar projeto" />
        <Content>
          <Panel>
            <Text>Carregando projeto...</Text>
          </Panel>
        </Content>
      </Container>
    );
  }

  if (!project) {
    return (
      <Container className="tskr-edit-project-page">
        <ContentHeader title="Editar projeto" />
        <Content>
          <Panel>
            <PanelHeader>
              <PanelTitle>Projeto indisponível</PanelTitle>
              <PanelDescription>
                {projectError ?? "Não foi possível encontrar os dados deste projeto."}
              </PanelDescription>
            </PanelHeader>
          </Panel>
        </Content>
      </Container>
    );
  }

  return (
    <Container className="tskr-edit-project-page">
      <ContentHeader title="Editar projeto">
        <DeleteBtn
          label="Cancelar"
          onClick={() => navigate("../overview")}
          disabled={saving}
        />
        <CreateButton type="submit" form="edit-project-form" disabled={saving}>
          <Text>{saving ? "Salvando..." : "Salvar alterações"}</Text>
        </CreateButton>
      </ContentHeader>

      <Content>
        <Layout>
          <MainColumn>
            <FormGrid id="edit-project-form" onSubmit={(event) => void save(event)}>
              <FieldsGrid>
                <FullWidth>
                  <TextInput label="Nome do projeto" value={title} onChange={setTitle} />
                </FullWidth>
                <FullWidth>
                  <TextAreaInput label="Descrição" value={description} onChange={setDescription} />
                </FullWidth>
                <CalendarInput label="Prazo" value={deadline} onChange={setDeadline} />
              </FieldsGrid>
            </FormGrid>

            <MembersList>
              <MembersMeta>
                <Text>Participantes</Text>
                <MembersCount>{projectMembers.length} vinculado(s)</MembersCount>
              </MembersMeta>

              {loadingAffiliations ? (
                <MembersEmpty>Carregando participantes...</MembersEmpty>
              ) : sortedAffiliations.length > 0 ? (
                <>
                  {sortedAffiliations.map((member) => {
                    const projectMember = projectMembers.find((item) => item.userkey === member.id);
                    const isAlreadyAdded = projectMemberIds.has(member.id);

                    return (
                      <ProjectMemberCard
                        key={member.id}
                        id={member.id}
                        affiliationId={member.id}
                        memberId={projectMember?.id}
                        actorName={formatAffiliationName(member)}
                        isAlreadyAdded={isAlreadyAdded}
                        disabled={busyMemberId === member.id || busyMemberId === projectMember?.id}
                        onAdd={addProjectMember}
                        onRemove={removeProjectMember}
                      />
                    );
                  })}
                </>
              ) : (
                <MembersEmpty>Este projeto não possui participantes disponíveis na organização.</MembersEmpty>
              )}
            </MembersList>
            
          </MainColumn>

          <SideColumn>
            <Panel>
              <SelectBlock>
                <SelectInput
                  label="Estágio do projeto"
                  type={ProjectStage}
                  value={stage}
                  onChange={(value) => setStage(value as ProjectStage)}
                />
              </SelectBlock>

              <ManagerField>
                <InfoLabel>Gestor do projeto</InfoLabel>
                <ManagerCurrent>
                  {currentManager ? (
                    <User
                      affiliationId={currentManager.id}
                      username={formatAffiliationUsername(currentManager)}
                      actorName={formatAffiliationName(currentManager)}
                      actorUsername={formatAffiliationUsername(currentManager)}
                    />
                  ) : (
                    <Text>Sem gestor definido</Text>
                  )}
                </ManagerCurrent>

                <ManagerSelect
                  value={managerkey}
                  onChange={(event) => setManagerkey(event.target.value)}
                  disabled={loadingAffiliations}
                >
                  <option value="">Sem gestor</option>
                  {managerOptions.map((member) => (
                    <option key={member.id} value={member.id}>
                      {formatAffiliationName(member)} (@{formatAffiliationUsername(member)})
                    </option>
                  ))}
                </ManagerSelect>
              </ManagerField>
            </Panel>

            <Panel>
              <PanelHeader>
                <PanelTitle>Zona de risco</PanelTitle>
                <PanelDescription>
                  A exclusão remove o projeto e todo o conteúdo vinculado.
                </PanelDescription>
              </PanelHeader>

              <DeleteWidget onDelete={() => void remove()} />
            </Panel>
          </SideColumn>
        </Layout>
      </Content>
    </Container>
  );
}
