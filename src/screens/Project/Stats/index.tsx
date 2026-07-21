import { Text } from "../../../components/base/Text";
import { ProjectStageBadge } from "../../../maps/project-stage";
import { Subtitle } from "../../../components/base/Subtitle";
import { EditButton } from "../../../components/buttons/EditBtn";
import { CreateButton } from "../../../components/buttons/CreateButton";
import { useNavigate } from "react-router-dom";
import { Actions, Container, ProgressBar, ProgressCard, ProgressContainer, ProjectInfo, Content, WidgetsContainer, Members } from "./style";
import { TasksInfosWidget } from "../../../widgets/cards/TasksInfosWidget";
import { DeadlineWidget } from "../../../widgets/cards/DeadlineWidget";
import { Title } from "../../../components/base/Title";
import { ProjectHealthWidget } from "../../../widgets/cards/ProjectHealthWidget";
import { PerformanceChart } from "../../../widgets/charts/PerformanceChart";
import { ProdutivityChart } from "../../../widgets/charts/ProdutivityChart";
import { MemberStatsAccordion } from "../../../components/accordions/MemberStatsAccordion";

export function Stats() {
  const navigate = useNavigate();

  return (
    <Container className="tskr-proj-stats">
      <ProjectInfo>
        <Title>Título do projeto</Title>
        <Subtitle>Iniciado em: --:-- Prazo: 00 de mm de aaaa</Subtitle>
        {ProjectStageBadge['STARTED']}
        <Actions>
          <EditButton type="button" onClick={() => navigate('../edit')} />
          <CreateButton type="button">
            <Text>Gerar relatório</Text>
          </CreateButton>
        </Actions>
        <ProjectProgressSection />
      </ProjectInfo>
      <Content className="tskr-proj-stats-content">
        <WidgetsContainer className="tskr-project-infos-widget">
          <TasksInfosWidget />
          <DeadlineWidget />
          <ProjectHealthWidget />
        </WidgetsContainer>
        <WidgetsContainer className="tskr-charts">
          <PerformanceChart />
          <ProdutivityChart />
        </WidgetsContainer>
        <Members>
          <Title>Membros</Title>
          <div>
            <MemberStatsAccordion
              username="mikaelstl"
            />
            <MemberStatsAccordion
              username="siegfried"
            />
          </div>
        </Members>
      </Content>
    </Container>
  )
}

const ProjectProgressSection = () => {
  return (
    <ProgressCard>
      <ProgressContainer>
        <ProgressBar progress={50} />
      </ProgressContainer>
      <Title>00%</Title>
    </ProgressCard>
  )
}
