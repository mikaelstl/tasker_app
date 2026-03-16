import styled from "styled-components";
import Palette from "../../../assets/palette";

const Card = styled.div`
  display: grid;

  grid-template-areas:
    "tskr-avatar tskr-comment-data"
    "tskr-comment-line tskr-subtitle"
  ;

  grid-template-columns: min-content auto;
  grid-template-rows: min-content auto;

  row-gap: 2px;
  column-gap: 12px;

  width: 100%;
  height: 85px;

  position: relative;

  .tskr-subtitle {
    height: 100%;
  }
`;

const Texts = styled.div`
  grid-area: tskr-comment-data;

  display: flex;
  align-items: center;

  gap: 10px;

  height: 100%;
`;

const Line = styled.div`
  grid-area: tskr-comment-line;

  height: 100%;

  border-left: 3px solid ${Palette.items};

  left: 48%;

  position: absolute;
`;

export {
  Card,
  Texts,
  Line
}