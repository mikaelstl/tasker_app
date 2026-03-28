import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;

  gap: 20px;

  overflow: hidden;
  
  height: 100%;
  width: 100%;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  
  padding: 0px 20px;
  
  width: 100%; height: 100%;
  
  overflow: hidden;
`;

export {
  Container,
  Content,
}