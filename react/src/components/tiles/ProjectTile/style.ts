import styled from "styled-components";
import Palette from "../../../assets/palette";

export const Card = styled.div`
  display: grid;
  grid-template-columns: .75fr .25fr .25fr .25fr .25fr;
  align-items: center;
  
  border-top: 1px solid ${Palette.items};
  
  padding: 20px;
`