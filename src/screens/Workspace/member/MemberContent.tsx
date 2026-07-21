import { Button } from "@/components/buttons/Button";
import { ImportantDates } from "@/components/ImportantDates";
import { TaskCategoryAccordion } from "@/components/accordions/TaskCategoryAccordion";
import { ItalicTitle } from "@/components/base/ItalicTitle";
import { SectionTitle } from "@/components/base/SectionTitle";
import { Text } from "@/components/base/Text";
import { useOrganization } from "@/hooks/useOrganization";
import { Categories, Greating, Main } from "../style";
import { useMemberDashboard } from "./useMemberDashboard";

export function MemberContent() {
  const { org } = useOrganization();
  const { loading, error, data, refetch } = useMemberDashboard(org?.orgkey);

  if (loading) {
    return (
      <Main>
        <Greating><SectionTitle>Hello! MEMBER</SectionTitle></Greating>
        <Text>Carregando dashboard...</Text>
      </Main>
    );
  }

  if (error) {
    return (
      <Main>
        <Greating><SectionTitle>Hello! MEMBER</SectionTitle></Greating>
        <Text>{error}</Text>
        <Button type="button" onClick={() => void refetch()}>Tentar novamente</Button>
      </Main>
    );
  }

  const { taskCategories } = data;
  const hasTasks = data.tasks.length > 0;

  return (
    <>
      <Categories>
        <Greating><SectionTitle>Hello! MEMBER</SectionTitle></Greating>
        {hasTasks ? (
          <>
            <TaskCategoryAccordion visible title="Today" tasks={taskCategories.today} />
            <TaskCategoryAccordion title="To this Week" tasks={taskCategories.thisWeek} />
            <TaskCategoryAccordion title="Pending" tasks={taskCategories.pending} />
            <TaskCategoryAccordion title="Overdue" tasks={taskCategories.overdue} />
          </>
        ) : (
          <ItalicTitle>Nenhuma tarefa encontrada</ItalicTitle>
        )}
      </Categories>
      <ImportantDates events={data.events} />
    </>
  );
}
