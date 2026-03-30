import { useNavigate, useParams } from "react-router-dom";
import { Scroller } from "../../../components/misc/Scroller";
import { SearchField } from "../../../components/textfields/SearchField";
import { MemberTile } from "../../../components/tiles/MemberTile";
import { Container, Content, Header, MembersArea } from "./style";
import { useApi } from "../../../hooks/useApi";
import { useEffect, useState } from "react";
import type { ProjectMember } from "../../../service/types/member/member.dto";
import type { ApiError } from "../../../service/types/response/error";
import { Toasts } from "../../../maps/toasts";
import { MemberRole } from "../../../service/types/member/role.dto";
import { TaskStage } from "../../../service/types/task/stage.dto";
import { ContentHeader } from "../../../components/base/ContentHeader";
import { CreateButton } from "../../../components/buttons/CreateButton";
import { Text } from "../../../components/base/Text";

export function Members() {
  const navigate = useNavigate();

  const api = useApi();

  const { id } = useParams()

  const [ owner, setOwner ] = useState<ProjectMember | undefined>(undefined);
  const [members, setMembers] = useState<ProjectMember[]>([]);
  const getMembers = async () => {
    try {
      const response = await api.get({ route: `/project/${id}/members` });

      const data: ProjectMember[] = response.data;
      console.log(data);
      // const ownr = data.find(member => member.role === MemberRole.OWNER);

      // setOwner(ownr);
      setMembers(data);
    } catch (error) {
      const { errors } = error as ApiError;

      errors?.forEach(
        err => {
          const notify = Toasts[err.level];
          notify(err.message);
        }
      )

      navigate('..')
    }
  }

  useEffect(() => {
    // getMembers();
  },[]);

  return (
    <Container className="members">
      <ContentHeader
        title=""
      >
        <CreateButton
          type="button"
        >
          <Text>Add member</Text>
        </CreateButton>
      </ContentHeader>
      <Content id="team">
        <SearchField filter sort />
        <MembersArea>
          <Scroller className='vertical'>
            { owner ? <MemberTile type="owner" username={owner.userkey} tasks={{ done: owner.tasks.filter(tsk => tsk.stage === TaskStage.DONE).length, total: owner.tasks.length }} /> : <></> }
            {
              members
                .filter(member => member.role !== MemberRole.OWNER)
                .map((member) => <MemberTile key={member.id} username={member.userkey} type="member" tasks={{ done: member.tasks.filter(tsk => tsk.stage === TaskStage.DONE).length, total: member.tasks.length }} />)
            }
          </Scroller>
        </MembersArea>
      </Content>
    </Container>
  )
}