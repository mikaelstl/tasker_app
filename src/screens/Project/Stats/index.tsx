import { Text } from "../../../components/base/Text";
import { ProgressBadge } from "../../../maps/progress";
import { SectionTitle } from "../../../components/base/SectionTitle";
import { Subtitle } from "../../../components/base/Subtitle";
import { EditButton } from "../../../components/buttons/EditBtn";
import { CreateButton } from "../../../components/buttons/CreateButton";
import { useNavigate } from "react-router-dom";
import { Actions, Container, ProgressBar, ProgressCard, ProgressContainer, ProjectInfo, Content, WidgetsContainer } from "./style";
import { TasksInfosWidget } from "../../../widgets/cards/TasksInfosWidget";
import { DeadlineWidget } from "../../../widgets/cards/DeadlineWidget";
import { Title } from "../../../components/base/Title";
import { ProjectHealthWidget } from "../../../widgets/cards/ProjectHealthWidget";

export function Stats() {
  const navigate = useNavigate();

  // const api = useApi();

  // const { user } = useAuth();

  // const { id } = useParams();

  return (
    <Container className="tskr-proj-stats">
      <ProjectInfo>
        <Title>Project title</Title>
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
        <WidgetsContainer>
          <TasksInfosWidget />
          <DeadlineWidget />
          <ProjectHealthWidget />
        </WidgetsContainer>
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
      <Title>00%</Title>
    </ProgressCard>
  )
}