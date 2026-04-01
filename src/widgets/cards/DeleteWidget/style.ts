import styled from "styled-components";
import Palette from "../../../assets/palette";

const Container = styled.div`
  grid-area: tskr-delete-widget;

  display: grid;
  grid-template-areas:
    "tskr-text ."
    "tskr-dz-description tskr-dz-description"
    ". tskr-btn"
  ;
  grid-template-columns: 1fr min-content;
  align-items: end;

  background-color: ${Palette.red_50};
  border: 3px solid ${Palette.red};
  padding: 18px 12px;
  border-radius: 6px;

  width: 100%;
`;

const Description = styled.div`
  grid-area: tskr-dz-description;
  color: ${Palette.white_50};
`

export {
  Container,
  Description
}