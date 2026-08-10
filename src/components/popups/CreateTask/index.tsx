import { Card, MemberSection, Notice, Overlay } from "./style";
import { TextInput } from "../../base/TextInput";
import { TextAreaInput } from "../../base/TextAreaInput";
import { CalendarInput } from "../../base/CalendarInput";
import { useCallback, useEffect, useState } from "react";
import { CreateButton } from "../../buttons/CreateButton";
import { Form } from "../../misc/Form/style";
import type { PopupProps } from "../popup.props";
import type { CreateTaskDTO } from "../../../service/types/task/create.dto";
import { useParams } from "react-router-dom";
import { TaskPriority } from "../../../service/types/task/priority.dto";
import { SelectInput } from "../../base/SelectInput";
import { useToast, type ToastNotifications } from "@/hooks/useToast";
import { ContentHeader } from "../../base/ContentHeader";
import { Text } from "../../base/Text";
import { DeleteBtn } from "../../buttons/DeleteBtn";
import { useServices } from "../../../hooks/useServices";
import type { ApiError } from "../../../service/types/response/error";
import type { ProjectMember } from "@/service/types/member/member.dto";
import { User } from "../../misc/User";
import {
  InfoLabel,
  ManagerCurrent,
  ManagerField,
  ManagerSelect,
} from "../../../screens/Project/Edit/style";
import { useOrganization } from "@/hooks/useOrganization";
import { OrgRole } from "@/utils/enums/OrgRole";

function reportApiError(
  error: unknown,
  fallback: string,
  notifications: ToastNotifications,
) {
  const { errors } = error as ApiError;

  if (!errors?.length) {
    notifications.error(fallback);
    return;
  }

  errors.forEach((item) => {
    notifications[item.level](item.message);
  });
}

export function CreateTaskPopup(props: PopupProps) {
  const { MemberService, TaskService } = useServices();
  const notifications = useToast();

  const { org } = useOrganization();

  const { id } = useParams();

  const [members, setMembers] = useState<ProjectMember[]>([]);
  const [taskName, setTaskName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [dueDate, setDueDate] = useState<string>('');
  const [priority, setPriority] = useState<TaskPriority>(TaskPriority.LOW);
  const [owner, setOwner] = useState<string>('');
  const [submitting, setSubmitting] = useState(false);

  const handleClose = useCallback(() => {
    setDescription('');
    setDueDate('');
    setTaskName('');
    setOwner('');
    setPriority(TaskPriority.LOW);
    props.closePopup();
  }, [props.closePopup]);

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

  const loadMembers = useCallback(async () => {
    if (!id) return;

    try {
      const response = await MemberService.list(id);

      setMembers(response.data);
      const loggedMember = response.data.find((member) => member.userkey === org?.affiliationId);
      const defaultOwner = org?.role === OrgRole.MEMBER
        ? loggedMember?.id ?? ""
        : response.data[0]?.id ?? "";

      setOwner(defaultOwner);
    } catch (error) {
      reportApiError(error, "Não foi possível carregar os membros do projeto.", notifications);
      props.closePopup();
    }
  }, [MemberService, id, notifications, org?.affiliationId, org?.role, props.closePopup]);

  useEffect(() => {
    if (!props.showPopup || !id) return;

    void loadMembers();
  }, [id, loadMembers, props.showPopup]);

  const selectedMember = members.find((member) => member.id === owner);
  const isMember = org?.role === OrgRole.MEMBER;

  useEffect(() => {
    if (!props.showPopup) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") handleClose();
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [handleClose, props.showPopup]);

  if (!props.showPopup) return null;

  return (
    <Overlay className="tskr-popup-overlay" onMouseDown={handleClose}>
      <Card
        className="tskr-popup-create-task"
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-task-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <ContentHeader
          title="Criar nova tarefa"
          titleId="create-task-title"
        >
          <DeleteBtn onClick={handleClose} />
          <CreateButton type="submit" form="create-task-form" disabled={submitting || members.length === 0}>
            <Text>{submitting ? "Criando..." : "Criar tarefa"}</Text>
          </CreateButton>
        </ContentHeader>
        <Form
          id="create-task-form"
          as="form"
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

        <MemberSection>
          <ManagerField>
            <InfoLabel>Responsável</InfoLabel>
            <ManagerCurrent>
              {selectedMember ? (
                <User affiliationId={selectedMember.userkey} />
              ) : (
                <Text>Nenhum responsável definido</Text>
              )}
            </ManagerCurrent>

            {
              org?.role !== OrgRole.MEMBER
                ? (<ManagerSelect
                  value={owner}
                  onChange={(event) => setOwner(event.target.value)}
                  disabled={isMember || members.length === 0}
                >
                  <option value="">Selecione um responsável</option>
                  {members.map((member) => (
                    <option key={member.id} value={member.id}>
                      {member.user?.userkey ?? member.user?.user?.username ?? member.userkey}
                    </option>
                  ))}
                </ManagerSelect>
                ) : null}
          </ManagerField>
        </MemberSection>

        {members.length === 0 ? <Notice>O projeto não possui membros disponíveis para atribuição.</Notice> : null}
      </Card>
    </Overlay>
  )
}
