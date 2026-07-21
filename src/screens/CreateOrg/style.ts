import styled from "styled-components";
import Palette from "@/assets/palette";

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4%;

  height: 100%;

  background-color: ${Palette.tool_bars};
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

export { Content, HeaderContainer };
