import styled from "styled-components";
import Palette from "../../../assets/palette";

export const Badge = styled.div<{color?: string}>`
  font-weight: 600;
  font-size: 14px;
  padding: 5px 10px;
  border-radius: 50px;

  width: fit-content;

  background-color: ${props => props.color ?? Palette.lightRed};
`;