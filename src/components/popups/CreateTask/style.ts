import styled from "styled-components";
import Palette from "../../../assets/palette";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 20;

  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;

  background: rgba(11, 10, 15, 0.78);
`;

const Card = styled.div`
  position: relative;

  display: grid;
  grid-template-areas:
    "tskr-content-header tskr-content-header"
    "tskr-form           tskr-select-member";
  grid-template-rows: min-content minmax(0, 1fr);
  grid-template-columns: minmax(0, 1.6fr) minmax(220px, 0.9fr);

  width: 50%;
  max-height: min(720px, 92vh);
  min-height: 0;

  border: 1px solid ${Palette.items};
  border-radius: 14px;
  background: ${Palette.content};
  box-shadow: 0 24px 70px rgba(0, 0, 0, 0.48);
  overflow: hidden;

  .tskr-content-header {
    padding: 18px 20px;
    border-bottom-color: 1px ${Palette.details};
  }

  .tskr-create-task-form {
    min-height: 0;
    padding: 22px 20px 24px;
    gap: 18px;

    input,
    textarea,
    select {
      transition: box-shadow 0.15s ease, background-color 0.15s ease;

      &:focus {
        box-shadow: 0 0 0 2px ${Palette.lightBlue_50};
        background-color: ${Palette.details};
      }
    }
  }

  @media (max-width: 680px) {
    grid-template-areas:
      "tskr-content-header"
      "tskr-form"
      "tskr-select-member";
    grid-template-columns: minmax(0, 1fr);
    overflow-y: auto;

    .tskr-content-header {
      padding: 16px;
    }

    .tskr-create-task-form {
      padding: 20px 16px;
    }
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
  padding: 22px 20px 24px;

  @media (max-width: 680px) {
    padding: 20px 16px 22px;
    border-top: 1px solid ${Palette.items};
    border-left: 0;
  }
`;

const Notice = styled.div`
  grid-column: 1 / -1;
  padding: 14px 20px 18px;
  border-top: 1px solid ${Palette.items};
  color: ${Palette.white_50};
  font-size: 13px;
  line-height: 1.5;
`;

export {
  Overlay,
  Card,
  Close,
  MemberSection,
  Notice,
}
