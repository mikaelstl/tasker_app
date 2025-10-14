import styled from "styled-components";
import Palette from "../../assets/palette";

const Content = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;

  background-color: ${Palette.tool_bars};
`;

const Container = styled.div`
  width: fit-content;

  display: grid;
  grid-auto-flow: row;
  gap: 25px;
`;

const Label = styled.span`
  text-align: center;
  letter-spacing: 12px;
`;

export {
  Container,
  Content,
  Label
}