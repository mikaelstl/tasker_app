import styled from "styled-components";
import Palette from "../../../assets/palette";

const Card = styled.div`
  display: grid;
  grid-template-areas:
    "tskr-card-leading tskr-card-content tskr-card-trailing"
    "tskr-card-leading tskr-card-footer tskr-card-trailing"
  ;
  grid-template-columns: min-content 1fr min-content;
  grid-template-rows: minmax(0, 1fr) auto;
  justify-content: space-between;
  gap: 12px;

  padding: 16px;

  min-width: 360px; height: 200px;
  max-width: 100%;

  border: 1px solid ${Palette.details};
  border-radius: 6px;

  background-color: ${Palette.items};

  cursor: pointer;
`;

const Leading = styled.div`
  grid-area: tskr-card-leading;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: fit-content;
`;

const Content = styled.div`
  grid-area: tskr-card-content;

  display: flex;
  flex-direction: column;
`;

const Footer = styled.div`
  grid-area: tskr-card-footer;

  display: flex;
  align-items: center;
  gap: 12px;
`;

const Trailing = styled.div`
  grid-area: tskr-card-trailing;

  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
`;

const OpenProjectButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 36px;
  height: 36px;
  padding: 0;

  color: ${Palette.gray};
  border: 1px solid ${Palette.details};
  border-radius: 9999px;
  background-color: transparent;

  cursor: pointer;

  svg {
    width: 20px;
    height: 20px;
    transition: color 0.2s ease;
  }

  &:hover svg {
    color: ${Palette.lightBlue};
  }
`;

export {
  Card,
  Leading,
  Trailing,
  Content,
  Footer,
  OpenProjectButton
}
