import { useEffect, useState } from "react";
import { Text } from "../../../components/base/Text";
import { Title } from "../../../components/base/Title";
import { CommentCard } from "../../../components/cards/CommentCard";
import { ImportantDates } from "../../../components/ImportantDates";
import { Scroller } from "../../../components/misc/Scroller";
import { useApi } from "../../../hooks/useApi";
import { Comments, Container, Content, Description, ProjectInfo } from "./style";
import { ProjectProgress, type ProjectDTO } from "../../../service/types/project/project.dto";
import type { ApiError } from "../../../service/types/response/error";
import { Toasts } from "../../../maps/toasts";
import { useNavigate, useParams } from "react-router-dom";
import { DateTime } from "luxon";
import type { TaskDTO } from "../../../service/types/task/task.dto";
import { ItalicTitle } from "../../../components/base/ItalicTitle";
import { ProgressBadge } from "../../../maps/progress";
// import type { TaskQueryDTO } from "../../../service/types/task/query.dto";
import type { EventDTO } from "../../../service/types/events/event.dto";
import { MessageField } from "../../../components/textfields/MessageField";
import type { CreateCommentDTO } from "../../../service/types/comment/comment.create.dto";
import { useAuth } from "../../../hooks/useAuth";
import type { CommentDTO } from "../../../service/types/comment/comment.dto";
import type { ApiResponse } from "../../../service/types/response/response";
import { SectionTitle } from "../../../components/base/SectionTitle";
import { Subtitle } from "../../../components/base/Subtitle";
import { TaskCategoryAccordion } from "../../../components/accordions/TaskCategoryAccordion";
import { TaskStage } from "../../../service/types/task/stage.dto";
import { TaskPriority } from "../../../service/types/task/priority.dto";
import { EditButton } from "../../../components/buttons/EditBtn";

export function Overview() {
  const navigate = useNavigate();

  const api = useApi();

  const { user } = useAuth();

  const { id } = useParams();

  const [project, setProject] = useState<ProjectDTO | null>(null);
  // const getProject = async () => {
  //   try {
  //     const response = await api.get({ route: `/project/${id}` });

  //     const data: ProjectDTO = response.data;

  //     setProject(data);
  //   } catch (error) {
  //     const { errors } = error as ApiError;

  //     errors?.forEach(
  //       err => {
  //         const notify = Toasts[err.level];
  //         notify(err.message);
  //       }
  //     )

  //     navigate('..')
  //   }
  // }

  const [tasks, setTasks] = useState<TaskDTO[]>([]);
  /* const getTasks = async () => {
    try {
      const response = await api.get<TaskQueryDTO>({
        route: `/tasks?projectkey=${id}`
      });

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
  } */

  const [events, setEvents] = useState<EventDTO[]>([]);
  // const getEvents = async () => {
  //   try {
  //     const response = await api.get({
  //       route: `/events?projectkey=${id}`
  //     });

  //     console.log(response);

  //     const data: EventDTO[] = response.data;

  //     setEvents(data);
  //   } catch (error) {
  //     const { errors } = error as ApiError;

  //     errors?.forEach(
  //       err => {
  //         const notify = Toasts[err.level];
  //         notify(err.message);
  //       }
  //     )

  //     navigate('../../')
  //   }
  // }

  const [comments, setComments] = useState<CommentDTO[]>([]);
  const getComments = async () => {
    try {
      const response = await api.get({
        route: `/comments?projectkey=${id}`
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
      const response: ApiResponse = await api.post<CreateCommentDTO>({
        route: `/comments`,
        data: {
          content: message,
          projectkey: id!,
          ownerkey: user!.username,
          date: new Date()
        }
      });

      Toasts['info'](response.message as string);

      getComments();
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
    setProject({
      id: 'bd568178-c2f4-4851-a336-810eddf0bb86',
      title: 'Projeto de teste',
      description: 'Projeto padrão para testes',
      ownerkey: '',
      due_date: new Date().toISOString(),
      progress: ProjectProgress.PENDING,
    });
    setTasks([{
      id: '73187165-f888-4a26-9df6-d7c8d39a6e81',
      code: 'TSK-001',
      name: 'Tarefa 01',
      description: 'Primeira tarefa de teste',
      project: 'c45d24bf-8933-4421-9685-863b3b285a94',
      owner: '',
      stage: TaskStage.PENDING,
      priority: TaskPriority.MEDIUM,
      due_date: new Date().toISOString(),
    }]);
    setEvents([]);
    setComments([]);
  }, [])

  if (project === null) return <><Text>Carregando...</Text></>;

  return (
    <Container className="tskr-proj-overview">
      <Content className="tskr-proj-content">
        <ProjectInfo>
          <SectionTitle>{project?.title}</SectionTitle>
          <Subtitle>Stated at: --:-- Due date: mm 00, yyyy</Subtitle>
          {ProgressBadge[project.progress]}
          <EditButton type="button" onClick={() => console.log('Open edit funtion')} />
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
              ? <Scroller className="vertical">
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