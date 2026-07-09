import { TaskCard } from "@/components/cards/task-card"
import { ItalicTitle } from "../../base/ItalicTitle"
import { Title } from "../../base/Title"
import type { TaskDTO } from "../../../service/types/task/task.dto"
import { TaskPriority } from "@/service/types/task/priority.dto"
import { ChevronDown } from "lucide-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

interface TaskCategoryAccordionProps {
  visible?: boolean
  title: string
  tasks: TaskDTO[]
}

export function TaskCategoryAccordion({
  visible = false,
  title,
  tasks,
}: TaskCategoryAccordionProps) {
  return (
    <Collapsible defaultOpen={visible} className="grid gap-3">
      <CollapsibleTrigger
        className={cn(
          "flex w-full items-center justify-between rounded-xl bg-background px-4 py-3 text-left",
          "transition-colors",
        )}
      >
        <div className="flex items-center gap-3">
          <ChevronDown className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 data-open:rotate-180" />
          <Title>{title}</Title>
        </div>
      </CollapsibleTrigger>

      <CollapsibleContent className="overflow-hidden">
        {tasks.length !== 0 ? (
          <ScrollArea
            className="w-full"
            scrollbarOrientation="horizontal"
            scrollbarClassName="mt-2"
          >
            <div className="flex w-max gap-4 pb-3 pr-4">
              {tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  code={task.code}
                  title={task.name}
                  description={task.description}
                  priority={TaskPriority.HIGH}
                  due_date={task.due_date}
                  owner={task.owner}
                  className="w-[18rem] shrink-0"
                />
              ))}
            </div>
          </ScrollArea>
        ) : (
          <ItalicTitle>Sem tarefas cadastradas</ItalicTitle>
        )}
      </CollapsibleContent>
    </Collapsible>
  )
}
