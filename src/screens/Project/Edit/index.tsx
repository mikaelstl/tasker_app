import { useState } from "react";
import { CalendarInput } from "../../../components/base/CalendarInput";
import { ContentHeader } from "../../../components/base/ContentHeader";
import { SectionTitle } from "../../../components/base/SectionTitle";
import { Text } from "../../../components/base/Text";
import { TextAreaInput } from "../../../components/base/TextAreaInput";
import { TextInput } from "../../../components/base/TextInput";
import { CreateButton } from "../../../components/buttons/CreateButton";
import { DeleteBtn } from "../../../components/buttons/DeleteBtn";
import { Infos, Links } from "../../../components/popups/CreateProject/style";
import { PlusField } from "../../../components/textfields/PlusField";
import { AdvancedSettings, Container, Content, MembersArea } from "./style";
import { useToast } from "@/hooks/useToast";
import { LinkCard } from "../../../components/cards/LinkCard";
import { User } from "../../../components/misc/User";
import { DeleteWidget } from "../../../widgets/cards/DeleteWidget";
import { Title } from "../../../components/base/Title";
import { EnableTimeTrackWidget } from "../../../widgets/cards/EnableTimeTrackWidget";
import { useNavigate } from "react-router-dom";

export function EditProject() {
  const navigate = useNavigate();
  const { warning } = useToast();

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

  return (
    <Container className="tskr-edit-project-page">
      <ContentHeader
        title="Editar projeto"
      >
        <DeleteBtn onClick={() => navigate('../')}/>
        <CreateButton type="button">
          <Text>Adicionar membro</Text>
        </CreateButton>
      </ContentHeader>
      <Content className="tskr-edit-fields">
        <Infos>
          <TextInput
            label="Nome do projeto"
            value=''
            onChange={() => { }}
          />
          <TextAreaInput
            label="Descrição"
            value=''
            onChange={() => { }}
          />
          <CalendarInput
            label="Prazo"
            value=''
            onChange={() => { }}
          />
        </Infos>
        <MembersArea>
          <SectionTitle>Membros</SectionTitle>
          <User username="mikaelst"/>
          <User username="siegfried"/>
        </MembersArea>
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
        <AdvancedSettings>
          <Title>Configurações avançadas</Title>
          <EnableTimeTrackWidget/>
          <DeleteWidget/>
        </AdvancedSettings>
      </Content>
    </Container>
  )
}
