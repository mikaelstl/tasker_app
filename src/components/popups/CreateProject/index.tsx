import { Card, Content, Infos, Overlay } from "./style";
import { useState } from "react";
import { CreateButton } from "../../buttons/CreateButton";
import type { CreateProjectDTO } from "../../../service/types/project/create.dto";
import type { PopupProps } from "../popup.props";
import { ContentHeader } from "../../base/ContentHeader";
import { DeleteBtn } from "../../buttons/DeleteBtn";
import { Text } from "../../base/Text";
import { TextInput } from "../../base/TextInput";
import { TextAreaInput } from "../../base/TextAreaInput";
import { CalendarInput } from "../../base/CalendarInput";
import { useToast } from "@/hooks/useToast";
import { useServices } from "../../../hooks/useServices";
import { useOrganization } from "@/hooks/useOrganization";
import type { ApiError } from "@/service/types/response/error";

export function CreateProjectPopup(props: PopupProps) {
  const { ProjectService } = useServices();
  const notifications = useToast();

  const { org } = useOrganization();

  const [projectName, setProjectName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [dueDate, setDueDate] = useState<string>('');
  const [submitting, setSubmitting] = useState(false);

  const handleClose = () => {
    setDescription('');
    setDueDate('');
    setProjectName('');
    props.closePopup();
  }

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();

    if (!org?.orgkey) {
      notifications.warning('Selecione uma organização para criar o projeto');
      return;
    }

    if (!projectName.trim() || !description.trim() || !dueDate) {
      notifications.validation("Preencha nome, descrição e prazo.");
      return;
    }

    const parsedDeadline = new Date(dueDate);
    if (Number.isNaN(parsedDeadline.getTime())) {
      notifications.validation("Informe um prazo válido.");
      return;
    }

    const project: CreateProjectDTO = {
      title: projectName.trim(),
      description: description.trim(),
      deadline: parsedDeadline.toISOString(),
    };

    try {
      setSubmitting(true);
      const response = await ProjectService.create(project);
      notifications.info(response.message || "Projeto criado com sucesso.");
      handleClose();
    } catch (error) {
      const { errors } = error as ApiError;

      if (!errors?.length) {
        notifications.error('Não foi possível criar o projeto');
        return;
      }

      errors.forEach((item) => {
        notifications[item.level](item.message);
      });
    } finally {
      setSubmitting(false);
    }
  }

  if (!props.showPopup) return null;

  return (
    <Overlay className="tskr-popup-overlay">
      <Card as="form" className="tskr-popup-create-project" onSubmit={onSubmit}>
        <ContentHeader
          title="Criar projeto"
        >
          <DeleteBtn onClick={handleClose} />
          <CreateButton type="submit" disabled={submitting}>
            <Text>{submitting ? "Criando..." : "Criar"}</Text>
          </CreateButton>
        </ContentHeader>
        <Content>
          <Infos>
            <TextInput
              label="Nome do projeto"
              value={projectName}
              onChange={(value) => setProjectName(value)}
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
          </Infos>
        </Content>
      </Card>
    </Overlay>
  )
}
