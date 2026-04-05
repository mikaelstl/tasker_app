import { useEffect, useState } from "react";
import { Title } from "../../../components/base/Title";
import { CreateButton } from "../../../components/buttons/CreateButton";
import { TaskCard } from "../../../components/cards/TaskCard";
import { Margin } from "../../../components/misc/Margin";
import { Scroller } from "../../../components/misc/Scroller";
import { SearchField } from "../../../components/textfields/SearchField";
import { Container, Content, Step } from "./style";
import { CreateTaskPopup } from "../../../components/popups/CreateTask";
// import { useApi } from "../../../hooks/useApi";
import type { TaskDTO } from "../../../service/types/task/task.dto";
// import { useNavigate, useParams } from "react-router-dom";
// import type { ApiError } from "../../../service/types/response/error";
// import { Toasts } from "../../../maps/toasts";
// import type { TaskQueryDTO } from "../../../service/types/task/query.dto";
import { TaskStage } from "../../../service/types/task/stage.dto";
import Palette from "../../../assets/palette";
import { ContentHeader } from "../../../components/base/ContentHeader";
import { PlusIcon } from "@heroicons/react/16/solid";
import { Text } from "../../../components/base/Text";
import { TaskPriority } from "../../../service/types/task/priority.dto";

export function Tasks() {
  // const api = useApi();

  // const navigate = useNavigate();

  // const { id } = useParams()

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };
  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const [tasks, setTasks] = useState<TaskDTO[]>([]);
  /* const getTasks = async () => {
    try {
      const response = await api.get({
        route: `/tasks`,
        params: {
          projectkey: id
        } as TaskQueryDTO
      });

      console.log(response);

      const data: TaskDTO[] = response.data;

      setTasks(data);
    } catch (error) {
      const { errors } = error as ApiError;

      errors?.forEach(
        err => {
          const notify = Toasts[err.level];
          notify(err.message);
        }
      )

      navigate('../../')
    }
  } */

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
  }, [isPopupOpen]);

  return (
    <Container className="tasks">
      <CreateTaskPopup showPopup={isPopupOpen} closePopup={handleClosePopup} />
      <ContentHeader title="">
        <CreateButton
          type="button"
          onClick={handleOpenPopup}
        >
          <PlusIcon width={20} />
          <Text>New Task</Text>
        </CreateButton>
      </ContentHeader>
      <Margin margin="0px 20px">
        <SearchField filter sort />
      </Margin>
      <Content id="tasks-steps">
        <Step className="tasks-step">
          <Title>PENDING</Title>
          <Scroller className="vertical">
            {
              tasks
                .filter(task => task.stage === TaskStage.PENDING)
                .map((task) =>
                  <Margin bottom="12px">
                    <TaskCard
                      key={task.id}
                      title={task.name}
                      due_date={task.due_date}
                      priority={task.priority}
                    />
                  </Margin>
                )
            }
          </Scroller>
        </Step>
        <Step className="tasks-step" color={Palette.blue}>
          <Title>STATED</Title>
          <Scroller className="vertical">
            {
              tasks
                .filter(task => task.stage === TaskStage.IN_PROGRESS)
                .map((task) =>
                  <Margin bottom="12px">
                    <TaskCard
                      key={task.id}
                      title={task.name}
                      due_date={task.due_date}
                      priority={task.priority}
                    />
                  </Margin>
                )
            }
          </Scroller>
        </Step>
        <Step className="tasks-step" color={Palette.yellow}>
          <Title>REVIEW</Title>
          <Scroller className="vertical">
            {
              tasks
                .filter(task => task.stage === TaskStage.REVIEW)
                .map((task) =>
                  <Margin bottom="12px">
                    <TaskCard
                      key={task.id}
                      title={task.name}
                      due_date={task.due_date}
                      priority={task.priority}
                    />
                  </Margin>
                )
            }
          </Scroller>
        </Step>
        <Step className="tasks-step" color={Palette.green}>
          <Title>DONE</Title>
          <Scroller className="vertical">
            {
              tasks
                .filter(task => task.stage === TaskStage.DONE)
                .map((task) =>
                  <Margin bottom="12px">
                    <TaskCard
                      key={task.id}
                      title={task.name}
                      due_date={task.due_date}
                      priority={task.priority}
                    />
                  </Margin>
                )
            }
          </Scroller>
        </Step>
        <Step className="tasks-step" color={Palette.red}>
          <Title>OVERDUE</Title>
          <Scroller className="vertical">
            {
              tasks
                .filter(task => task.stage === TaskStage.DONE)
                .map((task) =>
                  <Margin bottom="12px">
                    <TaskCard
                      key={task.id}
                      title={task.name}
                      due_date={task.due_date}
                      priority={task.priority}
                    />
                  </Margin>
                )
            }
          </Scroller>
        </Step>
      </Content>
    </Container>
  )
}