import { useEffect, useMemo, useState } from "react"
import { DateTime } from "luxon"
import { Calendar, Clock, ChevronDown, PencilLine, Send, Balloon, MessageCircle } from "lucide-react"
import { useNavigate, useParams } from "react-router-dom"

import LoadingState from "@/components/loading-state"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ImportantDates } from "@/components/ImportantDates"
import { useAuth } from "../../../hooks/useAuth"
import { useServices } from "../../../hooks/useServices"
import { Toasts } from "../../../maps/toasts"
import { type ProjectDTO, ProjectProgress } from "../../../service/types/project/project.dto"
import type { ApiError } from "../../../service/types/response/error"
import type { CommentDTO } from "../../../service/types/comment/comment.dto"
import type { EventDTO } from "../../../service/types/events/event.dto"
import { type TaskDTO } from "../../../service/types/task/task.dto"
import { TaskPriority } from "../../../service/types/task/priority.dto"
import { TaskCard } from "@/components/cards/task-card"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { User } from "@/components/misc/User"
import { CommentCard } from "@/components/cards/CommentCard"
import { Input } from "@/components/ui/input"

const progressLabelMap: Record<ProjectProgress, string> = {
  [ProjectProgress.OVERDUE]: "Atrasado",
  [ProjectProgress.STARTED]: "Iniciado",
  [ProjectProgress.REVIEW]: "Em revisão",
  [ProjectProgress.PENDING]: "Pendente",
  [ProjectProgress.DONE]: "Concluído",
}

const progressVariantMap: Record<ProjectProgress, "destructive" | "warning" | "default" | "info" | "secondary"> = {
  [ProjectProgress.OVERDUE]: "destructive",
  [ProjectProgress.STARTED]: "default",
  [ProjectProgress.REVIEW]: "warning",
  [ProjectProgress.PENDING]: "secondary",
  [ProjectProgress.DONE]: "info",
}

const priorityWeight: Record<TaskPriority, number> = {
  [TaskPriority.EXTREME]: 0,
  [TaskPriority.HIGH]: 1,
  [TaskPriority.MEDIUM]: 2,
  [TaskPriority.LOW]: 3,
}

function formatDate(value: string) {
  return DateTime.fromISO(value, { zone: "utc" }).toFormat("LLL dd, yyyy")
}

