import styled from "styled-components";
import Palette from "../../../assets/palette";

const Container = styled.div`
  display: flex;
  flex-direction: column;

  background-color: ${Palette.items};
  border-left: 3px solid ${Palette.blue};
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  padding: 15px;

  border-bottom: 1px solid ${Palette.details};
`;

interface HealthTileProps {
  background?: string;
}

const HealthTile = styled.div<HealthTileProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 10px;

  width: 100%;

  background-color: ${props => props.background ?? 'none'};
`;

const Content = styled.div`
  display: flex;
  flex: 1;
`;

export {
  Container,
  Header,
  Content,
  HealthTile
}