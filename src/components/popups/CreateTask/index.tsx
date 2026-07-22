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
import { SelectInput } from "../../base/SelectInput";
import { SelectMember } from "../../misc/SelectMember";
import { useToast } from "@/hooks/useToast";
import { ContentHeader } from "../../base/ContentHeader";
import { Text } from "../../base/Text";
import { DeleteBtn } from "../../buttons/DeleteBtn";
import type { SelectMemberOption } from "../../misc/SelectMember";
import { useServices } from "../../../hooks/useServices";
import type { ApiError } from "../../../service/types/response/error";

export function CreateTaskPopup(props: PopupProps) {
  const { ProjectService, TaskService } = useServices();
  const notifications = useToast();

  // const navigate = useNavigate();

  const { id } = useParams();

  const [members, setMembers] = useState<SelectMemberOption[]>([]);
  const [taskName, setTaskName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [dueDate, setDueDate] = useState<string>('');
  const [priority, setPriority] = useState<TaskPriority>(TaskPriority.LOW);
  const [owner, setOwner] = useState<string>('');
  const [submitting, setSubmitting] = useState(false);

  const handleClose = () => {
    setDescription('');
    setDueDate('');
    setTaskName('');
    setOwner('');
    setPriority(TaskPriority.LOW);
    props.closePopup();
  }

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();

    if (!id || !taskName.trim() || !description.trim() || !dueDate || !owner) {
      notifications.validation("Preencha nome, descrição, prazo e responsável.");
      return;
    }

    const parsedDeadline = new Date(dueDate);
    if (Number.isNaN(parsedDeadline.getTime())) {
      notifications.validation("Informe um prazo válido.");
      return;
    }

    const task: CreateTaskDTO = {
      name: taskName.trim(),
      description: description.trim(),
      project: id,
      deadline: parsedDeadline.toISOString(),
      owner,
      priority,
    };

    try {
      setSubmitting(true);
      const response = await TaskService.create(task);
      notifications.info(response.message || "Tarefa criada com sucesso.");
      handleClose();
    } catch (requestError) {
      const apiError = requestError as ApiError;
      if (apiError.errors?.length) {
        apiError.errors.forEach((item) => notifications[item.level](item.message));
      } else {
        notifications.error("Não foi possível criar a tarefa.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  useEffect(() => {
    if (!props.showPopup || !id) return;

    void ProjectService.find(id).then(({ data }) => {
      setMembers(data.members.map((member) => ({
        id: member.id,
        username: member.userkey,
      })));
    }).catch(() => {
      setMembers([]);
      setOwner('');
    });
  }, [ProjectService, id, props.showPopup]);

  if (!props.showPopup) return null;

  return (
    <Overlay className="tskr-popup-overlay">
      <Card className="tskr-popup-create-project">
        <ContentHeader
          title="Criar nova tarefa"
        >
          <DeleteBtn onClick={handleClose} />
          <CreateButton type="submit" form="create-task-form" disabled={submitting || members.length === 0}>
            <Text>{submitting ? "Criando..." : "Criar tarefa"}</Text>
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
          <SelectInput
            label="Prioridade"
            type={TaskPriority}
            value={priority}
            onChange={(value) => setPriority(value as TaskPriority)}
          />
        </Form>
        <SelectMember
          label="Responsável"
          data={members}
          onChange={setOwner}
        />
        {members.length === 0 ? <Text>O projeto não possui membros disponíveis para atribuição.</Text> : null}
      </Card>
    </Overlay>
  )
}
