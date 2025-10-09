import { Title } from "../../../components/base/Title";
import { CreateButton } from "../../../components/buttons/CreateButton";
import { Scroller } from "../../../components/misc/Scroller";
import { ProjectMenu } from "../../../components/ProjectMenu";
import { SearchField } from "../../../components/textfields/SearchField";
import { MemberTile } from "../../../components/tiles/MemberTile";
import { Container, Content, ContentHeader, Header, MembersArea } from "./style";

export function Members() {
  const members = Array.from({ length: 10 }, (_, i) => i);

  return (
    <Container className="members">
      <Header id="header">
        <ProjectMenu />
        <CreateButton>Add member</CreateButton>
      </Header>
      <SearchField filter sort/>
      <Content id="team">
        <ContentHeader id="team-header">
          <Title>User</Title>
          <Title>Role</Title>
          <Title>Tasks</Title>
        </ContentHeader>
        <MembersArea>
          <Scroller className='vertical'>
            <MemberTile type="owner" tasks={{done: '00', total: '000'}}/>

            {
              members.map((index) => <MemberTile key={index} type="member" tasks={{done: '00', total: '000'}}/>)
            }
          </Scroller>
        </MembersArea>
      </Content>
    </Container>
  )
}