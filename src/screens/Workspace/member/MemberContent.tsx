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
import { useAuth } from "@/hooks/useAuth";
import { TaskStage } from "@/service/types/task/stage.dto";

import { useMemberDashboard } from "./useMemberDashboard";
import LoadingState from "@/components/loading-state";

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
  const username = user?.username?.trim() || "Member";

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
            <StatCard
              key={stat.label}
              label={stat.label}
              value={stat.value}
              description={stat.description}
              icon={stat.icon}
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
