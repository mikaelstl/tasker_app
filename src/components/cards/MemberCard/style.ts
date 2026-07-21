import styled from "styled-components";
import Palette from "@/assets/palette";

const Card = styled.div`
  display: grid;
  grid-template-areas:
    "tskr-avatar tskr-member-identity tskr-badge"
    ". tskr-member-actions tskr-member-actions"
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

const Actions = styled.div`
  grid-area: tskr-member-actions;
  display: flex;
  justify-content: flex-end;
  gap: 6px;
`;

const ActionButton = styled.button<{ $danger?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: 30px;
  height: 30px;
  padding: 6px;
  border: 1px solid ${Palette.details};
  border-radius: 6px;

  background-color: ${Palette.transparent};
  color: ${({ $danger }) => $danger ? Palette.red : Palette.white_50};
  cursor: pointer;

  &:hover:not(:disabled) {
    border-color: ${({ $danger }) => $danger ? Palette.red : Palette.lightBlue};
    color: ${({ $danger }) => $danger ? Palette.red : Palette.lightBlue};
  }

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

export { Actions, ActionButton, Card, Identity };
