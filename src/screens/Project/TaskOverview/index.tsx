import { useCallback, useEffect, useState } from "react";
import { Text } from "../../../components/base/Text";
import { Actions, CloseButton, Container, Description, Dialog, EditForm, HeaderActions, Links, ModalHeader, Tag, Tags, TaskInfo, TaskLayout } from "./style";
import type { ApiError } from "../../../service/types/response/error";
import { useToast } from "../../../hooks/useToast";
import { useNavigate, useParams } from "react-router-dom";
import { SectionTitle } from "../../../components/base/SectionTitle";
import { Subtitle } from "../../../components/base/Subtitle";
import { EditButton } from "../../../components/buttons/EditBtn";
import { DeleteBtn } from "../../../components/buttons/DeleteBtn";
import { PriorityBadge } from "../../../maps/priority";
import { User } from "../../../components/misc/User";
import { Link } from "../../../components/cards/LinkCard/style";
import { useServices } from "../../../hooks/useServices";
import type { TaskWithOwnerDTO } from "../../../service/types/task/task.dto";
import { TextInput } from "../../../components/base/TextInput";
import { TextAreaInput } from "../../../components/base/TextAreaInput";
import { CalendarInput } from "../../../components/base/CalendarInput";
import { SelectInput } from "../../../components/base/SelectInput";
import { TaskPriority } from "../../../service/types/task/priority.dto";
import { TaskStage } from "../../../service/types/task/stage.dto";
import { CreateButton } from "../../../components/buttons/CreateButton";
import { Badge } from "../../../components/badge/Badge";
import Palette from "../../../assets/palette";
import { CloseCircle as CloseIcon } from "../../../components/icons/solar-icons";

const toLocalInput = (iso: string) => {
  const date = new Date(iso);
  const offset = date.getTimezoneOffset() * 60_000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 16);
};

const formatDateTime = (value: string | null) => (
  value ? new Date(value).toLocaleString("pt-BR") : "Não informado"
);

const TaskStageBadge = ({ stage }: { stage: TaskStage }) => {
  const badges: {
    [TaskStage.PENDING]: { label: string; color: string };
    [TaskStage.STARTED]: { label: string; color: string };
    [TaskStage.REVIEW]: { label: string; color: string };
    [TaskStage.DONE]: { label: string; color: string };
  } = {
    [TaskStage.PENDING]: { label: "PENDENTE", color: Palette.gray_25 },
    [TaskStage.STARTED]: { label: "INICIADA", color: Palette.blue_50 },
    [TaskStage.REVIEW]: { label: "EM REVISÃO", color: Palette.yellow_25 },
    [TaskStage.DONE]: { label: "CONCLUÍDA", color: Palette.green_25 },
  };
  const badge = badges[stage];

  return <Badge bg={badge.color}>{badge.label}</Badge>;
};

