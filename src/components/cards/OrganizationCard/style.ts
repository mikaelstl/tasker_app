import styled from "styled-components";
import Palette from "../../../assets/palette";

const Container = styled.div`
  display: grid;
  grid-template-areas:
    "tskr-org-avatar tskr-section-title tskr-badge"
    "tskr-org-avatar tskr-org-summary-labels ."
  ;
  grid-template-columns: min-content 1fr min-content;
  grid-template-rows: 1fr fit-content fit-content;

  align-items: center;
  column-gap: 16px;
  row-gap: 5px;

  padding: 16px;

  width: 550px;

  border: 1px solid ${Palette.details};
  border-radius: 8px;

  background-color: ${Palette.items};
  cursor: pointer;
  transition: transform 0.15s ease, border-color 0.15s ease;

  &:hover {
    border: 2px solid ${Palette.blue};
  }

  .tskr-org-summary-labels {
    grid-area: tskr-org-summary-labels;
    
    display: flex;
    gap: 20px;
  }
`;

const SummaryLabel = styled.div`
  display: flex;
  gap: 4px;
`;

const Avatar = styled.div`
  grid-area: tskr-org-avatar;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 52px;
  height: 52px;

  background-color: ${Palette.blue};

  border-radius: 6px;
`;

export {
  Container,
  Avatar,
  SummaryLabel
}
