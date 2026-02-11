import { useEffect, useState } from "react";
import { DateBadge } from "../../../components/badge/DateBadge";
import { Label } from "../../../components/base/Label";
import { Text } from "../../../components/base/Text";
import { Title } from "../../../components/base/Title";
import { CommentCard } from "../../../components/cards/CommentCard";
import { TaskCard } from "../../../components/cards/TaskCard";
import { ImportantDates } from "../../../components/ImportantDates";
import { Margin } from "../../../components/misc/Margin";
import { Scroller } from "../../../components/misc/Scroller";
import { User } from "../../../components/misc/User";
import { ProjectMenu } from "../../../components/ProjectMenu";
import { useApi } from "../../../hooks/useApi";
import { Abstract, AbstractItem, Comments, Container, Content, ImportantTasks, ProjectInfo } from "./style";
import type { ProjectDTO } from "../../../service/types/project/project.dto";
import type { ApiError } from "../../../service/types/response/error";
import { Toasts } from "../../../maps/toasts";
import { useNavigate, useParams } from "react-router-dom";
import { DateTime } from "luxon";
import type { TaskDTO } from "../../../service/types/task/task.dto";
import { ItalicTitle } from "../../../components/base/ItalicTitle";
import { ProgressBadge } from "../../../maps/progress";
import type { TaskQueryDTO } from "../../../service/types/task/query.dto";
import type { EventDTO } from "../../../service/types/events/event.dto";
import { MessageField } from "../../../components/textfields/MessageField";
import type { CreateCommentDTO } from "../../../service/types/comment/comment.create.dto";
import { useAuth } from "../../../hooks/useAuth";
import type { CommentDTO } from "../../../service/types/comment/comment.dto";
import type { ApiResponse } from "../../../service/types/response/response";

export function Overview() {
  const navigate = useNavigate();

  const api = useApi();

  const { user } = useAuth();

  const { id } = useParams();

  const [project, setProject] = useState<ProjectDTO | null>(null);
  const getProject = async () => {
    try {
      const response = await api.get({ route: `/project/${id}` });

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
  const getTasks = async () => {
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
  }

  const [events, setEvents] = useState<EventDTO[]>([]);
  const getEvents = async () => {
    try {
      const response = await api.get({
        route: `/events?projectkey=${id}`
      });

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
    getProject();
    getTasks();
    getEvents();
    getComments();
  }, [])

  if (project === null) return <><Text>Carregando...</Text></>;

  return (
    <Container className="overview">
      <Abstract className="abstract">
        <ProjectInfo>
          <div id="leading">
            <Title>{project?.title}</Title>
            <Text>{project?.description}</Text>
          </div>
          {ProgressBadge[project.progress]}
        </ProjectInfo>
        <AbstractItem className="abstract-item">
          <Label>Owner</Label>
          <User username={project?.ownerkey ?? ''} />
        </AbstractItem>
        <AbstractItem className="abstract-item">
          <Label>Due date</Label>
          <DateBadge
            date={DateTime.fromISO(project?.due_date, { zone: 'utc' })}
          />
        </AbstractItem>
      </Abstract>
      <Content className="content">
        <ProjectMenu />
        <ImportantTasks className="important-tasks">
          <Title>Most important</Title>
          {
            tasks.length !== 0
              ? <Scroller className="horizontal">
                {
                  tasks.map(task => <Margin right='12px'>
                    <TaskCard
                      key={task.id}
                      title={task.name}
                      description={task.description}
                      date={task.due_date}
                    />
                  </Margin>)
                }
              </Scroller>
              : <ItalicTitle>Without tasks</ItalicTitle>
          }
        </ImportantTasks>
        <Comments className="overview-comments">
          <Title>Comments</Title>
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
          <MessageField send={sendComment}/>
        </Comments>
      </Content>
      <ImportantDates events={events}/>
    </Container>
  )
}