import styled from "styled-components";
import Palette from "../../assets/palette";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;

  padding: 20px 20px 0px 20px;

  width: fit-content;
  min-width: 320px;
  height: 100%;
  background-color: ${Palette.tool_bars};

  overflow: hidden;
`;

export {
  Container,
}