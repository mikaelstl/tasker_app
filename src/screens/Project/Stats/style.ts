import styled from "styled-components";
import Palette from "../../../assets/palette";

const Container = styled.div`
  display: flex;
  flex-direction: column;

  height: 100%;
  overflow: hidden;
`;

const Content = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  overflow: auto;

  width: 100%;
  height: 100%;

  padding-top: 20px;
`;

const ProjectInfo = styled.div`
  display: grid;
  grid-template-areas:
    "tskr-title tskr-badge tskr-stats-actions"
    "tskr-subtitle tskr-subtitle tskr-stats-actions"
    "tskr-progress tskr-progress ."
  ;
  grid-template-columns: min-content 1fr 1fr;
  grid-template-rows: min-content min-content min-content;
  gap: 12px;

  border-bottom: 1px solid ${Palette.items};
  padding: 30px 30px 20px 30px;
`;

const Actions = styled.div`
  grid-area: tskr-stats-actions;

  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const ProgressCard = styled.div`
  grid-area: tskr-progress;

  display: flex;
  flex-direction: column;
  gap: 4px;

  height: 100%;
`;

const ProgressContainer = styled.div`
  background-color: ${Palette.items};
  
  height: 6px;
  width: 100%;

  border-radius: 50px;

  overflow: hidden;
`;

interface ProgressBarProps {
  progress: number
}

const ProgressBar = styled.div<ProgressBarProps>`
  height: 100%;
  width: ${props => props.progress}%;
  background-color: ${Palette.blue};
  border-radius: 50px;
`;

const WidgetsContainer = styled.div`
  display: flex;
  gap: 20px;

  width: 90%;
  height: min-content;
`;

const Members = styled.div`
  padding: 0px 20px;
  width: 100%;
`;

export {
  Container,
  Content,
  ProjectInfo,
  Actions,
  ProgressCard,
  ProgressContainer,
  ProgressBar,
  WidgetsContainer,
  Members
}