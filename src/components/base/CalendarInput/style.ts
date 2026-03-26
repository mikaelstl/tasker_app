import styled from "styled-components";
import Palette from "../../../assets/palette";

const Container = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Input = styled.input`
  width: 100%;
  
  font-size: 14px;
  font-weight: 500;
  
  background-color: ${Palette.items};

  padding: 10px;
  border-radius: 6px;
`;

export {
  Container,
  Input
}