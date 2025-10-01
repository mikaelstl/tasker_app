import styled from "styled-components";
import Palette from "../../assets/palette";

const Content = styled.div`
  display: grid;
  grid-template: "recent friends"
                 "week friends" / 1fr .25fr;

  width: 100%;
  height: 100%;

  overflow: hidden;
`;

const Recent = styled.div`
  grid-area: recent;
  
  overflow: hidden;
    
  padding: 30px 0px 0px 20px;
`;

const Friends = styled.div`
  grid-area: friends;
  
  height: 100%;

  display: flex;
  flex-direction: column;
  gap: 20px;

  padding: 20px 0px 0px 20px;
  
  background-color: ${Palette.tool_bars};

  overflow: hidden;
`;

const ToThisWeek = styled.div`
  grid-area: week;

  display: flex;
  flex-direction: column;
  gap: 20px;

  height: 100%;

  padding: 20px 0px 0px 20px;
`;

export {
  Content,
  Recent,
  Friends,
  ToThisWeek
}