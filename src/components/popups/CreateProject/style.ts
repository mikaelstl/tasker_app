import styled from "styled-components";
import Palette from "../../../assets/palette";

const Overlay = styled.div`
  position: absolute;

  display: flex;
  flex: 1 1 auto;
  align-items: center;
  justify-content: center;

  background-color: #00000080;

  height: 100%;
  width: 100%;
`;

const Card = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  gap: 16px;
  
  background-color: ${Palette.tool_bars};

  padding: 20px;

  width: 60%;
  height: fit-content;
  max-height: 90%;

  border-radius: 6px;

  overflow: hidden;
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

  overflow: auto;
`;

const Infos = styled.div`
  grid-area: tskr-proj-infos;

  display: grid;
  gap: 8px;

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