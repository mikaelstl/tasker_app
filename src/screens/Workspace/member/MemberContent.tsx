import { Button } from "@/components/buttons/Button";
import { ImportantDates } from "@/components/ImportantDates";
import { TaskCategoryAccordion } from "@/components/accordions/TaskCategoryAccordion";
import { ItalicTitle } from "@/components/base/ItalicTitle";
import { SectionTitle } from "@/components/base/SectionTitle";
import { Text } from "@/components/base/Text";
import { useOrganization } from "@/hooks/useOrganization";
import { Categories, Greating, Main } from "../style";
import { useMemberDashboard } from "./useMemberDashboard";

interface MemberContentProps {
  username: string;
}

export function MemberContent({ username }: MemberContentProps) {
  const { org } = useOrganization();
  const { loading, error, data, loadDashboard } = useMemberDashboard(org?.orgkey);

  if (loading) {
    return (
      <Main>
        <Greating><SectionTitle>Olá, {username}!</SectionTitle></Greating>
        <Text>Carregando dashboard...</Text>
      </Main>
    );
  }

  if (error) {
    return (
      <Main>
        <Greating><SectionTitle>Olá, {username}!</SectionTitle></Greating>
        <Text>{error}</Text>
        <Button type="button" onClick={() => void loadDashboard()}>Tentar novamente</Button>
      </Main>
    );
  }

  const { taskCategories } = data;
  const hasTasks = data.tasks.length > 0;

  return (
    <>
      <Categories>
        <Greating><SectionTitle>Olá, {username}!</SectionTitle></Greating>
        {hasTasks ? (
          <>
            <TaskCategoryAccordion visible title="Hoje" tasks={taskCategories.today} />
            <TaskCategoryAccordion title="Nesta semana" tasks={taskCategories.thisWeek} />
            <TaskCategoryAccordion title="Pendentes" tasks={taskCategories.pending} />
            <TaskCategoryAccordion title="Atrasadas" tasks={taskCategories.overdue} />
          </>
        ) : (
          <ItalicTitle>Nenhuma tarefa encontrada</ItalicTitle>
        )}
      </Categories>
      <ImportantDates events={data.events} />
    </>
  );
}
