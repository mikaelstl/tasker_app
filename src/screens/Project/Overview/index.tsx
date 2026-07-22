import { useCallback, useEffect, useState } from "react";
import { Text } from "../../../components/base/Text";
import { Title } from "../../../components/base/Title";
import { CommentCard } from "../../../components/cards/CommentCard";
import { ImportantDates } from "../../../components/ImportantDates";
import { Scroller } from "../../../components/misc/Scroller";
import { Comments, Container, Content, Description, ProjectInfo } from "./style";
import type { ProjectDTO } from "../../../service/types/project/project.dto";
import type { ApiError } from "../../../service/types/response/error";
import { useToast } from "@/hooks/useToast";
import { useNavigate, useParams } from "react-router-dom";
import { DateTime } from "luxon";
import type { TaskDTO } from "../../../service/types/task/task.dto";
import { ItalicTitle } from "../../../components/base/ItalicTitle";
import { ProjectStageBadge } from "../../../maps/project-stage";
import { MessageField } from "../../../components/textfields/MessageField";
import { useAuth } from "../../../hooks/useAuth";
import type { CommentDTO } from "../../../service/types/comment/comment.dto";
import { SectionTitle } from "../../../components/base/SectionTitle";
import { Subtitle } from "../../../components/base/Subtitle";
import { TaskCategoryAccordion } from "../../../components/accordions/TaskCategoryAccordion";
import { EditButton } from "../../../components/buttons/EditBtn";
import { useServices } from "../../../hooks/useServices";

export function Overview() {
  const navigate = useNavigate();
  const notifications = useToast();

  const { ProjectService, TaskService, CommentService } = useServices();

  const { user } = useAuth();

  const { id } = useParams();

  const [project, setProject] = useState<ProjectDTO | null>(null);
  const [tasks, setTasks] = useState<TaskDTO[]>([]);
  const [comments, setComments] = useState<CommentDTO[]>([]);
  const [busyCommentId, setBusyCommentId] = useState<string | null>(null);
  const [inspectedCommentId, setInspectedCommentId] = useState<string | null>(null);
  const showError = useCallback((error: unknown, fallback: string) => {
    const apiError = error as ApiError;
    if (!apiError.errors?.length) {
      notifications.error(fallback);
      return;
    }
    apiError.errors.forEach((item) => notifications[item.level](item.message));
  }, [notifications]);

  const loadComments = useCallback(async () => {
    try {
      if (!id) return;
      const response = await CommentService.list({ projectkey: id });
      setComments(response.data);
    } catch (error) {
      showError(error, "Não foi possível carregar a atividade do projeto.");
    }
  }, [CommentService, id, showError]);

  const sendComment = async (message: string) => {
    try {
      if (!id || !user) return;
      const response = await CommentService.create({
        content: message,
        projectkey: id,
        ownerkey: user.username,
        date: new Date().toISOString()
      });

      notifications.info(response.message);

      await loadComments();
    } catch (error) {
      showError(error, "Não foi possível criar o comentário.");
      throw error;
    }
  }

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

  useEffect(() => {
    if (!id) return;
    let active = true;

    void ProjectService.find(id).then(({ data }) => {
      if (active) setProject(data);
    }).catch((error) => {
      if (!active) return;
      showError(error, "Não foi possível carregar o projeto.");
      navigate("/home/projects", { replace: true });
    });

    void TaskService.list(id).then(({ data }) => {
      if (active) setTasks(data);
    }).catch((error) => {
      if (active) showError(error, "Não foi possível carregar as tarefas do projeto.");
    });

    void loadComments();
    return () => { active = false; };
  }, [ProjectService, TaskService, id, loadComments, navigate, showError]);

  if (project === null) return <><Text>Carregando...</Text></>;

  return (
    <Container className="tskr-proj-overview">
      <Content className="tskr-proj-content">
        <ProjectInfo>
          <SectionTitle>{project?.title}</SectionTitle>
          <Subtitle>
            Iniciado em: {project.started_at ? new Date(project.started_at).toLocaleString("pt-BR") : "não iniciado"}
            {" · "}Prazo: {new Date(project.deadline).toLocaleString("pt-BR")}
          </Subtitle>
          {ProjectStageBadge[project.stage]}
          <EditButton type="button" onClick={() => navigate('../edit')} />
          <Description>
            <Subtitle>Descrição</Subtitle>
            <Text>{project.description}</Text>
          </Description>
        </ProjectInfo>
        <TaskCategoryAccordion
          visible
          title="Mais importantes"
          tasks={tasks}
        />
        <Comments className="tskr-overview-comments">
          <Title>Atividade</Title>
          {
            comments.length !== 0
              ? <Scroller className="vertical">
                {
                  comments.map((comment) => <CommentCard
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
                  />)
                }
              </Scroller>
              : <ItalicTitle>Sem comentários</ItalicTitle>
          }
          <MessageField send={sendComment} />
        </Comments>
      </Content>
      <ImportantDates events={[]} projects={[project]} />
    </Container>
  )
}
