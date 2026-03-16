import styled from "styled-components";
import Palette from "../../../assets/palette";

export interface TeamContainerProps {
  color?: string
}

export const Container = styled.div<TeamContainerProps>`
  grid-area: tskr-team;

  display: flex;

  width: fit-content;

  object-fit: cover;

  .tskr-avatar {
    margin-left: -14px;
    outline: 3px solid ${props => props.color ?? Palette.content};
  }

  .tskr-avatar:first-child {
    margin-left: 0;
  }
`;