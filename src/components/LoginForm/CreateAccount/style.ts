import styled from "styled-components";
import Palette from "../../../assets/palette";

const Container = styled.div`
  display: grid;
  grid-auto-flow: row;
  gap: 15px;

  width: 100%;
`;

const Separator = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const CreateAccountBtn = styled.button`
  width: 100%;
  padding: 10px;
  
  color: white;
  
  font-size: 16px;
  font-weight: 500;
  
  border-radius: 9999px;
  
  background-color: ${Palette.items};
`;

export {
  Container,
  Separator,
  CreateAccountBtn
}