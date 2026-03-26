import styled from "styled-components";
import Palette from "../../../assets/palette";

interface ButtonProps {
  color?: string
}

export const Button = styled.button<ButtonProps>`
  grid-area: tskr-button;

  display: flex;
  gap: 10px;

  background-color: ${props => props.color ?? Palette.blue};

  padding: 10px 16px;
  border-radius: 6px;

  width: fit-content;
  height: fit-content;

  cursor: pointer;
`;