import styled from "styled-components";
import Palette from "../../../assets/palette";

export const Title = styled.h2`
  grid-area: tskr-title;

  font-size: 16px;
  font-weight: 600;
  color: ${Palette.white};

  max-width: 150px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`