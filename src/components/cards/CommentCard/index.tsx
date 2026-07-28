import { DateTime } from "luxon";
import { EyeIcon, TrashIcon } from "@heroicons/react/16/solid";
import { Subtitle } from "../../base/Subtitle";
import { Text } from "../../base/Text";
import { Avatar } from "../../misc/Avatar";
import {
  Actions,
  ActionButton,
  Bubble,
  BubbleContent,
  BubbleHeader,
  Card,
  Details,
  Meta,
  Texts,
} from "./style";
import { Title } from "../../base/Title";

interface CommentCardProps {
  readonly id: string;
  readonly content: string;
  readonly date: DateTime;
  readonly owner: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly expanded?: boolean;
  readonly disabled?: boolean;
  readonly onInspect?: () => void;
  readonly onDelete?: () => void;
}

const formatDateTime = (value: string) => new Intl.DateTimeFormat("pt-BR", {
  dateStyle: "short",
  timeStyle: "short",
}).format(new Date(value));

export function CommentCard({
  id,
  content,
  date,
  owner,
  createdAt,
  updatedAt,
  expanded = false,
  disabled = false,
  onInspect,
  onDelete,
}: CommentCardProps) {
  return (
    <Card className="comment-card">
      <Avatar size="medium" image=""/>
      <Texts>
        <Bubble>
          <BubbleHeader>
            <div>
              <Title>{owner}</Title>
              <Meta>{date.setLocale("pt-BR").toFormat("dd LLL, HH:mm")}</Meta>
            </div>
            <Actions>
              {onInspect ? (
                <ActionButton type="button" onClick={onInspect} disabled={disabled} title="Consultar comentário">
                  <EyeIcon />
                </ActionButton>
              ) : null}
              {onDelete ? (
                <ActionButton type="button" onClick={onDelete} disabled={disabled} $danger title="Excluir comentário">
                  <TrashIcon />
                </ActionButton>
              ) : null}
            </Actions>
          </BubbleHeader>

          <BubbleContent>
            <Text>{content}</Text>
          </BubbleContent>

          {expanded ? (
            <Details>
              <Subtitle>ID: {id}</Subtitle>
              <Subtitle>Criado em {formatDateTime(createdAt)} · atualizado em {formatDateTime(updatedAt)}</Subtitle>
            </Details>
          ) : null}
        </Bubble>
      </Texts>
    </Card>
  );
}
