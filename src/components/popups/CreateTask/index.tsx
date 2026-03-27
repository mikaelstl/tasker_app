import { Card, Overlay } from "./style";
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
import { SelectMember } from "../../misc/SelectMember";
import { Toasts } from "../../../maps/toasts";
import { ContentHeader } from "../../base/ContentHeader";
import { Text } from "../../base/Text";
import { DeleteBtn } from "../../buttons/DeleteBtn";
import type { UserDTO } from "../../../service/types/user/user.dto";

export function CreateTaskPopup(props: PopupProps) {
  const api = useApi();

  const navigate = useNavigate();

  const { id } = useParams();

  const [members, setMembers] = useState<UserDTO[]>([{
    id: '648c864f',
    name: 'mikael',
    username: 'mikaelst',
  },{
    id: '38b45656',
    name: 'jubiscleiton',
    username: 'jubscltn',
  },{
    id: '2d715ef9',
    name: 'aristovaldo',
    username: 'valdo.ari',
  }]);
  /* const getMembers = async () => {
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
  } */

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
    // getMembers();
  }, []);

  if (!props.showPopup) return null;

  return (
    <Overlay className="tskr-popup-overlay">
      <Card className="tskr-popup-create-project">
        <ContentHeader
          title="Create new Task"
        >
          <DeleteBtn onClick={handleClose}/>
          <CreateButton type="submit">
            <Text>Create task</Text>
          </CreateButton>
        </ContentHeader>
        <Form
          className="tskr-create-task-form"
          onSubmit={onSubmit}
        >
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
        </Form>
        <SelectMember
          label="Owner"
          data={members}
        />
      </Card>
    </Overlay>
  )
}