import styled from "styled-components";
import Palette from "../../../assets/palette";

const Card = styled.div`
  display: grid;
  grid-template-areas: 
    "tskr-badge tskr-title tskr-healthy-i"
    ".          tskr-team tskr-date"
  ;

  grid-template-columns: min-content 2fr auto;
  grid-template-rows: fit-content auto;

  gap: 12px;

  border-bottom: 1px solid ${Palette.items};
  
  padding: 20px;

  cursor: pointer;
`;

const HealthyIndicator = styled.div`
  grid-area: tskr-healthy-i;

  display: flex;
  justify-content: flex-end;
`;

export {
  Card,
  HealthyIndicator
}