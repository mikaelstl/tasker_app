import styled from "styled-components";
import Palette from "../../../assets/palette";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr .25fr .25fr .25fr;

  border-bottom: 1px solid ${Palette.items};

  padding: 20px;

  height: fit-content;
`;

const Indicator = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const Leading = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export {
  Container,
  Indicator,
  Leading
}