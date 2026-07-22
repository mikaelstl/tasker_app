import { useNavigate, useParams } from "react-router-dom";
import { Scroller } from "../../../components/misc/Scroller";
import { SearchField } from "../../../components/textfields/SearchField";
import { MemberTile } from "../../../components/tiles/MemberTile";
import { Container, Content, MembersArea } from "./style";
import { useEffect, useState } from "react";
import type { ProjectMember } from "../../../service/types/member/member.dto";
import type { ApiError } from "../../../service/types/response/error";
import { useToast } from "@/hooks/useToast";
import { TaskStage } from "../../../service/types/task/stage.dto";
import { ContentHeader } from "../../../components/base/ContentHeader";
import { CreateButton } from "../../../components/buttons/CreateButton";
import { Text } from "../../../components/base/Text";
import { useServices } from "../../../hooks/useServices";

export function Members() {
  const navigate = useNavigate();
  const notifications = useToast();
  const { id } = useParams();
  const { MemberService } = useServices();

  const [members, setMembers] = useState<ProjectMember[]>([]);
  const loadMembers = async () => {
    try {
      if (!id) return;
      const response = await MemberService.list(id);
      const data: ProjectMember[] = response.data;

      setMembers(data);
    } catch (error) {
      const { errors } = error as ApiError;

      errors?.forEach(
        err => {
          notifications[err.level](err.message);
        }
      )

      navigate('..')
    }
  }

  useEffect(() => {
    void loadMembers();
  }, [MemberService, id]);

  return (
    <Container className="tskr-proj-members">
      <ContentHeader
        title=""
      >
        <CreateButton
          type="button"
        >
          <Text>Adicionar membro</Text>
        </CreateButton>
      </ContentHeader>
      <Content id="team">
        <SearchField filter sort />
        <MembersArea>
          <Scroller className='vertical'>
            {
              members
                .map((member) => <MemberTile key={member.id} username={member.userkey} type="member" tasks={{ done: member.tasks.filter(tsk => tsk.stage === TaskStage.DONE).length, total: member.tasks.length }} />)
            }
          </Scroller>
        </MembersArea>
      </Content>
    </Container>
  )
}
