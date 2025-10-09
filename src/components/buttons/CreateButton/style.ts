import styled from "styled-components";
import Palette from "../../../assets/palette";

export const Button = styled.button`
  display: grid;
  grid-auto-flow: column;
  align-items: center;
  gap: 10px;

  background-color: ${Palette.blue};

  padding: 11px 20px;
  margin: 20px 20px 0px 0px;

  border-radius: 8px;
`;