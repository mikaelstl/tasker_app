import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  height: 100%;

  overflow: hidden;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  
  width: 100%; height: 100%;
  
  padding: 0px 20px;

  overflow: hidden;
`;

const MembersArea = styled.div`
  height: 100%;
  overflow: hidden;
`

export {
  Container,
  Content,
  MembersArea
}