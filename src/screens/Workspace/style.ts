import styled from "styled-components";

const Content = styled.div`
  display: flex;
  flex-direction: row;
  
  height: 100%;
  width: 100%;

  overflow: hidden;
`;

const Categories = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;

  gap: 20px;

  overflow-x: hidden;
  overflow-y: scroll;
`;

const Greating = styled.div`
  padding-top: 30px;
  padding-left: 20px;
`;

const Accordion = styled.div`
  width: 100%;
  overflow: hidden;
`;

const Header = styled.div`
  display: flex;
  gap: 16px;
  height: fit-content;

  cursor: pointer;
`;

const Tasks = styled.div`
  width: 100%;
  overflow: hidden;
`;

const Projects = styled.div`
  width: 100%;

  padding: 20px 20px;
`;

const Main = styled.main`
  width: 100%;
`

export {
  Content,
  Categories,
  Greating,
  Header,
  Accordion,
  Tasks,
  Projects,
  Main
}