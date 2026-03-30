import styled from "styled-components";
import Palette from "../../../assets/palette";

const Container = styled.div`
  height: 100%;
  overflow: hidden;
  
  display: flex;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  overflow: hidden;

  width: 100%;
`;

const Comments = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
  
  overflow: hidden;
  
  width: 100%;
  
  padding: 0px 20px;
  padding-bottom: 20px;

  #cards {
    overflow: scroll;
  }
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

export {
  Container,
  Content,
  Comments,
  AbstractItem,
  ProjectInfo,
  Description
}