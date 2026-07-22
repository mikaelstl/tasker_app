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
import { useToast } from "@/hooks/useToast";
import { ContentHeader } from "../../base/ContentHeader";
import { Text } from "../../base/Text";
import { DeleteBtn } from "../../buttons/DeleteBtn";
import type { SelectMemberOption } from "../../misc/SelectMember";
import { useServices } from "../../../hooks/useServices";

export function CreateTaskPopup(props: PopupProps) {
  const { MemberService, TaskService } = useServices();
  const { info, error } = useToast();

  // const navigate = useNavigate();

  const { id } = useParams();

  const [members, setMembers] = useState<SelectMemberOption[]>([]);
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
      deadline: new Date(dueDate).toISOString(),
      owner: owner,
      priority: priority
    }

    console.log(task);
    try {
      const response = await TaskService.create(task);
      console.log(response);
      info('Tarefa criada com sucesso');
      setPriority(TaskPriority.LOW)
      props.closePopup();
    } catch (requestError) {
      console.error(requestError);
      error('Não foi possível criar a tarefa');
    }
  }

  useEffect(() => {
    if (!props.showPopup || !id) return;

    void MemberService.list(id).then(({ data }) => {
      setMembers(data.map((member) => ({
        id: member.id,
        username: member.user?.user?.username ?? member.user?.userkey ?? member.userkey,
      })));
    }).catch(() => {
      setMembers([]);
      setOwner('');
    });
  }, [MemberService, id, props.showPopup]);

  if (!props.showPopup) return null;

  return (
    <Overlay className="tskr-popup-overlay">
      <Card className="tskr-popup-create-project">
        <ContentHeader
          title="Criar nova tarefa"
        >
          <DeleteBtn onClick={handleClose} />
          <CreateButton type="submit" form="create-task-form">
            <Text>Criar tarefa</Text>
          </CreateButton>
        </ContentHeader>
        <Form
          id="create-task-form"
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
          onChange={setOwner}
        />
      </Card>
    </Overlay>
  )
}
