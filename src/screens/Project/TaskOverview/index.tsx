import { useState } from "react";
import { DateBadge } from "../../../components/badge/DateBadge";
import { Text } from "../../../components/base/Text";
import { Title } from "../../../components/base/Title";
import { CommentCard } from "../../../components/cards/CommentCard";
import { Scroller } from "../../../components/misc/Scroller";
import { useApi } from "../../../hooks/useApi";
import { Comments, Container, Description, Tag, Tags, TaskInfo } from "./style";
import type { ApiError } from "../../../service/types/response/error";
import { Toasts } from "../../../maps/toasts";
import { useNavigate, useParams } from "react-router-dom";
import { DateTime } from "luxon";
import { ItalicTitle } from "../../../components/base/ItalicTitle";
import { ProgressBadge } from "../../../maps/progress";
import { MessageField } from "../../../components/textfields/MessageField";
import type { CreateCommentDTO } from "../../../service/types/comment/comment.create.dto";
import { useAuth } from "../../../hooks/useAuth";
import type { CommentDTO } from "../../../service/types/comment/comment.dto";
import type { ApiResponse } from "../../../service/types/response/response";
import { SectionTitle } from "../../../components/base/SectionTitle";
import { Subtitle } from "../../../components/base/Subtitle";
import { EditButton } from "../../../components/buttons/EditBtn";
import { PriorityBadge } from "../../../maps/priority";
import { User } from "../../../components/misc/User";

export function TaskOverview() {
  const navigate = useNavigate();

  const api = useApi();

  const { user } = useAuth();

  const { id } = useParams();

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

  // if (project === null) return <><Text>Carregando...</Text></>;

  return (
    <Container className="tskr-task-overview">
      <TaskInfo>
        <SectionTitle>Task Title</SectionTitle>
        <DateBadge date={DateTime.local()} />
        {ProgressBadge['STARTED']}
        <EditButton type="button" onClick={() => console.log('Open edit funtion')} />
        <TaskTags />
      </TaskInfo>
      <Description className="tskr-task-description">
        <Subtitle>Description</Subtitle>
        <Text>Some description</Text>
      </Description>
      <Comments className="tskr-task-activity">
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
    </Container>
  )
}

interface TaskTagProps {
  label: string;
  children: React.ReactNode;
}

const TaskTag = ({
  label,
  children
}: TaskTagProps) => {
  return (
    <Tag className="tskr-task-tag">
      <Subtitle>{label}</Subtitle>
      {children}
    </Tag>
  )
}

const TaskTags = () => {
  return (
    <Tags className="tskr-task-tag">
      <TaskTag label="Priority">
        {PriorityBadge['EXTREME']}
      </TaskTag>
      <TaskTag label="Owner">
        <User username="mikaelst" />
      </TaskTag>
      <TaskTag label="Created">
        <Text>00 mm, yyyy</Text>
      </TaskTag>
      <TaskTag label="Last update">
        <Text>00 mm, yyyy</Text>
      </TaskTag>
    </Tags>
  )
}