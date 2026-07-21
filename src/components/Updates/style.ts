import styled from "styled-components";
import Palette from "../../assets/palette";
import { Scroller } from "../misc/Scroller";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;

  padding: 20px 16px 0 20px;

  width: 40%;
  min-width: 360px;
  height: 100%;
  background-color: ${Palette.tool_bars};

  overflow: hidden;
`;

const Timeline = styled(Scroller)`
  padding-right: 4px;
`;

export {
  Container,
  Timeline,
}
