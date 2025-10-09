import styled from "styled-components";
import Palette from "../../assets/palette";

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8%;
  
  height: 100%;

  background-color: ${Palette.tool_bars};
`;