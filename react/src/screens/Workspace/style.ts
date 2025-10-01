import styled from "styled-components";
import Palette from "../../assets/palette";

const Content = styled.div`
  display: grid;
  grid-template:
    "recent friends"
    "week friends" / 1fr .25fr;
  
  height: 100%;

  overflow: hidden;
`;

const Recent = styled.div`
  grid-area: recent;

  overflow: hidden;

  display: flex;
  flex-direction: column;
  gap: 12px;

  padding: 20px;
`;

const ToThisWeek = styled.div`
  grid-area: week;

  display: grid;
  grid-auto-flow: row;
  gap: 12px;
  
  padding: 0px 20px;

  width: fit-content;
  overflow: hidden;
`;

const Friends = styled.div`
  grid-area: friends;

  display: flex;
  flex-direction: column;

  background-color: ${Palette.tool_bars};
  
  padding: 16px;

  overflow: hidden;
`;

export {
  Content,
  Recent,
  Friends,
  ToThisWeek
}