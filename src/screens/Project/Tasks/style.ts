import styled from "styled-components";
import Palette from "../../../assets/palette";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  height: 100%;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 20px;
`;

const Content = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 12px;
  
  padding: 10px;
  
  height: 100%;

  overflow: hidden;
`;

interface StepProps {
  color?: string;
}

const Step = styled.div<StepProps>`
  display: flex;
  flex-direction: column;
  gap: 10px;
  
  overflow: hidden;
  
  padding: 10px;
  
  border-top: 3px solid ${props => props.color ?? Palette.gray};
  
  height: 100%; width: 100%;
`;

export {
  Container,
  Step,
  Header,
  Content
}