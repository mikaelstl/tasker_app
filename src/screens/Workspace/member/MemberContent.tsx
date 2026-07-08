import type { ReactNode } from "react";
import { useMemo } from "react";
import {
  AlertCircle,
  CalendarDays,
  Clock3,
  ListTodo,
  RefreshCw,
} from "lucide-react";

import { ImportantDates } from "@/components/ImportantDates";
import { TaskCategoryAccordion } from "@/components/accordions/TaskCategoryAccordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import { TaskStage } from "@/service/types/task/stage.dto";

import { useMemberDashboard } from "./useMemberDashboard";

type StatCardProps = {
  label: string;
  value: number;
  description: string;
  icon: ReactNode;
};

function StatCard({ label, value, description, icon }: StatCardProps) {
  return (
    <Card size="sm" className="border-border/60 shadow-sm">
      <CardContent className="flex items-start justify-between gap-4 p-4">
        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
            {label}
          </p>
          <p className="text-2xl font-semibold leading-none">
            {value}
          </p>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <div className="rounded-full border border-border bg-muted p-2 text-muted-foreground">
          {icon}
        </div>
      </CardContent>
    </Card>
  );
}

function LoadingState() {
  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
      <Card className="border-border/60 bg-card/80 shadow-sm">
        <CardHeader className="space-y-3">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-8 w-56" />
          <Skeleton className="h-4 w-full max-w-lg" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <Skeleton className="h-24 rounded-xl" />
            <Skeleton className="h-24 rounded-xl" />
            <Skeleton className="h-24 rounded-xl" />
            <Skeleton className="h-24 rounded-xl" />
          </div>
          <Separator />
          <div className="space-y-3">
            <Skeleton className="h-12 w-full rounded-xl" />
            <Skeleton className="h-12 w-full rounded-xl" />
            <Skeleton className="h-12 w-full rounded-xl" />
            <Skeleton className="h-12 w-full rounded-xl" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/60 bg-card/80 shadow-sm">
        <CardHeader className="space-y-3">
          <Skeleton className="h-5 w-36" />
          <Skeleton className="h-4 w-48" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-16 w-full rounded-xl" />
          <Skeleton className="h-16 w-full rounded-xl" />
          <Skeleton className="h-16 w-full rounded-xl" />
        </CardContent>
      </Card>
    </div>
  );
}

function ErrorState({
  error,
  refetch,
}: {
  error: string;
  refetch: () => void;
}) {
  return (
    <Card className="border-border/60 bg-card/80 shadow-sm">
      <CardHeader className="space-y-3">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="gap-1.5">
            <AlertCircle className="size-3.5" />
            Falha ao carregar
          </Badge>
        </div>
        <CardTitle className="text-2xl">Hello! MEMBER</CardTitle>
        <CardDescription>
          Não foi possível carregar seu painel neste momento.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <p className="text-sm text-muted-foreground">{error}</p>
        <div>
          <Button type="button" variant="secondary" onClick={refetch}>
            <RefreshCw className="size-4" />
            Tentar novamente
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export function MemberContent() {
  const { user } = useAuth();
  const { loading, error, data, refetch } = useMemberDashboard();

  const tasks = data?.tasks ?? [];
  const events = data?.events ?? [];
  const username = user?.username?.trim() || "MEMBER";

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
        icon: <Clock3 className="size-4" />,
      },
      {
        label: "Semana",
        value: taskBuckets.week.length,
        description: "Itens em andamento",
        icon: <CalendarDays className="size-4" />,
      },
      {
        label: "Pendentes",
        value: taskBuckets.pending.length,
        description: "Aguardando sua ação",
        icon: <ListTodo className="size-4" />,
      },
      {
        label: "Atrasadas",
        value: taskBuckets.overdue.length,
        description: "Tarefas que precisam de atenção",
        icon: <AlertCircle className="size-4 text-destructive" />,
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
    <div className="grid xl:grid-cols-[minmax(0,1fr)_360px]">
      <Card className="bg-transparent shadow-sm">
        <CardHeader className="space-y-3">
          <CardTitle className="tskr-workspace-greating text-2xl sm:text-3xl">
            Olá! {username}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <StatCard
                key={stat.label}
                label={stat.label}
                value={stat.value}
                description={stat.description}
                icon={stat.icon}
              />
            ))}
          </div>

          {tasks.length === 0 ? (
            <div className="flex min-h-40 flex-col items-center justify-center rounded-2xl border border-dashed border-border/70 bg-muted/20 px-6 py-10 text-center">
              <p className="text-base font-medium text-foreground">
                Sem tarefas para exibir
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Assim que houver tarefas atribuídas, elas aparecerão aqui.
              </p>
            </div>
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
        </CardContent>
      </Card>

      <div className="min-w-0">
        <ImportantDates events={events} />
      </div>
    </div>
  );
}
