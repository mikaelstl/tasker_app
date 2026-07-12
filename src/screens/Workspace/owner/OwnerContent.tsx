import {
  AlertTriangle,
  ChevronRight,
  CalendarClock,
  Clock,
  FolderKanban,
  Plus,
  Settings,
  ShieldCheck,
  Users,
  XCircle,
} from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Updates } from "@/components/Updates"
import { ProjectHealthStatus, ProjectHealthBadge } from "@/components/badge/project-health-badge"
import { DateBadge } from "@/components/badge/DateBadge"
import { DateTime } from "luxon";
import { cn } from "@/lib/utils"
import { useAuth } from "@/hooks/useAuth"
import { useOwnerDashboard } from "./useOwnerDashboard"
import LoadingState from "@/components/loading-state"
import { ErrorState } from "@/components/error-state"

const projectStats = [
  {
    label: "Total",
    value: 12,
    description: "Projetos ativos",
    icon: FolderKanban,
    variant: "default" as const,
  },
  {
    label: "Seguros",
    value: 8,
    description: "Projetos saudáveis",
    icon: ShieldCheck,
    variant: "info" as const,
  },
  {
    label: "Em alerta",
    value: 3,
    description: "Precisam de atenção",
    icon: AlertTriangle,
    variant: "warning" as const,
  },
  {
    label: "Críticos",
    value: 1,
    description: "Risco elevado",
    icon: XCircle,
    variant: "destructive" as const,
  },
]

const deadlineAlerts = [
  {
    project: "Redesign do painel administrativo",
    date: "09 jul, 18:30",
    status: "Hoje",
    variant: "destructive" as const,
  },
  {
    project: "Integração com sistema de pagamentos",
    date: "11 jul, 14:00",
    status: "2 dias",
    variant: "secondary" as const,
  },
  {
    project: "Aplicativo mobile da equipe externa",
    date: "15 jul, 09:00",
    status: "Esta semana",
    variant: "outline" as const,
  },
]

const quickActions = [
  {
    title: "Novo projeto",
    description: "Crie um projeto para sua organização",
    icon: Plus,
  },
  {
    title: "Gerenciar membros",
    description: "Controle cargos e permissões",
    icon: Users,
  },
  {
    title: "Configurações",
    description: "Ajuste dados da organização",
    icon: Settings,
  },
]

const projects = [
  {
    title: "Tasker Web App",
    description: "Gerenciamento de tarefas e equipes",
    health: ProjectHealthStatus.SAFE,
    members: 8,
    due_date: "18 jul, 2026",
  },
  {
    title: "Dashboard Empresarial",
    description: "Relatórios e indicadores de produtividade",
    health: ProjectHealthStatus.WARNING,
    members: 5,
    due_date: "12 jul, 2026",
  },
  {
    title: "Aplicativo Mobile",
    description: "Controle de tarefas em campo",
    health: ProjectHealthStatus.CRITICAL,
    members: 4,
    due_date: "09 jul, 2026",
  },
]

