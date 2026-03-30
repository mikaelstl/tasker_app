import styled from "styled-components";
import Palette from "../../../assets/palette";

export const Title = styled.h2`
  grid-area: tskr-title;

  display: inline-block;

  font-size: 18px;
  font-weight: 600;
  color: ${Palette.white};

  white-space: nowrap; /*
  overflow: hidden;
  text-overflow: ellipsis; */
`