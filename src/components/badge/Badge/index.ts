import styled from "styled-components";
import Palette from "../../../assets/palette";

interface BadgeProps {
  color?: string
}

export const Badge = styled.div<BadgeProps>`
  font-weight: 600;
  font-size: 14px;
  padding: 5px 10px;
  border-radius: 4px;

  width: fit-content;
  height: fit-content;

  background-color: ${props => props.color ?? Palette.red_50};
`;