export function TaskOverview() {
  const navigate = useNavigate();
  const notifications = useToast();
  const { TaskService } = useServices();
  const { id: projectkey, code } = useParams();
  const [task, setTask] = useState<TaskWithOwnerDTO | null>(null);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState<TaskPriority>(TaskPriority.LOW);
  const [stage, setStage] = useState<TaskStage>(TaskStage.PENDING);

  const hydrateTask = useCallback((data: TaskWithOwnerDTO) => {
    setTask(data);
    setName(data.name);
    setDescription(data.description);
    setDeadline(toLocalInput(data.deadline));
    setPriority(data.priority);
    setStage(data.stage);
  }, []);

  const showError = useCallback((error: unknown, fallback: string) => {
    const apiError = error as ApiError;
    if (!apiError.errors?.length) return notifications.error(fallback);
    apiError.errors.forEach((item) => notifications[item.level](item.message));
  }, [notifications]);

  useEffect(() => {
    if (!projectkey || !code) return;
    let active = true;

    const load = async () => {
      try {
        let loadedTask: TaskWithOwnerDTO;

        try {
          loadedTask = (await TaskService.find(projectkey, code)).data;
        } catch {
          const listedTasks = await TaskService.list(projectkey, { code });
          const matchingTask = listedTasks.data.find((item) => item.code === code);
          if (!matchingTask) throw new Error("Tarefa não encontrada.");
          loadedTask = matchingTask;
        }

        if (!active) return;
        hydrateTask(loadedTask);
      } catch (error) {
        if (!active) return;
        showError(error, "Não foi possível carregar a tarefa.");
        navigate(`/home/project/${projectkey}/tasks`, { replace: true });
      }
    };

    void load();
    return () => { active = false; };
  }, [TaskService, code, hydrateTask, navigate, projectkey, showError]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") navigate(`/home/project/${projectkey}/tasks`);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [navigate, projectkey]);

  const closeModal = () => {
    navigate(`/home/project/${projectkey}/tasks`);
  };

  const editTask = async () => {
    if (!task || !projectkey || !code) return;
    if (!name.trim() || !description.trim() || !deadline) {
      notifications.validation("Preencha nome, descrição e prazo.");
      return;
    }

    const parsedDeadline = new Date(deadline);
    if (Number.isNaN(parsedDeadline.getTime())) {
      notifications.validation("Informe um prazo válido.");
      return;
    }

    try {
      setSaving(true);
      const response = await TaskService.update(projectkey, code, {
        name: name.trim(),
        description: description.trim(),
        deadline: parsedDeadline.toISOString(),
        priority,
        stage,
      });
      setTask((current) => current ? { ...current, ...response.data } : current);
      setEditing(false);
      notifications.info("Tarefa atualizada.");
    } catch (error) {
      showError(error, "Não foi possível atualizar a tarefa.");
    } finally {
      setSaving(false);
    }
  };

  const deleteTask = async () => {
    if (!task || !window.confirm(`Excluir a tarefa ${task.code}?`)) return;
    try {
      await TaskService.delete(task.id);
      notifications.info("Tarefa excluída.");
      navigate(`/home/project/${projectkey}/tasks`, { replace: true });
    } catch (error) {
      showError(error, "Não foi possível excluir a tarefa.");
    }
  };

  if (!task) {
    return (
      <Container onMouseDown={closeModal}>
        <Dialog role="dialog" aria-modal="true" aria-label="Detalhes da tarefa" onMouseDown={(event) => event.stopPropagation()}>
          <Text>Carregando tarefa...</Text>
        </Dialog>
      </Container>
    );
  }

  return (
    <Container className="tskr-task-overview" onMouseDown={closeModal}>
      <Dialog
        role="dialog"
        aria-modal="true"
        aria-labelledby="task-overview-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <ModalHeader>
          <div>
            <Links>
              <Link href="../../overview">{task.projectkey}</Link>
              <Subtitle>/</Subtitle>
              <Subtitle>{task.code}</Subtitle>
            </Links>
            <SectionTitle id="task-overview-title">{task.name}</SectionTitle>
          </div>
          <HeaderActions>
            <EditButton type="button" onClick={() => setEditing(true)} />
            <DeleteBtn label="Excluir tarefa" onClick={() => void deleteTask()} />
            <CloseButton type="button" onClick={closeModal} aria-label="Fechar detalhes da tarefa">
              <CloseIcon width={22} />
            </CloseButton>
          </HeaderActions>
        </ModalHeader>
        <TaskLayout>
          <Description className="tskr-task-description">
            <Subtitle>Descrição</Subtitle>
            {editing
              ? <EditForm>
                <TextInput label="Nome" value={name} onChange={setName} />
                <TextAreaInput label="Descrição" value={description} onChange={setDescription} />
                <CalendarInput label="Prazo" value={deadline} onChange={setDeadline} />
                <SelectInput label="Prioridade" type={TaskPriority} value={priority} onChange={(value) => setPriority(value as TaskPriority)} />
                <SelectInput label="Estágio" type={TaskStage} value={stage} onChange={(value) => setStage(value as TaskStage)} />
                <Actions>
                  <CreateButton type="button" disabled={saving} onClick={() => void editTask()}>
                    <Text>{saving ? "Salvando..." : "Salvar alterações"}</Text>
                  </CreateButton>
                  <DeleteBtn label="Cancelar edição" onClick={() => {
                    hydrateTask(task);
                    setEditing(false);
                  }} />
                </Actions>
              </EditForm>
              : <Text>{task.description}</Text>}
          </Description>
          <TaskInfo aria-label="Informações da tarefa">
            <Subtitle>Informações da tarefa</Subtitle>
            <TaskTags task={task} />
          </TaskInfo>
        </TaskLayout>
      </Dialog>
    </Container>
  );
}

const TaskTag = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <Tag className="tskr-task-tag"><Subtitle>{label}</Subtitle>{children}</Tag>
);

const TaskTags = ({ task }: { task: TaskWithOwnerDTO }) => (
  <Tags className="tskr-task-tag">
    <TaskTag label="Código"><Text>{task.code}</Text></TaskTag>
    <TaskTag label="Prioridade">{PriorityBadge[task.priority]}</TaskTag>
    <TaskTag label="Responsável"><User affiliationId={task.owner.userkey} /></TaskTag>
    <TaskTag label="Prazo"><Text>{formatDateTime(task.deadline)}</Text></TaskTag>
    <TaskTag label="Status"><TaskStageBadge stage={task.stage} /></TaskTag>
    <TaskTag label="Iniciada em"><Text>{formatDateTime(task.started_at)}</Text></TaskTag>
    <TaskTag label="Concluída em"><Text>{formatDateTime(task.done_at)}</Text></TaskTag>
    <TaskTag label="Situação do prazo"><Text>{task.delayed ? "Atrasada" : "Dentro do prazo"}</Text></TaskTag>
    <TaskTag label="Criada em"><Text>{formatDateTime(task.created_at)}</Text></TaskTag>
    <TaskTag label="Última atualização"><Text>{formatDateTime(task.updated_at)}</Text></TaskTag>
  </Tags>
);
