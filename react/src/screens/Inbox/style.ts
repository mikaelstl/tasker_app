import styled from "styled-components";
import Palette from "../../assets/palette";

const Content = styled.div`
  display: flex;

  height: 100%;
  width: 100%;

  overflow: hidden;  
`;

const Chats = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  
  width: 360px; height: 100%;
  min-width: 360px;
  
  border-right: 1px solid ${Palette.items};
  
  #chats-list {
    height: 100%;
    overflow: hidden;
  }
`;

const MessagesArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  
  width: 100%;
`;

const Messages = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  
  width: 100%; height: 100%;

  padding: 20px;
`;

export {
  Content,
  Chats,
  MessagesArea,
  Messages
}