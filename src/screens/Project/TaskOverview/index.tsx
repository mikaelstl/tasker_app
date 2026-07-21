import { useState } from "react";
import { DateBadge } from "../../../components/badge/DateBadge";
import { Text } from "../../../components/base/Text";
import { Title } from "../../../components/base/Title";
import { CommentCard } from "../../../components/cards/CommentCard";
import { Scroller } from "../../../components/misc/Scroller";
import { Comments, Container, Description, Links, Tag, Tags, TaskInfo } from "./style";
import type { ApiError } from "../../../service/types/response/error";
import { Toasts } from "../../../maps/toasts";
import { useNavigate, useParams } from "react-router-dom";
import { DateTime } from "luxon";
import { ItalicTitle } from "../../../components/base/ItalicTitle";
import { ProjectStageBadge } from "../../../maps/project-stage";
import { MessageField } from "../../../components/textfields/MessageField";
import { useAuth } from "../../../hooks/useAuth";
import type { CommentDTO } from "../../../service/types/comment/comment.dto";
import { SectionTitle } from "../../../components/base/SectionTitle";
import { Subtitle } from "../../../components/base/Subtitle";
import { EditButton } from "../../../components/buttons/EditBtn";
import { PriorityBadge } from "../../../maps/priority";
import { User } from "../../../components/misc/User";
import { Link } from "../../../components/cards/LinkCard/style";
import { useServices } from "../../../hooks/useServices";

export function TaskOverview() {
  const navigate = useNavigate();

  const { CommentService } = useServices();

  const { user } = useAuth();

  const { id } = useParams();

  const [comments, setComments] = useState<CommentDTO[]>([]);
  const getComments = async () => {
    try {
      const response = await CommentService.list({ projectkey: id });
      const data = response.data;

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
        <Links>
          <Link href="./project">ID do projeto</Link>
          <Subtitle>/</Subtitle>
          <Subtitle>TSK-000</Subtitle>
        </Links>
        <SectionTitle>Título da tarefa</SectionTitle>
        <DateBadge date={DateTime.local()} />
        {ProjectStageBadge['STARTED']}
        <EditButton type="button" onClick={() => console.log('Open edit task modal')} />
        <TaskTags />
      </TaskInfo>
      <Description className="tskr-task-description">
        <Subtitle>Descrição</Subtitle>
        <Text>Descrição da tarefa</Text>
      </Description>
      <Comments className="tskr-task-activity">
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
      <TaskTag label="Prioridade">
        {PriorityBadge['EXTREME']}
      </TaskTag>
      <TaskTag label="Responsável">
        <User username="mikaelst" />
      </TaskTag>
      <TaskTag label="Criada em">
        <Text>00 mm, aaaa</Text>
      </TaskTag>
      <TaskTag label="Última atualização">
        <Text>00 mm, aaaa</Text>
      </TaskTag>
    </Tags>
  )
}
