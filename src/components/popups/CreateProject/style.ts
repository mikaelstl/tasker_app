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

  display: flex;
  flex-direction: column;
  gap: 20px;
  width: min(680px, 100%);
  max-height: min(720px, 90vh);
  min-height: 0;
  padding: 0 20px 20px;

  border: 1px solid ${Palette.items};
  border-radius: 14px;
  background: ${Palette.tool_bars};
  box-shadow: 0 20px 60px #00000066;

  overflow: hidden;

  @media (max-width: 560px) {
    max-height: 90vh;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;

  border-bottom: 1px solid ${Palette.blue};

  padding-bottom: 8px;
`;

const Content = styled.div`
  display: grid;
  grid-template-areas:
    "tskr-proj-infos tskr-select-member"
    "tskr-proj-links ."
  ;
  grid-template-columns: 1fr auto;
  row-gap: 30px;
  column-gap: 20px;

  width: 100%;

  min-height: 0;
  overflow: auto;
`;

const Infos = styled.div`
  grid-area: tskr-proj-infos;

  display: grid;
  gap: 20px;

  width: 100%;
`;

const Links = styled.div`
  grid-area: tskr-proj-links;

  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export {
  Overlay,
  Content,
  Card,
  Header,
  Infos,
  Links
}
