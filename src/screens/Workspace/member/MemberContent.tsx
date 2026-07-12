import { useMemo } from "react";
import {
  AlertCircle,
  CalendarDays,
  Clock3,
  ListTodo,
} from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { ImportantDates } from "@/components/ImportantDates";
import { TaskCategoryAccordion } from "@/components/accordions/TaskCategoryAccordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { TaskStage } from "@/service/types/task/stage.dto";
import { cn } from "@/lib/utils";

import { useMemberDashboard } from "./useMemberDashboard";
import LoadingState from "@/components/loading-state";
import { ErrorState } from "@/components/error-state";

const taskStageStatVariants = cva(
  "rounded-2xl border shadow-lg shadow-black/10 transition-colors",
  {
    variants: {
      variant: {
        default: "border-border/60 bg-muted/30 text-muted-foreground",
        info: "border-info bg-info-muted/40 text-info",
        warning: "border-warning bg-warning-muted/30 text-yellow-200",
        destructive: "border-overdue bg-overdue-muted text-overdue",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const taskStageStatIconVariants = cva(
  "flex size-10 items-center justify-center rounded-full",
  {
    variants: {
      variant: {
        default: "bg-card text-muted-foreground",
        info: "bg-info/10 text-info",
        warning: "bg-warning/10 text-warning",
        destructive: "bg-destructive/10 text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

type TaskStageStatVariant = NonNullable<
  VariantProps<typeof taskStageStatVariants>["variant"]
>;

type TaskStageStatCardProps = {
  label: string;
  value: number;
  description: string;
  icon: React.ElementType;
  variant?: TaskStageStatVariant;
};

function TaskStageStatCard({
  label,
  value,
  description,
  icon: Icon,
  variant = "default",
}: TaskStageStatCardProps) {
  return (
    <Card className={cn(taskStageStatVariants({ variant }))}>
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3">
        <div>
          <CardDescription className="text-xs font-semibold uppercase tracking-[0.35em] text-current/70">
            {label}
          </CardDescription>
          <CardTitle className="mt-2 text-3xl font-bold text-secondary-foreground">
            {value}
          </CardTitle>
        </div>

        <div className={taskStageStatIconVariants({ variant })}>
          <Icon className="size-5" />
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-current/80">{description}</p>
      </CardContent>
    </Card>
  );
}

export function MemberContent() {
  const { user } = useAuth();
  const { loading, error, data, refetch } = useMemberDashboard();

  const tasks = data?.tasks ?? [];
  const events = data?.events ?? [];
  const username = user?.username?.trim() || "Membro";

  const taskBuckets = useMemo(() => {
    return {
      today: tasks.filter((task) => task.stage === TaskStage.PENDING),
      week: tasks.filter((task) => task.stage === TaskStage.IN_PROGRESS),
      pending: tasks.filter((task) => task.stage === TaskStage.PENDING),
      overdue: tasks.filter((task) => task.stage === TaskStage.REVIEW),
    };
  }, [tasks]);

  const stats = useMemo(
    () => [
      {
        label: "Hoje",
        value: taskBuckets.today.length,
        description: "Tarefas prontas para o foco atual",
        icon: Clock3,
        variant: "default" as const,
      },
      {
        label: "Semana",
        value: taskBuckets.week.length,
        description: "Itens em andamento",
        icon: CalendarDays,
        variant: "info" as const,
      },
      {
        label: "Pendentes",
        value: taskBuckets.pending.length,
        description: "Aguardando sua ação",
        icon: ListTodo,
        variant: "warning" as const,
      },
      {
        label: "Atrasadas",
        value: taskBuckets.overdue.length,
        description: "Tarefas que precisam de atenção",
        icon: AlertCircle,
        variant: "destructive" as const,
      },
    ],
    [taskBuckets],
  );

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
            <h1 className="tskr-workspace-greating text-2xl sm:text-3xl text-secondary-foreground">
              Olá! {username}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Acompanhe suas tarefas, prioridades e prazos importantes em um só lugar.
            </p>
          </div>
        </section>

        <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <TaskStageStatCard
              key={stat.label}
              label={stat.label}
              value={stat.value}
              description={stat.description}
              icon={stat.icon}
              variant={stat.variant}
            />
          ))}
        </section>

        <section className="flex flex-col gap-4">
          {tasks.length === 0 ? (
            <Card className="border-border/60 bg-card/80 shadow-sm">
              <CardContent className="flex min-h-40 flex-col items-center justify-center rounded-2xl border border-dashed border-border/70 bg-muted/20 px-6 py-10 text-center">
                <p className="text-base font-medium text-foreground">
                  Sem tarefas para exibir
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Assim que houver tarefas atribuídas, elas aparecerão aqui.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              <TaskCategoryAccordion
                visible
                title="Hoje"
                tasks={taskBuckets.today}
              />
              <TaskCategoryAccordion title="Esta semana" tasks={taskBuckets.week} />
              <TaskCategoryAccordion title="Pendente" tasks={taskBuckets.pending} />
              <TaskCategoryAccordion title="Atrasadas" tasks={taskBuckets.overdue} />
            </div>
          )}
        </section>
      </div>

      <div className="h-full xl:row-span-2 xl:h-full">
        <ImportantDates events={events} />
      </div>
    </div>
  );
}
