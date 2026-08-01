import { DateTime } from "luxon";
import { EyeIcon, TrashIcon } from "@/components/icons/heroicons";
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
          </BubbleHeader>

          <BubbleContent>
            <Text>{content}</Text>
          </BubbleContent>
        </Bubble>
      </Texts>
    </Card>
  );
}
