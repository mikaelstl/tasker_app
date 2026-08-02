import styled from "styled-components";
import Palette from "../../../assets/palette";
import { Scroller } from "../../../components/misc/Scroller";

const Container = styled.div`
  height: 100%;
  min-height: 0;
  overflow: hidden;
  
  display: flex;
`;

const MainPanel = styled.div`
  display: flex;
  flex: 1 1 0;
  flex-direction: column;

  min-width: 0;
  min-height: 0;
  overflow: hidden;
`;

const ProjectScroller = styled(Scroller)`
  flex: 1 1 auto;
  height: auto;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  width: 100%;
  min-height: 0;
`;

const Comments = styled.div`
  display: flex;

  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  
  gap: 10px;
  min-height: 0;
  
  width: 100%;
  
  padding: 0px 20px;
  padding-bottom: 20px;
`;

const AbstractItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  
  border-bottom: 2px solid ${Palette.items};
  padding-bottom: 40px;
`;

const ProjectInfo = styled.div`
  display: grid;
  grid-template-areas:
    "tskr-section-title tskr-badge tskr-button"
    "tskr-subtitle tskr-subtitle tskr-button"
    "tskr-description tskr-description tskr-description"
  ;
  grid-template-columns: min-content 1fr min-content;
  grid-template-rows: min-content min-content min-content;
  gap: 12px;

  border-bottom: 1px solid ${Palette.items};
  padding: 30px 30px 20px 30px;
`;

const Description = styled.div`
  grid-area: tskr-description;
  width: 100%;
`;

const MessageComposer = styled.div`
  flex: 0 0 auto;

  padding: 0 20px 20px;
  background: ${Palette.content};
`;

export {
  Container,
  Content,
  Comments,
  AbstractItem,
  ProjectInfo,
  Description,
  MainPanel,
  MessageComposer,
  ProjectScroller,
}