export function OwnerContent() {
  const { user } = useAuth();
  const { loading, error, data, refetch } = useOwnerDashboard();

  // const projects = data?.projects ?? [];

  const username = user?.username?.trim() || "Proprietário";

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} refetch={refetch} />;
  }

  return (
    <div className="flex flex-1 flex-row h-full overflow-hidden">
      <div className="mx-auto flex w-full h-full max-w-7xl flex-col gap-8 p-8 overflow-y-auto">
        <section className="flex flex-col gap-2">
          <div>
            <h1 className="tskr-workspace-greating text-secondary-foreground text-2xl sm:text-3xl">
              Olá! {username}
            </h1>
            <p className="mt-1 text-sm text-zinc-400">
              Acompanhe a saúde dos projetos, prazos importantes e ações da sua organização.
            </p>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {projectStats.map((item) => {
            const Icon = item.icon

            return (
              <DashboardStat
                key={item.label}
                label={item.label}
                value={item.value}
                description={item.description}
                icon={Icon}
                variant={item.variant}
              />
            )
          })}
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
          <Card className="rounded-2xl bg-foreground/40 text-secondary-foreground shadow-xl shadow-black/10">
            <CardHeader>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <CardTitle>Alertas de deadline</CardTitle>
                </div>

                <div className="flex size-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
                  <CalendarClock className="size-5" />
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {deadlineAlerts.map((alert, index) => (
                <div key={alert.project}>
                  <div className="flex items-center justify-between gap-4 rounded-xl border border-zinc-800/80 bg-background/60 p-4">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex size-9 items-center justify-center rounded-full bg-muted text-muted-foreground">
                        <Clock className="size-4" />
                      </div>

                      <div>
                        <h3 className="font-medium text-zinc-100">
                          {alert.project}
                        </h3>
                        <p className="mt-1 text-sm text-zinc-400">
                          Prazo: {alert.date}
                        </p>
                      </div>
                    </div>

                    <Badge variant={alert.variant}>
                      {alert.status}
                    </Badge>
                  </div>

                  {index < deadlineAlerts.length - 1 && (
                    <Separator className="mt-4 bg-zinc-800/60" />
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="rounded-2xl bg-foreground/40 shadow-xl shadow-black/10">
            <CardHeader>
              <CardTitle>Ações rápidas</CardTitle>
            </CardHeader>

            <CardContent className="space-y-3">
              {quickActions.map((action) => {
                const Icon = action.icon

                return (
                  <Button
                    key={action.title}
                    variant="ghost"
                    className="h-auto w-full justify-between rounded-xl border-card bg-background/60 p-4 text-left hover:bg-muted/40"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex size-10 items-center justify-center rounded-full bg-muted">
                        <Icon className="size-5" />
                      </div>

                      <div>
                        <p className="font-medium text-secondary-foreground">{action.title}</p>
                        <p className="text-xs font-normal">
                          {action.description}
                        </p>
                      </div>
                    </div>

                    <ChevronRight className="size-5" />
                  </Button>
                )
              })}
            </CardContent>
          </Card>
        </section>

        <section>
          <Card className="rounded-2xl border-violet-500/10 bg-foreground/40 shadow-xl shadow-black/10">
            <CardHeader className="flex flex-row items-center justify-between gap-4">
              <CardTitle>Lista de projetos</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              {projects.map((project) => (
                <ProjectCard {...project} />
              ))}

              <Button
                variant="ghost"
                className="w-full rounded-xl border-border border-dashed text-muted-foreground hover:bg-muted/40 hover:text-secondary-foreground"
              >
                Ver mais
                <ChevronRight className="ml-2 size-4" />
              </Button>
            </CardContent>
          </Card>
        </section>
      </div>

      <div className="h-full xl:row-span-2 xl:h-full">
        <Updates updates={[]} />
      </div>
    </div>
  )
}

interface DashboardStatProps extends React.ComponentProps<"div"> {
  label: string;
  description: string;
  value: number;
  icon: React.ElementType;
  variant?: Variant;
}

const dashboardStatVariants = cva(
  "rounded-2xl border shadow-lg shadow-black/10 transition-colors",
  {
    variants: {
      variant: {
        default: "bg-muted/30 text-muted-foreground",
        warning: "border-warning bg-warning-muted/30 text-yellow-200",
        destructive: "border-overdue bg-overdue-muted text-overdue",
        info: "border-info bg-info-muted/40 text-info",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const dashboardStatIconVariants = cva(
  "flex size-10 items-center justify-center rounded-full",
  {
    variants: {
      variant: {
        default: "bg-card text-muted-foreground",
        warning: "bg-warning/10 text-warning",
        destructive: "bg-destructive/10 text-destructive",
        info: "bg-info/10 text-info",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

type Variant = NonNullable<VariantProps<typeof dashboardStatVariants>["variant"]>

function DashboardStat({
  label,
  value,
  description,
  icon: Icon,
  variant = "default",
  className,
  ...props
}: DashboardStatProps) {
  return (
    <Card className={cn(dashboardStatVariants({ variant }), className)} {...props}>
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3">
        <div>
          <CardDescription className="text-xs font-semibold uppercase tracking-[0.35em] text-current/70">
            {label}
          </CardDescription>
          <CardTitle className="mt-2 text-3xl font-bold text-secondary-foreground">
            {value}
          </CardTitle>
        </div>

        <div className={dashboardStatIconVariants({ variant })}>
          <Icon className="size-5" />
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-current/80">
          {description}
        </p>
      </CardContent>
    </Card>
  )
}

interface ProjectCardProps {
  title: string;
  description: string;
  members: number;
  health: ProjectHealthStatus;
  due_date: string;
}

function ProjectCard({
  title,
  description,
  members,
  health,
  due_date
}: ProjectCardProps) {
  return (
    <div
      key={title}
      className="rounded-2xl border border-zinc-800/80 bg-background/60 p-4 transition-colors hover:bg-muted/40"
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="justify-self-end">{ProjectHealthBadge[health]}</div>

        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-semibold text-secondary-foreground">
              {title}
            </h3>
          </div>

          <p className="text-sm text-zinc-400">
            {description}
          </p>
        </div>

        <div className="grid gap-3 text-sm text-zinc-400 sm:grid-cols-2 lg:min-w-90">
          <div className="flex items-center gap-2">
            <Users className="size-4 text-muted-foreground" />
            {members} membros
          </div>

          <div className="flex items-center gap-2">
            <DateBadge date={DateTime.fromISO(due_date)} />
          </div>
        </div>
      </div>
    </div>
  )
}
