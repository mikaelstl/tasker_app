import styled from "styled-components";

const Card = styled.div`
  display: flex;
  gap: 18px;

  overflow: hidden;

  border-radius: 0px 6px 6px 0px;

  width: 100%;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  
  padding: 16px 0px;
`;

const Texts = styled.div`
  display: flex;
`;

export {
  Card,
  Container,
  Texts
}