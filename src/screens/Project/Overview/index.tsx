import { useCallback, useEffect, useState } from "react";
import { Text } from "../../../components/base/Text";
import { Title } from "../../../components/base/Title";
import { CommentCard } from "../../../components/cards/CommentCard";
import { ImportantDates } from "../../../components/ImportantDates";
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
import type { EventDTO } from "../../../service/types/events/event.dto";

export function Overview() {
  const navigate = useNavigate();
  const notifications = useToast();

  const { ProjectService, TaskService, CommentService, EventService } = useServices();

  const { user } = useAuth();

  const { id } = useParams();

  const [project, setProject] = useState<ProjectDTO | null>(null);
  const [tasks, setTasks] = useState<TaskDTO[]>([]);
  const [comments, setComments] = useState<CommentDTO[]>([]);
  const [events, setEvents] = useState<EventDTO[]>([]);
  
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
      console.log(error);
      
      showError(error, "Não foi possível carregar a atividade do projeto.");
    }
  }, [CommentService, id, showError]);

  const loadEvents = useCallback(async () => {
    try {
      if (!id) return;
      const response = await EventService.list({ projectkey: id });
      setEvents(response.data);
    } catch (error) {
      showError(error, "Não foi possível carregar os eventos do projeto.");
    }
  }, [EventService, id, showError]);

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

  // const deleteComment = async (comment: CommentDTO) => {
  //   if (!window.confirm("Excluir este comentário?")) return;
    
  //   try {
  //     await CommentService.delete(comment.id);
  //     setComments((current) => current.filter((item) => item.id !== comment.id));
  //     if (inspectedCommentId === comment.id) setInspectedCommentId(null);
  //     notifications.info("Comentário excluído.");
  //   } catch (error) {
  //     showError(error, "Não foi possível excluir o comentário.");
  //   } finally {
  //     setBusyCommentId(null);
  //   }
  // };

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
    void loadEvents();
    return () => { active = false; };
  }, [ProjectService, TaskService, id, loadComments, loadEvents, navigate, showError]);

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
          {ProjectStageBadge(project.stage)}
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
              ? <>{
                comments.map((comment) => <CommentCard
                  key={comment.id}
                  id={comment.id}
                  content={comment.content}
                  date={DateTime.fromISO(comment.date, { zone: 'utc' })}
                  owner={comment.ownerkey}
                  createdAt={comment.created_at}
                  updatedAt={comment.updated_at}
                />)
              }</>
              : <ItalicTitle>Sem comentários</ItalicTitle>
          }
          <MessageField send={sendComment} />
        </Comments>
      </Content>
      <ImportantDates events={events} projects={[project]} />
    </Container>
  )
}
