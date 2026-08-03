import { useCallback, useEffect, useState } from "react";
import { Title } from "../../../components/base/Title";
import { CreateButton } from "../../../components/buttons/CreateButton";
import { TaskCard } from "../../../components/cards/TaskCard";
import { Margin } from "../../../components/misc/Margin";
import { Scroller } from "../../../components/misc/Scroller";
import { SearchField } from "../../../components/textfields/SearchField";
import { Container, Content, Step } from "./style";
import { CreateTaskPopup } from "../../../components/popups/CreateTask";
import type { TaskWithOwnerDTO } from "../../../service/types/task/task.dto";
import type { ApiError } from "../../../service/types/response/error";
import { TaskStage } from "../../../service/types/task/stage.dto";
import Palette from "../../../assets/palette";
import { ContentHeader } from "../../../components/base/ContentHeader";
import { AddCircle as PlusIcon } from "@/components/icons/solar-icons";
import { Text } from "../../../components/base/Text";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/hooks/useToast";
import { useServices } from "../../../hooks/useServices";
import { TaskPriority } from "../../../service/types/task/priority.dto";

const priorityOrder = [
  TaskPriority.EXTREME,
  TaskPriority.HIGH,
  TaskPriority.MEDIUM,
  TaskPriority.LOW,
];

function normalizeSearchTerm(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pt-BR")
    .trim();
}

export function Tasks() {
  const navigate = useNavigate();
  const notifications = useToast();
  const { id } = useParams();
  const { TaskService } = useServices();

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [search, setSearch] = useState("");
  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };
  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const [tasks, setTasks] = useState<TaskWithOwnerDTO[]>([]);
  const loadTasks = useCallback(async () => {
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

      navigate("/home/projects", { replace: true });
    }
  }, [TaskService, id, navigate, notifications]);

  useEffect(() => {
    void loadTasks();
  }, [isPopupOpen, loadTasks]);

  const normalizedSearch = normalizeSearchTerm(search);
  const filteredTasks = tasks
    .filter((task) => {
      if (!normalizedSearch) return true;

      const name = normalizeSearchTerm(task.name);
      const code = normalizeSearchTerm(task.code);

      return name.includes(normalizedSearch) || code.includes(normalizedSearch);
    })
    .sort((left, right) => priorityOrder.indexOf(right.priority) - priorityOrder.indexOf(left.priority));

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
        <SearchField
          value={search}
          onChange={setSearch}
          placeholder="Pesquisar tarefas por nome ou código"
        />
      </Margin>
      <Content id="tasks-steps">
        <Step className="tasks-step">
          <Title>PENDENTES</Title>
          <Scroller orientation="vertical">
            {
              filteredTasks
                .filter(task => task.stage === TaskStage.PENDING)
                .map((task) =>
                  <Margin key={task.id} bottom="12px">
                    <TaskCard
                      projectkey={task.projectkey}
                      code={task.code}
                      title={task.name}
                      owner={task.owner.userkey}
                      deadline={task.deadline}
                      priority={task.priority}
                    />
                  </Margin>
                )
            }
          </Scroller>
        </Step>
        <Step className="tasks-step" color={Palette.blue}>
          <Title>INICIADAS</Title>
          <Scroller orientation="vertical">
            {
              filteredTasks
                .filter(task => task.stage === TaskStage.STARTED)
                .map((task) =>
                  <Margin key={task.id} bottom="12px">
                    <TaskCard
                      projectkey={task.projectkey}
                      code={task.code}
                      title={task.name}
                      owner={task.owner.userkey}
                      deadline={task.deadline}
                      priority={task.priority}
                    />
                  </Margin>
                )
            }
          </Scroller>
        </Step>
        <Step className="tasks-step" color={Palette.yellow}>
          <Title>EM REVISÃO</Title>
          <Scroller orientation="vertical">
            {
              filteredTasks
                .filter(task => task.stage === TaskStage.REVIEW)
                .map((task) =>
                  <Margin key={task.id} bottom="12px">
                    <TaskCard
                      projectkey={task.projectkey}
                      code={task.code}
                      title={task.name}
                      owner={task.owner.userkey}
                      deadline={task.deadline}
                      priority={task.priority}
                    />
                  </Margin>
                )
            }
          </Scroller>
        </Step>
        <Step className="tasks-step" color={Palette.green}>
          <Title>CONCLUÍDAS</Title>
          <Scroller orientation="vertical">
            {
              filteredTasks
                .filter(task => task.stage === TaskStage.DONE)
                .map((task) =>
                  <Margin key={task.id} bottom="12px">
                    <TaskCard
                      projectkey={task.projectkey}
                      code={task.code}
                      title={task.name}
                      owner={task.owner.userkey}
                      deadline={task.deadline}
                      priority={task.priority}
                    />
                  </Margin>
                )
            }
          </Scroller>
        </Step>
        <Step className="tasks-step" color={Palette.red}>
          <Title>ATRASADAS</Title>
          <Scroller orientation="vertical">
            {
              filteredTasks
                .filter(task => task.delayed)
                .map((task) =>
                  <Margin key={task.id} bottom="12px">
                    <TaskCard
                      projectkey={task.projectkey}
                      code={task.code}
                      title={task.name}
                      owner={task.owner.userkey}
                      deadline={task.deadline}
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
