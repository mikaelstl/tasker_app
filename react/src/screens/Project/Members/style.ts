import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  height: 100%;

  overflow: hidden;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 20px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  
  width: 100%; height: 100%;
  
  overflow: hidden;
  
  padding: 0px 20px;
`;

const ContentHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr .25fr .25fr;
  align-items: center;

  padding: 15px;
`;

const MembersArea = styled.div`
  height: 100%;
  overflow: hidden;
`

export {
  Container,
  Header,
  Content,
  ContentHeader,
  MembersArea
}