import styled from "styled-components";
import Palette from "../../../assets/palette";

const Card = styled.article`
  display: grid;
  grid-template-areas:
    "tskr-avatar tskr-comment-data tskr-comment-actions"
    "tskr-comment-line tskr-subtitle tskr-comment-actions"
    ". tskr-comment-details tskr-comment-details";
  grid-template-columns: min-content minmax(0, 1fr) min-content;
  grid-template-rows: min-content auto auto;
  gap: 4px 12px;
  width: 100%;
  min-height: 100px;
  padding: 12px;
  border: 1px solid ${Palette.details};
  border-radius: 6px;
  position: relative;
`;

const Texts = styled.div`
  grid-area: tskr-comment-data;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  min-width: 0;

  p { overflow-wrap: anywhere; }
`;

const Line = styled.div`
  grid-area: tskr-comment-line;
  height: 100%;
  border-left: 3px solid ${Palette.items};
  justify-self: center;
`;

const Actions = styled.div`
  grid-area: tskr-comment-actions;
  display: flex;
  gap: 6px;
`;

const ActionButton = styled.button<{ $danger?: boolean }>`
  display: grid;
  width: 30px;
  height: 30px;
  padding: 6px;
  border: 1px solid ${({ $danger }) => $danger ? Palette.red : Palette.details};
  border-radius: 6px;
  color: ${({ $danger }) => $danger ? Palette.red : Palette.white_50};
  background: ${Palette.items};
  cursor: pointer;

  &:disabled { opacity: .5; cursor: not-allowed; }
`;

const Details = styled.div`
  grid-area: tskr-comment-details;
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px solid ${Palette.details};
`;

export { Actions, ActionButton, Card, Details, Line, Texts };
