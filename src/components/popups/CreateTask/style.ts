import styled from "styled-components";
import Palette from "../../../assets/palette";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 20;

  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;

  background: #00000080;
`;

const Card = styled.div`
  position: relative;

  display: grid;
  grid-template-areas:
    "tskr-content-header tskr-content-header"
    "tskr-form           tskr-select-member";
  grid-template-rows: min-content auto;
  grid-template-columns: minmax(0, 2fr) minmax(220px, 1fr);
  gap: 20px;

  width: min(760px, 100%);
  max-height: min(720px, 90vh);
  min-height: 0;

  border: 1px solid ${Palette.items};
  border-radius: 14px;
  background: ${Palette.tool_bars};
  box-shadow: 0 20px 60px #00000066;
  overflow: hidden;

  @media (max-width: 680px) {
    grid-template-areas:
      "tskr-content-header"
      "tskr-form"
      "tskr-select-member";
    grid-template-columns: minmax(0, 1fr);
    overflow-y: auto;
  }
`;

const Close = styled.button`
  display: flex;
  align-items: center;

  * {
  }
`;

const MemberSection = styled.div`
  grid-area: tskr-select-member;
  min-width: 0;
  padding: 0 20px 20px 0;

  @media (max-width: 680px) {
    padding: 0 20px 20px;
  }
`;

const Notice = styled.div`
  grid-column: 1 / -1;
  padding: 0 20px 20px;
  color: ${Palette.white_50};
  font-size: 14px;
  line-height: 1.5;
`;

export {
  Overlay,
  Card,
  Close,
  MemberSection,
  Notice,
}
