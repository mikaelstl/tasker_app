import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  flex: 1 1 auto;

  gap: 20px;

  overflow: hidden;
  
  height: 100%;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  
  padding: 0px 20px;
  
  width: 100%; height: 100%;
  
  overflow: hidden;
`

const ContentHeader = styled.div`
  display: grid;
  grid-template-columns: .75fr .25fr .25fr .25fr .25fr;
  padding: 15px;
`;

const ProjectsArea = styled.div`
  height: 100%;
  overflow: hidden;
`;

export {
  Container,
  Content,
  ContentHeader,
  ProjectsArea
}