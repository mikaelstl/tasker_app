import { XMarkIcon } from "@heroicons/react/16/solid";
import { Card, Close, Header, Overlay } from "./style";
import { Title } from "../../base/Title";
import { TextInput } from "../../base/TextInput";
import { TextAreaInput } from "../../base/TextAreaInput";
import { CalendarInput } from "../../base/CalendarInput";
import { useState } from "react";
import { CreateButton } from "../../buttons/CreateButton";
import { useApi } from "../../../hooks/useApi";
import type { CreateProjectDTO } from "../../../service/types/project/create.dto";
import { useAuth } from "../../../hooks/useAuth";
import { Form } from "../../misc/Form/style";
import type { PopupProps } from "../popup.props";

export function CreateProjectPopup(props: PopupProps) {
  const api = useApi();

  const { user } = useAuth();

  const [projectName, setProjectName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [dueDate, setDueDate] = useState<string>('');

  const handleClose = () => {
    setDescription('');
    setDueDate('');
    setProjectName('');
    props.closePopup();
  }

  const onSubmit = (ev:React.FormEvent) => {
    ev.preventDefault();

    const project: CreateProjectDTO = {
      title: projectName,
      description,
      due_date: new Date(dueDate),
      ownerkey: user?.username,
    }

    console.log(project);
    api.post<CreateProjectDTO>({
      route: '/project',
      data: project
    }).then(
      response => console.log(response)
    );

    props.closePopup();
  }

  if (!props.showPopup) return null;

  return (
    <Overlay className="popup-overlay">
      <Card className="popup-create-project">
        <Header>
          <Title>Create new project</Title>
          <Close onClick={handleClose}><XMarkIcon width={24} /></Close>
        </Header>
        <Form onSubmit={onSubmit}>
          <TextInput
            label="Project name"
            value={projectName}
            onChange={(value) => setProjectName(value)}
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
          <CreateButton type="submit">Create project</CreateButton>
        </Form>
      </Card>
    </Overlay>
  )
}