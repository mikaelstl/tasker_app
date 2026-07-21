import { Card, Content, Infos, Links, Overlay } from "./style";
import { useState } from "react";
import { CreateButton } from "../../buttons/CreateButton";
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
import { useToast } from "@/hooks/useToast";
import { useServices } from "../../../hooks/useServices";

export function CreateProjectPopup(props: PopupProps) {
  const { ProjectService } = useServices();
  const { warning, error } = useToast();

  const { user } = useAuth();

  const [projectName, setProjectName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [dueDate, setDueDate] = useState<string>('');
  const [links, setLinks] = useState<string[]>([]);

  const addLink = (newLink: string) => {
    if (links.find(
      link => link === newLink
    )) {
      warning('Link already added');
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

  const onSubmit = async (ev: React.MouseEvent) => {
    ev.preventDefault();

    const project: CreateProjectDTO = {
      title: projectName,
      description,
      due_date: new Date(dueDate),
      ownerkey: user?.username,
    }

    console.log(project);
    try {
      const response = await ProjectService.create(project);
      console.log(response);
      props.closePopup();
    } catch (error) {
      console.error(error);
      error('Não foi possível criar o projeto');
    }
  }

  if (!props.showPopup) return null;

  return (
    <Overlay className="tskr-popup-overlay">
      <Card className="tskr-popup-create-project">
        <ContentHeader
          title="Criar projeto"
        >
          <DeleteBtn onClick={handleClose} />
          <CreateButton type="submit"
            onClick={onSubmit}
          >
            <Text>Criar</Text>
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
          <SelectMember
            label="Gestor"
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
