import styled from "styled-components";
import Palette from "../../../assets/palette";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  width: 100%;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  border-left: 2px solid ${Palette.blue};
  padding-left: 14px;
`;

interface CardProps {
  color?: string
}

const Card = styled.div<CardProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  background-color: ${props => props.color ?? Palette.lightBlue_50};

  width: 100%;

  border-radius: 4px;

  .tskr-title {
    padding: 5px 8px;
  }
`;

const Cards = styled.div`
  display: flex;
  gap: 4px;

  width: 100%;
`;

const SelectProjId = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  border: 1px solid ${Palette.details};
  border-radius: 6px;

  padding: 8px;
`;

const Select = styled.select`
  background: none;
  border: none;
  outline: none;
`;

const Option = styled.option`
  background: ${Palette.items};
  padding: 4px;
  color: white;
  outline: none;

  &:hover {
    background: ${Palette.details};
  }
`;

export {
  Container,
  Header,
  Card,
  Cards,
  Select,
  SelectProjId,
  Option
}