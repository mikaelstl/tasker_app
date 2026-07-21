import styled from "styled-components";
import Palette from "@/assets/palette";

const Card = styled.div`
  display: grid;
  grid-template-areas:
    "tskr-avatar tskr-member-identity tskr-badge"
  ;
  grid-template-columns: min-content 1fr min-content;
  
  flex-direction: row;
  align-items: start;
  gap: 12px;

  width: 100%;
  min-width: fit-content;

  min-height: 78px;
  padding: 16px;
  border: 1px solid ${Palette.details};
  border-radius: 12px;

  background-color: ${Palette.items};
`;

const Identity = styled.div`
  grid-area: tskr-member-identity;

  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 0;
`;

export { Card, Identity };
