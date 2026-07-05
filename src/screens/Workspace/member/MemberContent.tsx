import { useMemo } from "react";
import { ImportantDates } from "@/components/ImportantDates";
import { ItalicTitle } from "@/components/base/ItalicTitle";
import { SectionTitle } from "@/components/base/SectionTitle";
import { TaskCategoryAccordion } from "@/components/accordions/TaskCategoryAccordion";
import { Categories, Greating, StateMessage } from "../style";
import { TaskStage } from "@/service/types/task/stage.dto";
import { useMemberDashboard } from "./useMemberDashboard";

export function MemberContent() {
  const { loading, error, data, refetch } = useMemberDashboard();

  const tasks = data?.tasks ?? [];
  const events = data?.events ?? [];

  const taskBuckets = useMemo(() => {
    return {
      today: tasks.filter((task) => task.stage === TaskStage.PENDING),
      week: tasks.filter((task) => task.stage === TaskStage.IN_PROGRESS),
      pending: tasks.filter((task) => task.stage === TaskStage.PENDING),
      overdue: tasks.filter((task) => task.stage === TaskStage.REVIEW),
    };
  }, [tasks]);

  if (loading) {
    return (
      <Categories>
        <Greating><SectionTitle>Hello! MEMBER</SectionTitle></Greating>
        <StateMessage>Carregando tarefas e eventos...</StateMessage>
      </Categories>
    );
  }

  if (error) {
    return (
      <Categories>
        <Greating><SectionTitle>Hello! MEMBER</SectionTitle></Greating>
        <StateMessage>
          {error}
          <button type="button" onClick={refetch}>Tentar novamente</button>
        </StateMessage>
      </Categories>
    );
  }

  return (
    <>
      <Categories>
        <Greating><SectionTitle>Hello! MEMBER</SectionTitle></Greating>
        {
          tasks.length === 0
            ? <ItalicTitle>Sem tarefas para exibir</ItalicTitle>
            : (
              <>
                <TaskCategoryAccordion visible title="Today" tasks={taskBuckets.today} />
                <TaskCategoryAccordion title="This Week" tasks={taskBuckets.week} />
                <TaskCategoryAccordion title="Pending" tasks={taskBuckets.pending} />
                <TaskCategoryAccordion title="Overdue" tasks={taskBuckets.overdue} />
              </>
            )
        }
      </Categories>
      <ImportantDates events={events} />
    </>
  );
}
