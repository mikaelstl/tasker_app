import { useEffect, useState } from "react";
import { Title } from "../../../components/base/Title";
import { CreateButton } from "../../../components/buttons/CreateButton";
import { TaskCard } from "../../../components/cards/TaskCard";
import { Margin } from "../../../components/misc/Margin";
import { Scroller } from "../../../components/misc/Scroller";
import { SearchField } from "../../../components/textfields/SearchField";
import { Container, Content, Step } from "./style";
import { CreateTaskPopup } from "../../../components/popups/CreateTask";
import type { TaskDTO } from "../../../service/types/task/task.dto";
import type { ApiError } from "../../../service/types/response/error";
import { TaskStage } from "../../../service/types/task/stage.dto";
import Palette from "../../../assets/palette";
import { ContentHeader } from "../../../components/base/ContentHeader";
import { PlusIcon } from "@heroicons/react/16/solid";
import { Text } from "../../../components/base/Text";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/hooks/useToast";
import { useServices } from "../../../hooks/useServices";

export function Tasks() {
  const navigate = useNavigate();
  const notifications = useToast();
  const { id } = useParams();
  const { TaskService } = useServices();

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };
  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const [tasks, setTasks] = useState<TaskDTO[]>([]);
  const loadTasks = async () => {
    try {
      if (!id) return;
      const response = await TaskService.list(id);
      setTasks(response.data);
    } catch (error) {
      const { errors } = error as ApiError;

      errors?.forEach(
        err => {
          notifications[err.level](err.message);
        }
      )

      navigate('../../')
    }
  }

  useEffect(() => {
    void loadTasks();
  }, [TaskService, isPopupOpen, id]);

  return (
    <Container className="tasks">
      <CreateTaskPopup showPopup={isPopupOpen} closePopup={handleClosePopup} />
      <ContentHeader title="">
        <CreateButton
          type="button"
          onClick={handleOpenPopup}
        >
          <PlusIcon width={20} />
          <Text>Nova tarefa</Text>
        </CreateButton>
      </ContentHeader>
      <Margin margin="0px 20px">
        <SearchField filter sort />
      </Margin>
      <Content id="tasks-steps">
        <Step className="tasks-step">
          <Title>PENDENTES</Title>
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
          <Title>INICIADAS</Title>
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
          <Title>EM REVISÃO</Title>
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
          <Title>CONCLUÍDAS</Title>
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
          <Title>ATRASADAS</Title>
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
