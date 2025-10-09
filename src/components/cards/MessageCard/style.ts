import styled from "styled-components";
import Palette from "../../../assets/palette";

const Card = styled.div`
  width: fit-content;
  max-width: 360px;

  height: min-content;

  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: pre-wrap;

  border-radius: 25px;
  padding: 8px 24px;

  &.sent {
    background-color: ${Palette.blue};
    border-top-right-radius: 32px;
    border-bottom-right-radius: 12px;

    align-self: flex-end;
  }

  &.recived {
    background-color: ${Palette.items};
    border-top-left-radius: 32px;
    border-bottom-left-radius: 12px;
  
    align-self: flex-start;
  }
`;

export {
  Card
}