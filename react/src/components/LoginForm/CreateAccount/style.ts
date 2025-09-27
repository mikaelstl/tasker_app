import styled from "styled-components";
import Palette from "../../../assets/palette";

const Container = styled.div`
  display: grid;
  grid-auto-flow: row;
  gap: 15px;
`;

const Separator = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const CreateAccountBtn = styled.button`
  width: 100%;
  padding: 17px 0px;
  
  color: white;
  
  font-size: 16px;
  font-family: 'Montserrat';
  font-weight: bold;
  
  border: 2px solid ${Palette.white};
  border-radius: 9999px;
  
  background: none;
`;

export {
  Container,
  Separator,
  CreateAccountBtn
}