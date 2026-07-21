import styled from "styled-components";
import Palette from "../../../assets/palette";

const Container = styled.div`
  display: grid;
  grid-template-areas:
    "tskr-text tskr-toggle"
    "tskr-subtitle tskr-subtitle"
  ;
  grid-template-columns: 1fr min-content;
  row-gap: 12px;

  padding: 10px;
  border: 1px solid ${Palette.details};
  border-radius: 6px;
`;

export {
  Container
}
