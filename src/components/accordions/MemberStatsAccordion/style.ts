import styled from "styled-components";
import Palette from "../../../assets/palette";

const Container = styled.div`
  display: grid;

  width: 100%;
  height: fit-content;
`;

const Header = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 1fr .4fr auto;
  
  align-items: center;
  gap: 10px;
  
  padding-bottom: 15px;

  width: 100%;
  
  border-bottom: 1px solid ${Palette.items};
`;

const Indicator = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const Indicators = styled.div`
  display: grid;
  grid-template-columns: .25fr .25fr .25fr .25fr;

  gap: 10px;
`;

const Leading = styled.div`
  display: flex;
  width: 100%;
`;

const Button = styled.button`
  display: flex;
  height: min-content;
`;

const Content = styled.div`
  height: fit-content;
`;

const SpentTimeTile = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  width: 100%;
`;

const Task = styled.div`
  display: flex;
  flex-direction: column;

  padding: 10px 20px;
`;

export {
  Container,
  Indicator,
  Leading,
  Header,
  Indicators,
  Button,
  Content,
  SpentTimeTile,
  Task,
}