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
  width: 100%;
  height: 100%;
  padding: 20px 5% 32px;
  overflow: auto;
`;

const ProjectInfo = styled.div`
  display: grid;
  grid-template-areas:
    "tskr-title tskr-badge tskr-stats-actions"
    "tskr-subtitle tskr-subtitle tskr-stats-actions"
    "tskr-progress tskr-progress .";
  grid-template-columns: min-content 1fr 1fr;
  grid-template-rows: min-content min-content min-content;
  gap: 12px;
  padding: 30px 30px 20px;
  border-bottom: 1px solid ${Palette.items};

  @media (max-width: 720px) {
    grid-template-areas:
      "tskr-title tskr-badge"
      "tskr-subtitle tskr-subtitle"
      "tskr-progress tskr-progress"
      "tskr-stats-actions tskr-stats-actions";
    grid-template-columns: min-content 1fr;
  }
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
`;

const ProgressContainer = styled.div`
  width: 100%;
  height: 6px;
  overflow: hidden;
  border-radius: 50px;
  background-color: ${Palette.items};
`;

const ProgressBar = styled.div<{ progress: number }>`
  width: ${({ progress }) => progress}%;
  height: 100%;
  border-radius: 50px;
  background-color: ${Palette.blue};
`;

const Controls = styled.div`
  display: flex;
  align-items: end;
  gap: 12px;
  width: 100%;
  padding: 16px;
  border: 1px solid ${Palette.details};
  border-radius: 8px;
  background: ${Palette.content};

  @media (max-width: 900px) {
    flex-wrap: wrap;
  }
`;

const Control = styled.div`
  display: flex;
  flex: 1 1 190px;
  flex-direction: column;
  gap: 7px;

  label {
    color: ${Palette.gray};
    font-size: 12px;
    font-weight: 600;
  }

  input, select {
    min-height: 40px;
    padding: 8px 10px;
    border: 1px solid ${Palette.details};
    border-radius: 6px;
    color: ${Palette.white};
    background: ${Palette.items};
  }
`;

const WidgetsContainer = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;

  > * { min-width: 0; }

  @media (max-width: 1050px) {
    flex-direction: column;
  }
`;

const Facts = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  width: 100%;

  p {
    display: flex;
    flex-direction: column;
    gap: 3px;
    padding: 12px;
    border: 1px solid ${Palette.details};
    border-radius: 8px;
    background: ${Palette.items};
  }

  @media (max-width: 850px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 480px) { grid-template-columns: 1fr; }
`;

const Members = styled.section`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;

  > div {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
`;

const EventsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 10px;
`;

const ReportList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 10px;

  button {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 12px;
    border: 1px solid ${Palette.details};
    border-radius: 8px;
    color: ${Palette.white};
    text-align: left;
    background: ${Palette.items};
    cursor: pointer;
  }

  small { color: ${Palette.gray}; }
`;

const ReportDetails = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px 20px;
  padding: 12px;
  border-left: 3px solid ${Palette.lightBlue};
  background: ${Palette.items};

  p { overflow-wrap: anywhere; }
`;

const EmptyState = styled.div`
  display: grid;
  height: 100%;
  place-items: center;
`;

export {
  Actions,
  Container,
  Content,
  Control,
  Controls,
  EmptyState,
  EventsGrid,
  Facts,
  Members,
  ProgressBar,
  ProgressCard,
  ProgressContainer,
  ProjectInfo,
  ReportDetails,
  ReportList,
  Section,
  WidgetsContainer,
};
