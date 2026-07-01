import { SectionTitle } from "@/components/base/SectionTitle";
import { Categories, Greating } from "../../style";
import { TaskCategoryAccordion } from "@/components/accordions/TaskCategoryAccordion";
import { ImportantDates } from "@/components/ImportantDates";
import { useEffect, useState } from "react";
import type { TaskDTO } from "@/service/types/task/task.dto";
import { TaskStage } from "@/service/types/task/stage.dto";
import { TaskPriority } from "@/service/types/task/priority.dto";

export function MemberContent () {
  const [tasks, setTasks] = useState<TaskDTO[]>([]);

  useEffect(() => {
    setTasks([{
      id: '73187165-f888-4a26-9df6-d7c8d39a6e81',
      code: 'TSK-001',
      name: 'Tarefa 01',
      description: 'Primeira tarefa de teste',
      project: 'c45d24bf-8933-4421-9685-863b3b285a94',
      owner: '',
      stage: TaskStage.PENDING,
      priority: TaskPriority.MEDIUM,
      due_date: new Date().toISOString(),
    }, {
      id: '73187165-f888-4a26-9df6-d7c8d39a6e81',
      code: 'TSK-001',
      name: 'Tarefa 01',
      description: 'Primeira tarefa de teste',
      project: 'c45d24bf-8933-4421-9685-863b3b285a94',
      owner: '',
      stage: TaskStage.PENDING,
      priority: TaskPriority.EXTREME,
      due_date: new Date().toISOString(),
    }, {
      id: '73187165-f888-4a26-9df6-d7c8d39a6e81',
      code: 'TSK-001',
      name: 'Tarefa 01',
      description: 'Primeira tarefa de teste',
      project: 'c45d24bf-8933-4421-9685-863b3b285a94',
      owner: '',
      stage: TaskStage.PENDING,
      priority: TaskPriority.HIGH,
      due_date: new Date().toISOString(),
    }, {
      id: '73187165-f888-4a26-9df6-d7c8d39a6e81',
      code: 'TSK-001',
      name: 'Tarefa 01',
      description: 'Primeira tarefa de teste',
      project: 'c45d24bf-8933-4421-9685-863b3b285a94',
      owner: '',
      stage: TaskStage.PENDING,
      priority: TaskPriority.MEDIUM,
      due_date: new Date().toISOString(),
    }, {
      id: '73187165-f888-4a26-9df6-d7c8d39a6e81',
      code: 'TSK-001',
      name: 'Tarefa 01',
      description: 'Primeira tarefa de teste',
      project: 'c45d24bf-8933-4421-9685-863b3b285a94',
      owner: '',
      stage: TaskStage.PENDING,
      priority: TaskPriority.MEDIUM,
      due_date: new Date().toISOString(),
    }]);
  }, [])

  return (
    <>
      <Categories>
        <Greating><SectionTitle>Hello! MEMBER</SectionTitle></Greating>
        <TaskCategoryAccordion
          visible
          title="Today"
          tasks={tasks}
        />
        <TaskCategoryAccordion
          title="To this Week"
          tasks={tasks}
        />
        <TaskCategoryAccordion
          title="Pending"
          tasks={tasks}
        />
        <TaskCategoryAccordion
          title="Overdue"
          tasks={tasks}
        />
      </Categories>
      <ImportantDates events={[]} />
    </>
  )
}