export function Overview() {
  const navigate = useNavigate()

  const { CommentService, EventService, ProjectService, TaskService } = useServices()
  const { user } = useAuth();
  const { id } = useParams();

  const projectkey = id?.trim()

  const [project, setProject] = useState<ProjectDTO | null>(null)
  const [tasks, setTasks] = useState<TaskDTO[]>([])
  const [events, setEvents] = useState<EventDTO[]>([])
  const [comments, setComments] = useState<CommentDTO[]>([])
  const [commentDraft, setCommentDraft] = useState("")

  const loadProject = async () => {
    if (!projectkey) {
      return
    }

    try {
      const response = await ProjectService.find(projectkey)

      const data: ProjectDTO = response.data;

      setProject(data)
    } catch (error) {
      const { errors } = error as ApiError

      errors?.forEach((err) => {
        const notify = Toasts[err.level]
        notify(err.message)
      })

      navigate("..");
    }
  }

  const loadTasks = async () => {
    if (!projectkey) {
      return
    }

    try {
      const response = await TaskService.list(projectkey, {
        projectkey: projectkey
      })
      const data: TaskDTO[] = response.data;

      console.log(data);


      setTasks(data)
    } catch (error) {
      const { errors } = error as ApiError

      errors?.forEach((err) => {
        const notify = Toasts[err.level]
        notify(err.message)
      })

      navigate("../../")
    }
  }

  const loadEvents = async () => {
    if (!projectkey) {
      return
    }

    try {
      const response = await EventService.list({
        projectkey: projectkey,
      })

      const data: EventDTO[] = response.data

      setEvents(data)
    } catch (error) {
      const { errors } = error as ApiError

      errors?.forEach((err) => {
        const notify = Toasts[err.level]
        notify(err.message)
      })

      navigate("../../")
    }
  }

  const loadComments = async () => {
    if (!projectkey) {
      return
    }

    try {
      const response = await CommentService.list({
        projectkey: projectkey,
      })

      const data: CommentDTO[] = response.data

      setComments(data)
    } catch (error) {
      const { errors } = error as ApiError

      errors?.forEach((err) => {
        const notify = Toasts[err.level]
        notify(err.message)
      })

      navigate("../../")
    }
  }

  const sendComment = async (message: string) => {
    if (!projectkey) {
      return
    }

    try {
      const response = await CommentService.create({
        content: message,
        projectkey: projectkey,
        ownerkey: user!.username,
        date: new Date(),
      })

      Toasts["info"](response.message)
      loadComments()
    } catch (error) {
      const { errors } = error as ApiError

      errors?.forEach((err) => {
        const notify = Toasts[err.level]
        notify(err.message)
      })

      navigate("../../")
    }
  }

  const handleSendComment = async () => {
    const value = commentDraft.trim()

    if (!value) {
      return
    }

    await sendComment(value)
    setCommentDraft("")
  }

  useEffect(() => {
    if (!projectkey) {
      navigate("..")
      return
    }

    loadComments()
    loadProject()
    loadTasks()
    loadEvents()
  }, [projectkey, navigate])

  const importantTasks = useMemo(() => {
    return [...tasks].sort((left, right) => {
      const priorityDelta = priorityWeight[left.priority] - priorityWeight[right.priority]

      if (priorityDelta !== 0) {
        return priorityDelta
      }

      return (
        DateTime.fromISO(left.due_date, { zone: "utc" }).toMillis() -
        DateTime.fromISO(right.due_date, { zone: "utc" }).toMillis()
      )
    })
  }, [tasks])

  if (project === null) {
    return <LoadingState />
  }

  const noDate = "— • —"
  const dueAt = formatDate(project.due_date)

  return (
    <div className="flex h-full min-h-0 flex-1 overflow-hidden">
      <div className="mx-auto flex h-full w-full max-w-7xl flex-col gap-6 overflow-y-auto p-6">

        <section className="tskr-project-infos">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="space-y-4">

              <div className="tskr-project-infos-header flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-semibold tracking-tight text-secondary-foreground">
                  {project.title}
                </h1>
                <Badge variant={progressVariantMap[project.progress]}>
                  {progressLabelMap[project.progress]}
                </Badge>
              </div>

              <div className="flex flex-col gap-3 text-sm text-muted-foreground md:flex-row md:flex-wrap md:gap-6">
                <p className="flex items-center gap-2">
                  <Calendar className="size-4" />
                  Iniciado em: {noDate}
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="size-4" />
                  Entrega em: {dueAt}
                </p>
              </div>

              <div className="space-y-2">
                <p className="max-w-4xl text-md leading-6 text-secondary-foreground">
                  {project.description || "Sem descrição cadastrada."}
                </p>
              </div>
            </div>

            <Button
              type="button"
              variant="secondary"
              size="sm"
              className="gap-2 self-start p-4"
              onClick={() => navigate("../edit")}
            >
              <PencilLine className="size-4" />
              Editar
            </Button>
          </div>
        </section>

        <section className="tskr-important-tasks rounded-2xl text-secondary-foreground">
          <Collapsible defaultOpen className="grid gap-0">
            <CollapsibleTrigger className="flex w-full items-center justify-between gap-3 border-b text-left">
              <div className="space-y-1">
                <h2 className="text-lg font-semibold">Tarefas importantes</h2>
              </div>

              <ChevronDown className="size-4 shrink-0 text-secondary-foreground transition-transform duration-200 data-open:rotate-180" />
            </CollapsibleTrigger>

            <CollapsibleContent className="overflow-hidden">
              <div className="p-4">
                {importantTasks.length > 0 ? (
                  <ScrollArea
                    className="w-full"
                    scrollbarOrientation="horizontal"
                    scrollbarClassName="mt-2"
                  >
                    <div className="flex w-max gap-3 pb-3 pr-4">
                      {importantTasks.map((task) => (
                        <TaskCard
                          code={task.code}
                          title={task.name}
                          priority={task.priority}
                          due_date={task.due_date}
                          owner={task.owner}
                          description={task.description}
                        />
                      ))}
                    </div>
                  </ScrollArea>
                ) : (
                  <div className="rounded-xl border border-dashed bg-muted/20 p-6 text-center">
                    <p className="text-sm font-medium">Sem tarefas cadastradas</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Quando houver tarefas, elas aparecerão aqui.
                    </p>
                  </div>
                )}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </section>

        <section className="tskr-project-comments-area bg-foreground/60 rounded-xl p-4 flex flex-col gap-4 size-full justify-between">
          <div>
            <div>
              <h2 className="text-lg font-semibold text-secondary-foreground">Comentários</h2>
            </div>
            <div className="min-h-0">
              {comments.length !== 0 ? (
                <div className="space-y-4">
                  {comments.map((comment) => (
                    <CommentCard
                      content={comment.content}
                      date={comment.date}
                      owner={comment.ownerkey}
                    />
                  ))}
                </div>
              ) : (
                <div className="rounded-xl border border-dashed bg-muted/20 p-6 text-center">
                  <p className="text-sm font-medium">Sem comentários</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Use o campo ao lado para registrar um comentário.
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="flex space-y-3 gap-4">
            <div className="flex items-center gap-2 rounded-lg bg-card p-2 pl-4 w-full shadow-sm">
              <MessageCircle className="size-4 shrink-0 text-secondary-foreground" />
              <Input
                value={commentDraft}
                onChange={(event) => setCommentDraft(event.target.value)}
                placeholder="Escreva um comentário..."
                className="h-8 border-none bg-transparent px-0 shadow-none focus-visible:ring-0"
              />
              <Button type="button" onClick={handleSendComment} className="gap-2 p-4">
                <Send className="size-4" />
              </Button>
            </div>

          </div>
        </section>

      </div>
      <div>
        <ImportantDates events={events} />
      </div>
    </div>
  )
}
