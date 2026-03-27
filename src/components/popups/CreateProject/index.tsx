import { Card, Content, Infos, Links, Overlay } from "./style";
import { useState } from "react";
import { CreateButton } from "../../buttons/CreateButton";
import { useApi } from "../../../hooks/useApi";
import type { CreateProjectDTO } from "../../../service/types/project/create.dto";
import { useAuth } from "../../../hooks/useAuth";
import type { PopupProps } from "../popup.props";
import { ContentHeader } from "../../base/ContentHeader";
import { DeleteBtn } from "../../buttons/DeleteBtn";
import { Text } from "../../base/Text";
import { TextInput } from "../../base/TextInput";
import { TextAreaInput } from "../../base/TextAreaInput";
import { CalendarInput } from "../../base/CalendarInput";
import { SectionTitle } from "../../base/SectionTitle";
import { SelectMember } from "../../misc/SelectMember";
import { PlusField } from "../../textfields/PlusField";
import { LinkCard } from "../../cards/LinkCard";
import { Toasts } from "../../../maps/toasts";

export function CreateProjectPopup(props: PopupProps) {
  const api = useApi();

  const { user } = useAuth();

  const [projectName, setProjectName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [dueDate, setDueDate] = useState<string>('');
  const [links, setLinks] = useState<string[]>([]);

  const addLink = (newLink: string) => {
    if (links.find(
      link => link === newLink
    )) {
      const alert = Toasts['warning'];

      alert('Link already added');
      return;
    }

    const newLinks = [...links, newLink];
    setLinks(newLinks);
  }

  const removeLink = (value: string) => {
    setLinks(
      links.filter(
        link => link !== value
      )
    )
  }

  const handleClose = () => {
    setDescription('');
    setDueDate('');
    setProjectName('');
    props.closePopup();
  }

  const onSubmit = (ev: React.MouseEvent) => {
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
    <Overlay className="tskr-popup-overlay">
      <Card className="tskr-popup-create-project">
        <ContentHeader
          title="Create Project"
        >
          <DeleteBtn onClick={handleClose} />
          <CreateButton type="submit"
            onClick={onSubmit}
          >
            <Text>Create</Text>
          </CreateButton>
        </ContentHeader>
        <Content>
          <Infos>
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
          </Infos>
          <SelectMember
            label="Manager"
            data={[{
              id: '648c864f',
              name: 'mikael',
              username: 'mikaelst',
            }]}
          />
          <Links>
            <SectionTitle>Links</SectionTitle>
            <PlusField add={addLink}/>
            {
              links.map(
                link => <LinkCard 
                          link={link}
                          remove={() => removeLink(link)}  
                        />
              )
            }
          </Links>
        </Content>
      </Card>
    </Overlay>
  )
}