import { Text } from "@/components/base/Text";
import { Subtitle } from "../../base/Subtitle";
import {
  Card,
  Content,
  Footer,
  Header,
} from "./style";
import { User } from "@/components/misc/User";

interface CommentCardProps {
  readonly id: string;
  readonly content: string;
  readonly date: string;
  readonly owner: string;
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
    <Card className="tskr-comment-card" key={id}>
      <Content>
        <Text>{content}</Text>
      </Content>
      <Footer>
        <User affiliationId={owner}/>
        <Subtitle>{formatDateTime(date)}</Subtitle>
      </Footer>
    </Card>
  );
}
