import {
  Calendar,
  CalendarDays,
  ClipboardList,
  Clock,
  LayoutPanelLeft,
  Users,
} from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"
import { DateTime } from "luxon"

import { ImportantDates } from "@/components/ImportantDates"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { EventDTO } from "@/service/types/events/event.dto"
import { User } from "@/components/misc/User"
import { useManagerDashboard } from "./useManagerDashboard"
import { useAuth } from "@/hooks/useAuth"
import LoadingState from "@/components/loading-state"
import { ErrorState } from "@/components/error-state"

const taskProgress = [
  {
    label: "Started",
    value: "08",
    description: "Tarefas iniciadas no workspace",
    icon: Clock,
    variant: "default" as const,
  },
  {
    label: "Done",
    value: "12",
    description: "Itens concluídos",
    icon: LayoutPanelLeft,
    variant: "info" as const,
  },
  {
    label: "Overdue",
    value: "03",
    description: "Tarefas que exigem atenção",
    icon: CalendarDays,
    variant: "destructive" as const,
  },
  {
    label: "Review",
    value: "05",
    description: "Entregas em revisão",
    icon: ClipboardList,
    variant: "warning" as const,
  },
]

const membersStats = [
  {
    project: "Tasker Web App",
    username: "mikaelst",
    started: "04",
    done: "08",
    overdue: "01",
  },
  {
    project: "Dashboard Empresarial",
    username: "username",
    started: "02",
    done: "03",
    overdue: "00",
  },
  {
    project: "Aplicativo Mobile",
    username: "username",
    started: "02",
    done: "01",
    overdue: "02",
  },
]

function formatDate(date: string) {
  const parsed = DateTime.fromISO(date, { zone: "utc" })

  if (!parsed.isValid) {
    return "Sem data"
  }

  return parsed.toFormat("dd LLL, yyyy")
}

