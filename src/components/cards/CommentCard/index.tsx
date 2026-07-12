import { DateTime } from "luxon";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { User } from "@/components/misc/User";

interface CommentCardDTO {
  readonly content: string;
  readonly date: string;
  readonly owner: string;
}

export function CommentCard({
  content,
  date,
  owner,
}: CommentCardDTO) {
  return (
    <Card className="tskr-comment-card bg-secondary/40">
      <CardHeader className="flex flex-1 justify-between">
        <User username={owner} />
        <p className="shrink-0 text-xs text-muted-foreground">
          {DateTime.fromISO(date, { zone: "utc" }).toFormat("LLL dd, yyyy")}
        </p>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-6 text-secondary-foreground">
          {content}
        </p>
      </CardContent>
    </Card>
  )
}