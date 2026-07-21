import styled from "styled-components";
import Palette from "../../../assets/palette";

const Container = styled.div`
  width: 100%;
`;

const Header = styled.div`
  border-left: 2px solid ${Palette.blue};
  padding: 8px 0px 8px 14px;
`;

interface CardProps {
  $backgroundColor?: string;
  $borderColor?: string;
}

const Card = styled.div<CardProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  background-color: ${props => props.$backgroundColor ?? Palette.lightBlue_50};
  
  margin-left: 28px;
  border: 1px solid ${props => props.$borderColor ?? Palette.lightBlue};
  border-radius: 4px;

  .tskr-title {
    padding: 5px 8px;
  }
`;

const Cards = styled.div`
  display: grid;
  grid-auto-flow: row;
  gap: 8px;
`

export {
  Container,
  Header,
  Card,
  Cards
}
