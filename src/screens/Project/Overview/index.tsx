import { useEffect, useState } from "react";
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
import type { EventDTO } from "../../../service/types/events/event.dto";
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

  const { ProjectService, TaskService, EventService, CommentService } = useServices();

  const { user } = useAuth();

  const { id } = useParams();

  const [project, setProject] = useState<ProjectDTO | null>(null);
  const loadProject = async () => {
    try {
      if (!id) return;
      const response = await ProjectService.find(id);
      setProject(response.data);
    } catch (error) {
      const { errors } = error as ApiError;

      errors?.forEach(
        err => {
          notifications[err.level](err.message);
        }
      )

      navigate('..')
    }
  }

  const [tasks, setTasks] = useState<TaskDTO[]>([]);
  const loadTasks = async () => {
    try {
      if (!id) return;
      const response = await TaskService.list(id);
      setTasks(response.data);
    } catch (error) {
      const { errors } = error as ApiError;

      errors?.forEach(
        err => {
          notifications[err.level](err.message);
        }
      )

      navigate('../../')
    }
  }

  const [events, setEvents] = useState<EventDTO[]>([]);
  const loadEvents = async () => {
    try {
      if (!id) return;
      const response = await EventService.list({ projectkey: id });
      setEvents(response.data);
    } catch (error) {
      const { errors } = error as ApiError;

      errors?.forEach(
        err => {
          notifications[err.level](err.message);
        }
      )

      navigate('../../')
    }
  }

  const [comments, setComments] = useState<CommentDTO[]>([]);
  const loadComments = async () => {
    try {
      if (!id) return;
      const response = await CommentService.list({ projectkey: id });
      const data = response.data;

      setComments(data);
    } catch (error) {
      const { errors } = error as ApiError;

      errors?.forEach(
        err => {
          notifications[err.level](err.message);
        }
      )

      navigate('../../')
    }
  }
  const sendComment = async (message: string) => {
    try {
      if (!id || !user) return;
      const response = await CommentService.create({
        content: message,
        projectkey: id,
        ownerkey: user.username,
        date: new Date()
      });

      notifications.info(response.message);

      await loadComments();
    } catch (error) {
      const { errors } = error as ApiError;

      errors?.forEach(
        err => {
          notifications[err.level](err.message);
        }
      )

      navigate('../../')
    }
  }

  useEffect(() => {
    void loadProject();
    void loadTasks();
    void loadEvents();
    void loadComments();
  }, [id]);

  if (project === null) return <><Text>Carregando...</Text></>;

  return (
    <Container className="tskr-proj-overview">
      <Content className="tskr-proj-content">
        <ProjectInfo>
          <SectionTitle>{project?.title}</SectionTitle>
          <Subtitle>Iniciado em: --:-- Prazo: 00 de mm de aaaa</Subtitle>
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
                    content={comment.content}
                    date={DateTime.fromISO(comment.date, { zone: 'utc' })}
                    owner={comment.ownerkey}
                  />)
                }
              </Scroller>
              : <ItalicTitle>Sem comentários</ItalicTitle>
          }
          <MessageField send={sendComment} />
        </Comments>
      </Content>
      <ImportantDates events={events} projects={[project]} />
    </Container>
  )
}
