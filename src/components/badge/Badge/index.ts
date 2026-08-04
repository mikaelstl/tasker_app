import styled from "styled-components";
import Palette from "../../../assets/palette";

interface BadgeProps {
  bg?: string;
  text?: string;
}

export const Badge = styled.span<BadgeProps>`
  grid-area: tskr-badge;

  display: inline-flex;
  align-items: center;
  flex-wrap: nowrap;
  gap: 8px;

  white-space: nowrap;

  font-weight: 600;
  font-size: 12px;
  padding: 5px 10px;
  border-radius: 9999px;

  color: ${props => props.text ?? Palette.white};

  width: fit-content;
  height: min-content;

  background-color: ${props => props.bg ?? Palette.gray_25};
`;
