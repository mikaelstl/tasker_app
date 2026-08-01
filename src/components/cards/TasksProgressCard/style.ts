import styled from "styled-components";
import Palette from "../../../assets/palette";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  width: 50%;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  border-left: 2px solid ${Palette.blue};
  padding-left: 14px;
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

  width: 100%;

  border-radius: 4px;

  .tskr-title {
    padding: 5px 8px;
  }
`;

const Cards = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  width: 100%;
`;

interface StageInfosProps {
  $color: string;
}

const StageInfos = styled.div<StageInfosProps>`
  display: flex;
  align-items: center;
  gap: 8px;

  padding-left: 8px;

  color: ${({ $color }) => $color};

  svg {
    flex: 0 0 20px;
    width: 20px;
    height: 20px;
    stroke-width: 2;
  }

  .tskr-title {
    padding-left: 0;
  }
`;

const SelectProjId = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

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
  StageInfos,
  Select,
  SelectProjId,
  Option
}
