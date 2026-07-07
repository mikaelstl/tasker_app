import { useEffect, useState } from "react";
import { Text } from "../../../components/base/Text";
import { Title } from "../../../components/base/Title";
import { CommentCard } from "../../../components/cards/CommentCard";
import { ImportantDates } from "../../../components/ImportantDates";
import { Scroller } from "../../../components/misc/Scroller";
import { useServices } from "../../../hooks/useServices";
import { Comments, Container, Content, Description, ProjectInfo } from "./style";
import { type ProjectDTO } from "../../../service/types/project/project.dto";
import type { ApiError } from "../../../service/types/response/error";
import { Toasts } from "../../../maps/toasts";
import { useNavigate, useParams } from "react-router-dom";
import { DateTime } from "luxon";
import type { TaskDTO } from "../../../service/types/task/task.dto";
import { ItalicTitle } from "../../../components/base/ItalicTitle";
import { ProgressBadge } from "../../../maps/progress";
import type { EventDTO } from "../../../service/types/events/event.dto";
import { MessageField } from "../../../components/textfields/MessageField";
import { useAuth } from "../../../hooks/useAuth";
import type { CommentDTO } from "../../../service/types/comment/comment.dto";
import { SectionTitle } from "../../../components/base/SectionTitle";
import { Subtitle } from "../../../components/base/Subtitle";
import { TaskCategoryAccordion } from "../../../components/accordions/TaskCategoryAccordion";
import { EditButton } from "../../../components/buttons/EditBtn";

export function Overview() {
  const navigate = useNavigate();

  const { CommentService, EventService, ProjectService, TaskService } = useServices();

  const { user } = useAuth();

  const { id } = useParams();
  if (!id || id === '') {
    navigate('..');
    return;
  }

  const [project, setProject] = useState<ProjectDTO | null>(null);
  const loadProject = async () => {
    try {
      const response = await ProjectService.find(id);

      const data: ProjectDTO = response.data;

      setProject(data);
    } catch (error) {
      const { errors } = error as ApiError;

      errors?.forEach(
        err => {
          const notify = Toasts[err.level];
          notify(err.message);
        }
      )

      navigate('..')
    }
  }

  const [tasks, setTasks] = useState<TaskDTO[]>([]);
  const loadTasks = async () => {
    try {
      const response = await TaskService.list(id);

      console.log(response);

      const data: TaskDTO[] = response.data;

      setTasks(data);
    } catch (error) {
      const { errors } = error as ApiError;

      errors?.forEach(
        err => {
          const notify = Toasts[err.level];
          notify(err.message);
        }
      )

      navigate('../../')
    }
  }

  const [events, setEvents] = useState<EventDTO[]>([]);
  const loadEvents = async () => {
    try {
      const response = await EventService.list({
        projectkey: id
      })

      console.log(response);

      const data: EventDTO[] = response.data;

      setEvents(data);
    } catch (error) {
      const { errors } = error as ApiError;

      errors?.forEach(
        err => {
          const notify = Toasts[err.level];
          notify(err.message);
        }
      )

      navigate('../../')
    }
  }

  const [comments, setComments] = useState<CommentDTO[]>([]);
  const loadComments = async () => {
    try {
      const response = await CommentService.list({
        projectkey: id,
      });

      const data: CommentDTO[] = response.data;

      setComments(data);
    } catch (error) {
      const { errors } = error as ApiError;

      errors?.forEach(
        err => {
          const notify = Toasts[err.level];
          notify(err.message);
        }
      )

      navigate('../../')
    }
  }
  const sendComment = async (message: string) => {
    try {
      const response = await CommentService.create({
        content: message,
        projectkey: id!,
        ownerkey: user!.username,
        date: new Date()
      });

      Toasts['info'](response.message);

      loadComments();
    } catch (error) {
      const { errors } = error as ApiError;

      errors?.forEach(
        err => {
          const notify = Toasts[err.level];
          notify(err.message);
        }
      )

      navigate('../../')
    }
  }

  useEffect(() => {
    loadComments();
    loadProject();
    loadTasks();
    loadEvents();
  }, [])

  if (project === null) return <><Text>Carregando...</Text></>;

  return (
    <Container className="tskr-proj-overview">
      <Content className="tskr-proj-content">
        <ProjectInfo>
          <SectionTitle>{project?.title}</SectionTitle>
          <Subtitle>Stated at: --:-- Due date: mm 00, yyyy</Subtitle>
          {ProgressBadge[project.progress]}
          <EditButton type="button" onClick={() => navigate('../edit')} />
          <Description>
            <Subtitle>Description</Subtitle>
            <Text>{project.description}</Text>
          </Description>
        </ProjectInfo>
        <TaskCategoryAccordion
          visible
          title="Most Important"
          tasks={tasks}
        />
        <Comments className="tskr-overview-comments">
          <Title>Activity</Title>
          {
            comments.length !== 0
              ? <Scroller orientation="vertical">
                {
                  comments.map((comment) => <CommentCard
                    content={comment.content}
                    date={DateTime.fromISO(comment.date, { zone: 'utc' })}
                    owner={comment.ownerkey}
                  />)
                }
              </Scroller>
              : <ItalicTitle>Without comments</ItalicTitle>
          }
          <MessageField send={sendComment} />
        </Comments>
      </Content>
      <ImportantDates events={events} />
    </Container>
  )
}
