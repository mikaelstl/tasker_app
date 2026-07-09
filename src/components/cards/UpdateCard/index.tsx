import { DateBadge } from "@/components/badge/DateBadge";
import { User } from "@/components/misc/User";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DateTime } from "luxon";

interface UpdateCardDTO {
  readonly content: string;
  readonly date: string;
  readonly owner: string;
}

export function UpdateCard({
  content,
  date,
  owner,
}: UpdateCardDTO) {
  return (
    <Card className="p-0 mx-0 rounded-none bg-transparent shadow-none gap-2">
      <CardHeader className="space-y-4 p-0">
        <div className="flex items-center gap-3">
          <User username={owner} size="default" />
        </div>
      </CardHeader>

      <CardContent className="space-y-4 pr-2">
        <p className="max-w-xl text-base leading-7">
          {content}
        </p>
        <DateBadge date={DateTime.fromISO(date)} />
      </CardContent>
    </Card>
  )
}