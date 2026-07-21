import { Card, Overlay } from "./style";
import { TextInput } from "../../base/TextInput";
import { TextAreaInput } from "../../base/TextAreaInput";
import { CalendarInput } from "../../base/CalendarInput";
import { useEffect, useState } from "react";
import { CreateButton } from "../../buttons/CreateButton";
import { Form } from "../../misc/Form/style";
import type { PopupProps } from "../popup.props";
import type { CreateTaskDTO } from "../../../service/types/task/create.dto";
import { useParams } from "react-router-dom";
import { TaskPriority } from "../../../service/types/task/priority.dto";
import { SelectMember } from "../../misc/SelectMember";
import { Toasts } from "../../../maps/toasts";
import { ContentHeader } from "../../base/ContentHeader";
import { Text } from "../../base/Text";
import { DeleteBtn } from "../../buttons/DeleteBtn";
import type { UserDTO } from "../../../service/types/user/user.dto";
import { useServices } from "../../../hooks/useServices";

export function CreateTaskPopup(props: PopupProps) {
  const { TaskService } = useServices();

  // const navigate = useNavigate();

  const { id } = useParams();

  const [members, setMembers] = useState<UserDTO[]>([]);
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

  const onSubmit = async (ev: React.FormEvent) => {
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
    try {
      const response = await TaskService.create(task);
      console.log(response);
      Toasts['info']('Tarefa criada com sucesso');
      setPriority(TaskPriority.LOW)
      props.closePopup();
    } catch (error) {
      console.error(error);
      Toasts['error']('Não foi possível criar a tarefa');
    }
  }

  useEffect(() => {
    setOwner('mikaelst')
    setMembers([{
      id: '648c864f',
      name: 'mikael',
      username: 'mikaelst',
    }, {
      id: '38b45656',
      name: 'jubiscleiton',
      username: 'jubscltn',
    }, {
      id: '2d715ef9',
      name: 'aristovaldo',
      username: 'valdo.ari',
    }]);
  }, []);

  if (!props.showPopup) return null;

  return (
    <Overlay className="tskr-popup-overlay">
      <Card className="tskr-popup-create-project">
        <ContentHeader
          title="Criar nova tarefa"
        >
          <DeleteBtn onClick={handleClose} />
          <CreateButton type="submit">
            <Text>Criar tarefa</Text>
          </CreateButton>
        </ContentHeader>
        <Form
          className="tskr-create-task-form"
          onSubmit={onSubmit}
        >
          <TextInput
            label="Nome da tarefa"
            value={taskName}
            onChange={(value) => setTaskName(value)}
          />
          <TextAreaInput
            label="Descrição"
            value={description}
            onChange={(value) => setDescription(value)}
          />
          <CalendarInput
            label="Prazo"
            value={dueDate}
            onChange={(value) => setDueDate(value)}
          />
        </Form>
        <SelectMember
          label="Responsável"
          data={members}
        />
      </Card>
    </Overlay>
  )
}
