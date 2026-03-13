import styled from "styled-components";
import Palette from "../../assets/palette";

const Content = styled.div`
  display: flex;
  flex-direction: column;

  gap: 20px;
  
  height: 100%;
  width: 100%;

  overflow: hidden;
`;

const Accordion = styled.div`
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  gap: 16px;
  height: fit-content;
  border: 1px solid red;
`;

const Tasks = styled.div`
  width: 100%;
`;

export {
  Content,
  Header,
  Accordion,
  Tasks
}