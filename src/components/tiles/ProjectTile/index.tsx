import { useNavigate } from "react-router-dom"
import type { ReactNode } from "react"
import { CalendarDays, ChevronRight, CircleAlert, CircleCheckBig, Clock3, LoaderCircle } from "lucide-react"
import { DateTime } from "luxon"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { ProjectProgress, type ProjectProgress as ProjectProgressType } from "@/service/types/project/project.dto"
import { DateBadge } from "@/components/badge/DateBadge"
import { AvatarGroup } from "@/components/ui/avatar"
import { Team } from "@/components/misc/Team"

interface ProjectTileProps {
  id: string
  title: string
  description: string
  progress: ProjectProgressType
  due_date: string
}

const progressVariantMap: Record<ProjectProgressType, "default" | "secondary" | "warning" | "info" | "destructive" | "outline"> = {
  [ProjectProgress.OVERDUE]: "destructive",
  [ProjectProgress.STARTED]: "info",
  [ProjectProgress.REVIEW]: "warning",
  [ProjectProgress.PENDING]: "outline",
  [ProjectProgress.DONE]: "secondary",
}

const progressIconMap: Record<ProjectProgressType, ReactNode> = {
  [ProjectProgress.OVERDUE]: <CircleAlert className="size-4" />,
  [ProjectProgress.STARTED]: <Clock3 className="size-4" />,
  [ProjectProgress.REVIEW]: <LoaderCircle className="size-4" />,
  [ProjectProgress.PENDING]: <CalendarDays className="size-4" />,
  [ProjectProgress.DONE]: <CircleCheckBig className="size-4" />,
}

export function ProjectTile({
  id,
  title,
  description,
  progress,
  due_date,
}: ProjectTileProps) {
  const navigate = useNavigate()

  const goToProjectPage = () => navigate(`/home/project/${id}/overview`)

  const dueDate = DateTime.fromISO(due_date, { zone: "utc" });

  return (
    <Card
      className={cn(
        "group cursor-pointer overflow-hidden shadow-sm transition-all",
        "hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md",
      )}
      onClick={goToProjectPage}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault()
          goToProjectPage()
        }
      }}
      data-project-id={id}
    >
      <CardContent className="tskr-project-tile-content p-4 sm:p-5">
        <div className="tskr-project-tile-content-container flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="tskr-project-tile-infos flex flex-row gap-4 min-w-0 space-y-3">
            <Badge variant={progressVariantMap[progress]} className="gap-1.5 rounded-full px-2.5">
              {progressIconMap[progress]}
              {progress}
            </Badge>
            <div className="flex flex-col gap-2">
              <CardTitle>
                {title}
              </CardTitle>
              <p className="max-w-3xl text-sm leading-6 text-muted-foreground">
                {description}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-start">
            <div className="hidden rounded-full bg-accent/60 p-2 text-muted-foreground transition-colors group-hover:border-primary/30 group-hover:text-ring sm:flex">
              <ChevronRight className="size-4" />
            </div>
          </div>
        </div>
      </CardContent>
      <CardContent className="flex justify-between">
        <Team />
        <DateBadge date={dueDate} />
      </CardContent>
    </Card>
  )
}
