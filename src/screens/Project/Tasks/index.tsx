import { useEffect, useState } from "react";
import { Title } from "../../../components/base/Title";
import { CreateButton } from "../../../components/buttons/CreateButton";
import { TaskCard } from "../../../components/cards/TaskCard";
import { Margin } from "../../../components/misc/Margin";
import { Scroller } from "../../../components/misc/Scroller";
import { ProjectMenu } from "../../../components/ProjectMenu";
import { SearchField } from "../../../components/textfields/SearchField";
import { Container, Content, Header, Step } from "./style";
import { CreateTaskPopup } from "../../../components/popups/CreateTask";
import { useApi } from "../../../hooks/useApi";
import type { TaskDTO } from "../../../service/types/task/task.dto";
import { useNavigate, useParams } from "react-router-dom";
import type { ApiError } from "../../../service/types/response/error";
import { Toasts } from "../../../maps/toasts";
import type { TaskQueryDTO } from "../../../service/types/task/query.dto";
import { TaskStage } from "../../../service/types/task/stage.dto";

export function Tasks() {
  const api = useApi();

  const navigate = useNavigate();

  const { id } = useParams()

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };
  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const [tasks, setTasks] = useState<TaskDTO[]>([]);
  const getTasks = async () => {
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
  }

  useEffect(() => {
    getTasks();
  }, [isPopupOpen]);

  return (
    <Container className="tasks">
      <CreateTaskPopup showPopup={isPopupOpen} closePopup={handleClosePopup} />
      <Header id="tasks-header">
        <ProjectMenu />
        <CreateButton type="button" onClick={handleOpenPopup}>New Task</CreateButton>
      </Header>
      <SearchField filter sort />
      <Content id="taks-steps">
        <Step className="tasks-step">
          <Title>Pending</Title>
          <Scroller className="vertical">
            {
              tasks
                .filter(task => task.stage === TaskStage.PENDING)
                .map((task) =>
                  <Margin bottom="12px">
                    <TaskCard
                      key={task.id}
                      title={task.name}
                      description={task.description}
                      date={task.due_date}
                    />
                  </Margin>
                )
            }
          </Scroller>
        </Step>
        <Step className="tasks-step">
          <Title>Development</Title>
          <Scroller className="vertical">
            {
              tasks
                .filter(task => task.stage === TaskStage.IN_PROGRESS)
                .map((task) =>
                  <Margin bottom="12px">
                    <TaskCard
                      key={task.id}
                      title={task.name}
                      description={task.description}
                      date={task.due_date}
                    />
                  </Margin>
                )
            }
          </Scroller>
        </Step>
        <Step className="tasks-step">
          <Title>Review</Title>
          <Scroller className="vertical">
            {
              tasks
                .filter(task => task.stage === TaskStage.REVIEW)
                .map((task) =>
                  <Margin bottom="12px">
                    <TaskCard
                      key={task.id}
                      title={task.name}
                      description={task.description}
                      date={task.due_date}
                    />
                  </Margin>
                )
            }
          </Scroller>
        </Step>
        <Step className="tasks-step">
          <Title>Done</Title>
          <Scroller className="vertical">
            {
              tasks
                .filter(task => task.stage === TaskStage.DONE)
                .map((task) =>
                  <Margin bottom="12px">
                    <TaskCard
                      key={task.id}
                      title={task.name}
                      description={task.description}
                      date={task.due_date}
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