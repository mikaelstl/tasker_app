import { Text } from "../../../components/base/Text";
import { ProgressBadge } from "../../../maps/progress";
import { SectionTitle } from "../../../components/base/SectionTitle";
import { Subtitle } from "../../../components/base/Subtitle";
import { EditButton } from "../../../components/buttons/EditBtn";
import { CreateButton } from "../../../components/buttons/CreateButton";
import { useNavigate } from "react-router-dom";
import { Actions, Container, ProgressBar, ProgressCard, ProgressContainer, ProjectInfo, Content } from "./style";

export function Stats() {
  const navigate = useNavigate();

  // const api = useApi();

  // const { user } = useAuth();

  // const { id } = useParams();

  return (
    <Container className="tskr-proj-stats">
      <ProjectInfo>
        <SectionTitle>Project title</SectionTitle>
        <Subtitle>Stated at: --:-- Due date: mm 00, yyyy</Subtitle>
        {ProgressBadge['STARTED']}
        <Actions>
          <EditButton type="button" onClick={() => console.log('Open edit funtion')} />
          <CreateButton type="button">
            <Text>Generate Report</Text>
          </CreateButton>
        </Actions>
        <ProjectProgress />
      </ProjectInfo>
      <Content className="tskr-proj-stats-content">
      </Content>
    </Container>
  )
}

const ProjectProgress = () => {
  return (
    <ProgressCard>
      <ProgressContainer>
        <ProgressBar progress={50} />
      </ProgressContainer>
      <SectionTitle>00%</SectionTitle>
    </ProgressCard>
  )
}