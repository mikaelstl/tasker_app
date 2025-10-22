import { XMarkIcon } from "@heroicons/react/16/solid";
import { Card, Close, Header, Overlay } from "./style";
import { Title } from "../../base/Title";
import { TextInput } from "../../base/TextInput";
import { TextAreaInput } from "../../base/TextAreaInput";
import { CalendarInput } from "../../base/CalendarInput";
import { useEffect, useState } from "react";
import { CreateButton } from "../../buttons/CreateButton";
import { useApi } from "../../../hooks/useApi";
import { Form } from "../../misc/Form/style";
import type { PopupProps } from "../popup.props";
import type { CreateTaskDTO } from "../../../service/types/task/create.dto";
import { useNavigate, useParams } from "react-router-dom";
import { TaskPriority } from "../../../service/types/task/priority.dto";
import { SelectInput } from "../../base/SelectInput";
import { SearchMember } from "../../textfields/SearchMember";
import type { ProjectMember } from "../../../service/types/member/member.dto";
import type { ApiError } from "../../../service/types/response/error";
import { Toasts } from "../../../maps/toasts";

export function CreateTaskPopup(props: PopupProps) {
  const api = useApi();

  const navigate = useNavigate();

  const { id } = useParams();

  const [members, setMembers] = useState<ProjectMember[]>([]);
  const getMembers = async () => {
    try {
      const response = await api.get({
        route: `/project/${id}/members`,
      });

      console.log('MEMBERS >>>> ',response.data);

      const data: ProjectMember[] = response.data;

      setMembers(data);
    } catch (error) {
      const { errors } = error as ApiError;

      errors?.forEach(
        err => {
          const notify = Toasts[err.level];
          notify(err.message);
        }
      );

      navigate('../../');
    }
  }

  const [taskName, setTaskName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [dueDate, setDueDate] = useState<string>('');
  const [priority, setPriority] = useState<TaskPriority>(TaskPriority.LOW);
  const [owner, setOwner] = useState<string>('');

  const handleClose = () => {
    setDescription('');
    setDueDate('');
    setTaskName('');
    props.closePopup();
  }

  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();

    const task: CreateTaskDTO = {
      name: taskName,
      description: description,
      project: id!,
      due_date: new Date(dueDate),
      owner: owner,
      priority: priority
    }

    console.log(task);
    api.post<CreateTaskDTO>({
      route: '/tasks',
      data: task
    }).then(
      response => {
        console.log(response);
        Toasts['info']('Created task with success')
      }
    );

    setPriority(TaskPriority.LOW)
    props.closePopup();
  }

  useEffect(() => {
    getMembers();
  }, []);

  if (!props.showPopup) return null;

  return (
    <Overlay className="popup-overlay">
      <Card className="popup-create-project">
        <Header>
          <Title>Create new task</Title>
          <Close onClick={handleClose}><XMarkIcon width={24} /></Close>
        </Header>
        <Form onSubmit={onSubmit}>
          <TextInput
            label="Task name"
            value={taskName}
            onChange={(value) => setTaskName(value)}
          />
          <TextAreaInput
            label="Description"
            value={description}
            onChange={(value) => setDescription(value)}
          />
          <CalendarInput
            label="Due date"
            value={dueDate}
            onChange={(value) => setDueDate(value)}
          />
          <SelectInput
            label="Priority"
            value={priority}
            type={TaskPriority}
            onChange={(value) => setPriority(value)}
          />
          <SearchMember
            label="Owner"
            data={members}
            onChange={(value) => setOwner(value)}
          />
          <CreateButton type="submit">Create task</CreateButton>
        </Form>
      </Card>
    </Overlay>
  )
}