function MembersStatsCard() {
  return (
    <Card className="rounded-2xl bg-foreground/40 text-secondary-foreground shadow-xl shadow-black/10">
      <CardHeader>
        <div className="flex items-center justify-between gap-4">
          <div>
            <CardTitle className="text-base">Members Stats</CardTitle>
            <CardDescription className="mt-1 text-sm text-zinc-400">
              Resumo de progresso por membro e projeto.
            </CardDescription>
          </div>

          <div className="flex size-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
            <Users className="size-5" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {membersStats.map((member, index) => (
          <div key={`${member.project}-${member.username}`} className="tskr-member-stats">
            <div className="rounded-2xl bg-secondary/30 p-4 transition-colors hover:bg-muted/60">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="space-y-1">
                  <h3 className="font-semibold text-muted-foreground">
                    {member.project}
                  </h3>

                  <div className="flex items-center gap-2 pt-1">
                    <User username={member.username} />
                  </div>
                </div>

                <div className="tskr-stats-label-container flex flex-wrap gap-2 lg:min-w-90 lg:justify-end">
                  <div className="tskr-stats-label-started inline-flex items-center gap-2 rounded-full bg-success/10 px-3 py-1.5 text-success shadow-sm shadow-black/5 transition-colors">
                    <span className="text-xs font-semibold uppercase tracking-[0.28em] text-ring">
                      Started
                    </span>

                    <span className="text-sm font-semibold leading-none text-ring">
                      {member.started}
                    </span>
                  </div>

                  <div className="tskr-stats-label-done inline-flex items-center gap-2 rounded-full bg-info/10 px-3 py-1.5 text-info shadow-sm shadow-black/5 transition-colors">
                    <span className="text-xs font-semibold uppercase tracking-[0.28em]">
                      Done
                    </span>

                    <span className="text-sm font-semibold leading-none text-current">
                      {member.done}
                    </span>
                  </div>

                  <div className="tskr-stats-label-overdue inline-flex items-center gap-2 rounded-full bg-overdue-muted/60 px-3 py-1.5 text-overdue shadow-sm shadow-black/5 transition-colors">
                    <span className="text-xs font-semibold uppercase tracking-[0.28em]">
                      Overdue
                    </span>

                    <span className="text-sm font-semibold leading-none text-current">
                      {member.overdue}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {index < membersStats.length - 1 ? (
              <div className="h-3" />
            ) : null}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

function NextDeliveryCard() {
  return (
    <Card className="rounded-2xl bg-foreground/40 text-secondary-foreground shadow-xl shadow-black/10">
      <CardHeader>
        <div className="flex items-center justify-between gap-4">
          <CardTitle>Next Delivery</CardTitle>

          <div className="flex size-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
            <Calendar className="size-5" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-2">
        <h2 className="text-3xl font-semibold leading-none">
          {formatDate("2026-07-15")}
        </h2>

        <p className="text-base text-zinc-400">
          Project Title
        </p>
      </CardContent>
    </Card>
  )
}

export function ManagerContent() {
  const { user } = useAuth();
  const { loading, error, data, refetch } = useManagerDashboard();

  const members = data?.membersStats ?? [];
  const events = data?.events ?? [];

  const username = user?.username?.trim() || "Gestor";

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} refetch={refetch} />;
  }

  return (
    <div className="flex h-full flex-1 flex-row overflow-hidden">
      <div className="mx-auto flex h-full w-full max-w-7xl flex-col gap-8 overflow-y-auto p-8">
        <section className="flex flex-col gap-2">
          <div>
            <h1 className="tskr-workspace-greating text-2xl text-secondary-foreground sm:text-3xl">
              Olá! {username}
            </h1>
            <p className="mt-1 text-sm text-zinc-400">
              Acompanhe o progresso das tarefas, membros e entregas do workspace.
            </p>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
          <Card className="rounded-2xl bg-foreground/40 text-secondary-foreground shadow-xl shadow-black/10">
            <CardHeader>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <CardTitle>Tasks Progress</CardTitle>
                </div>

                <Select defaultValue="project_id">
                  <SelectTrigger className="w-45 bg-secondary">
                    <ClipboardList className="mr-2 size-4" />
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="project_id">
                      project_id
                    </SelectItem>
                    <SelectItem value="tasker">
                      Tasker Web App
                    </SelectItem>
                    <SelectItem value="dashboard">
                      Dashboard Empresarial
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>

            <CardContent className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {taskProgress.map((item) => {
                const Icon = item.icon

                return (
                  <TaskStageStatCard
                    label={item.label}
                    value={item.value}
                    description={item.description}
                    icon={Icon}
                    variant={item.variant}
                  />
                )
              })}
            </CardContent>
          </Card>

          <NextDeliveryCard />
        </section>

        <section>
          <MembersStatsCard />
        </section>
      </div>

      <div className="h-full xl:row-span-2 xl:h-full">
        <ImportantDates events={events} />
      </div>
    </div>
  )
}

const taskStageStatVariants = cva(
  "rounded-2xl shadow-lg shadow-black/10 transition-colors",
  {
    variants: {
      variant: {
        default: "bg-success/30 text-ring",
        info: "bg-info-muted/40 text-info",
        warning: "bg-warning-muted/30 text-yellow-200",
        destructive: "bg-overdue-muted text-overdue",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

const taskStageStatIconVariants = cva(
  "flex size-10 items-center justify-center rounded-full",
  {
    variants: {
      variant: {
        default: "bg-success/30 text-ring",
        info: "bg-info/10 text-info",
        warning: "bg-warning/10 text-warning",
        destructive: "bg-destructive/10 text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

type TaskStageStatVariant = NonNullable<
  VariantProps<typeof taskStageStatVariants>["variant"]
>

interface TaskStageStatCardProps extends React.ComponentProps<"div"> {
  label: string;
  value: string;
  description: string;
  icon: React.ElementType;
  variant?: TaskStageStatVariant;
}

function TaskStageStatCard({
  label,
  value,
  description,
  icon: Icon,
  variant = "default",
  className,
  ...props
}: TaskStageStatCardProps) {
  return (
    <Card className={cn(taskStageStatVariants({ variant }), className)} {...props}>
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3">
        <div>
          <CardDescription className="text-xs font-semibold uppercase tracking-[0.35em] text-current/70">
            {label}
          </CardDescription>
          <CardTitle className="mt-2 text-2xl text-secondary-foreground">
            {value}
          </CardTitle>
        </div>

        <div className={taskStageStatIconVariants({ variant })}>
          <Icon className="size-5" />
        </div>
      </CardHeader>
    </Card>
  )
}
