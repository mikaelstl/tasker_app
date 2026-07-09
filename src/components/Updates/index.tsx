import type { UpdateDTO } from "@/service/types/comment/update.dto"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { ScrollArea } from "../ui/scroll-area"
import { Activity } from "lucide-react"
import { UpdateCard } from "../cards/UpdateCard"

interface UpdatesProps {
  updates: UpdateDTO[]
}

export function Updates({
  updates
}: UpdatesProps) {
  return (
    <Card className="flex h-full min-h-0 w-sm flex-col rounded-none bg-foreground shadow-sm">
      <CardHeader className="border-b pb-4">
        <div className="flex items-center gap-2">
          <Activity className="size-4" />
          <CardTitle className="text-base font-semibold">
            Updates
          </CardTitle>
        </div>
        <p className="text-sm text-muted-foreground">
          Recent project updates and team activity.
        </p>
      </CardHeader>

      <CardContent className="min-h-0 flex-1 px-5 pb-8">
        <ScrollArea className="h-full pr-4">
          <div className="space-y-8">
            {updates.map((update, index) => (
              <div key={update.id} className="relative grid grid-cols-[24px_1fr] gap-2">
                <div className="relative flex justify-center">
                  <span className="mt-2 flex size-3 rounded-full border-2 border-muted-secondary bg-muted-foreground/80" />

                  {index !== updates.length - 1 && (
                    <span className="absolute top-4.5 h-[calc(100%+2rem)] w-px bg-card" />
                  )}
                </div>

                <UpdateCard
                  owner={update.ownerkey}
                  content={update.content}
                  date={update.date}
                />
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
