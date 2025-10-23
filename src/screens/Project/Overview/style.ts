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

  margin: 20px 20px 0px 20px;

  width: 100%;
`;

const Abstract = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  
  min-width: 20%; height: 100%;
  
  padding: 20px;
  
  border-right: 1px solid ${Palette.items};
`;

const ImportantTasks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Comments = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
  
  overflow: hidden;
  
  width: 100%;
  height: 100%;
  
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
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 12px;

  border-bottom: 2px solid ${Palette.items};

  padding-bottom: 120px;
`;

export {
  Container,
  Abstract,
  Content,
  Comments,
  ImportantTasks,
  AbstractItem,
  ProjectInfo
}