import { useCallback, useEffect, useState } from "react";
import { DateBadge } from "../../../components/badge/DateBadge";
import { Text } from "../../../components/base/Text";
import { Title } from "../../../components/base/Title";
import { CommentCard } from "../../../components/cards/CommentCard";
import { Scroller } from "../../../components/misc/Scroller";
import { Actions, Comments, Container, Description, EditForm, Links, Tag, Tags, TaskInfo } from "./style";
import type { ApiError } from "../../../service/types/response/error";
import { useToast } from "../../../hooks/useToast";
import { useNavigate, useParams } from "react-router-dom";
import { DateTime } from "luxon";
import { ItalicTitle } from "../../../components/base/ItalicTitle";
import { MessageField } from "../../../components/textfields/MessageField";
import { useAuth } from "../../../hooks/useAuth";
import type { CommentDTO } from "../../../service/types/comment/comment.dto";
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

const toLocalInput = (iso: string) => {
  const date = new Date(iso);
  const offset = date.getTimezoneOffset() * 60_000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 16);
};

export function TaskOverview() {
  const navigate = useNavigate();
  const notifications = useToast();
  const { CommentService, TaskService } = useServices();
  const { user } = useAuth();
  const { id: projectkey, code } = useParams();
  const [task, setTask] = useState<TaskWithOwnerDTO | null>(null);
  const [comments, setComments] = useState<CommentDTO[]>([]);
  const [busyCommentId, setBusyCommentId] = useState<string | null>(null);
  const [inspectedCommentId, setInspectedCommentId] = useState<string | null>(null);
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

  const loadComments = useCallback(async () => {
    if (!projectkey) return;
    const response = await CommentService.list({ projectkey });
    setComments(response.data);
  }, [CommentService, projectkey]);

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
    void loadComments().catch((error) => {
      if (active) showError(error, "Não foi possível carregar a atividade do projeto.");
    });
    return () => { active = false; };
  }, [TaskService, code, hydrateTask, loadComments, navigate, projectkey, showError]);

  const sendComment = async (message: string) => {
    if (!projectkey || !user) return;
    try {
      const response = await CommentService.create({
        content: message,
        projectkey,
        ownerkey: user.username,
        date: new Date().toISOString(),
      });
      notifications.info(response.message);
      await loadComments();
    } catch (error) {
      showError(error, "Não foi possível criar o comentário.");
      throw error;
    }
  };

  const inspectComment = async (commentId: string) => {
    setBusyCommentId(commentId);
    try {
      const response = await CommentService.find(commentId);
      setComments((current) => current.map((comment) => (
        comment.id === commentId ? response.data : comment
      )));
      setInspectedCommentId(commentId);
    } catch (error) {
      showError(error, "Não foi possível consultar o comentário.");
    } finally {
      setBusyCommentId(null);
    }
  };

  const deleteComment = async (comment: CommentDTO) => {
    if (!window.confirm("Excluir este comentário?")) return;
    setBusyCommentId(comment.id);
    try {
      await CommentService.delete(comment.id);
      setComments((current) => current.filter((item) => item.id !== comment.id));
      if (inspectedCommentId === comment.id) setInspectedCommentId(null);
      notifications.info("Comentário excluído.");
    } catch (error) {
      showError(error, "Não foi possível excluir o comentário.");
    } finally {
      setBusyCommentId(null);
    }
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

  if (!task) return <Container><Text>Carregando tarefa...</Text></Container>;

  return (
    <Container className="tskr-task-overview">
      <TaskInfo>
        <Links>
          <Link href="../../overview">{task.projectkey}</Link>
          <Subtitle>/</Subtitle>
          <Subtitle>{task.code}</Subtitle>
        </Links>
        <SectionTitle>{task.name}</SectionTitle>
        <DateBadge date={DateTime.fromISO(task.deadline)} />
        <Text>{task.stage}</Text>
        <Actions>
          <EditButton type="button" onClick={() => setEditing(true)} />
          <DeleteBtn label="Excluir tarefa" onClick={() => void deleteTask()} />
        </Actions>
        <TaskTags task={task} />
      </TaskInfo>
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
      <Comments className="tskr-task-activity">
        <Title>Atividade do projeto</Title>
        {comments.length !== 0 ? (
          <Scroller className="vertical">
            {comments.map((comment) => <CommentCard
              key={comment.id}
              id={comment.id}
              content={comment.content}
              date={DateTime.fromISO(comment.date, { zone: 'utc' })}
              owner={comment.ownerkey}
              createdAt={comment.created_at}
              updatedAt={comment.updated_at}
              expanded={inspectedCommentId === comment.id}
              disabled={busyCommentId === comment.id}
              onInspect={() => void inspectComment(comment.id)}
              onDelete={() => void deleteComment(comment)}
            />)}
          </Scroller>
        ) : <ItalicTitle>Sem comentários</ItalicTitle>}
        <MessageField send={sendComment} />
      </Comments>
    </Container>
  );
}

const TaskTag = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <Tag className="tskr-task-tag"><Subtitle>{label}</Subtitle>{children}</Tag>
);

const TaskTags = ({ task }: { task: TaskWithOwnerDTO }) => (
  <Tags className="tskr-task-tag">
    <TaskTag label="Prioridade">{PriorityBadge[task.priority]}</TaskTag>
    <TaskTag label="Responsável"><User username={task.ownerkey} /></TaskTag>
    <TaskTag label="Criada em"><Text>{new Date(task.created_at).toLocaleDateString("pt-BR")}</Text></TaskTag>
    <TaskTag label="Última atualização"><Text>{new Date(task.updated_at).toLocaleDateString("pt-BR")}</Text></TaskTag>
  </Tags>
);
