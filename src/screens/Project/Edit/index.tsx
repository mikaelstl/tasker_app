import { useState } from "react";
import { CalendarInput } from "../../../components/base/CalendarInput";
import { ContentHeader } from "../../../components/base/ContentHeader";
import { SectionTitle } from "../../../components/base/SectionTitle";
import { Text } from "../../../components/base/Text";
import { TextAreaInput } from "../../../components/base/TextAreaInput";
import { TextInput } from "../../../components/base/TextInput";
import { CreateButton } from "../../../components/buttons/CreateButton";
import { DeleteBtn } from "../../../components/buttons/DeleteBtn";
import { SelectMember } from "../../../components/misc/SelectMember";
import { Infos, Links } from "../../../components/popups/CreateProject/style";
import { PlusField } from "../../../components/textfields/PlusField";
import { AdvancedSettings, Container, Content, MembersArea } from "./style";
import { Toasts } from "../../../maps/toasts";
import { LinkCard } from "../../../components/cards/LinkCard";
import { User } from "../../../components/misc/User";
import { DeleteWidget } from "../../../widgets/cards/DeleteWidget";
import { ToggleSwitch } from "../../../components/base/ToggleSwitch";
import { Title } from "../../../components/base/Title";
import { EnableTimeTrackWidget } from "../../../widgets/cards/EnableTimeTrackWidget";

export function EditProject() {
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

  return (
    <Container className="tskr-edit-project-page">
      <ContentHeader
        title="Edit Project"
      >
        <DeleteBtn />
        <CreateButton type="button">
          <Text>Add member</Text>
        </CreateButton>
      </ContentHeader>
      <Content className="tskr-edit-fields">
        <Infos>
          <TextInput
            label="Project name"
            value=''
            onChange={() => { }}
          />
          <TextAreaInput
            label="Description"
            value=''
            onChange={() => { }}
          />
          <CalendarInput
            label="Due date"
            value=''
            onChange={() => { }}
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
        <MembersArea>
          <SectionTitle>Members</SectionTitle>
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
          <Title>Advanced Settings</Title>
          <EnableTimeTrackWidget/>
          <DeleteWidget/>
        </AdvancedSettings>
      </Content>
    </Container>
  )
}