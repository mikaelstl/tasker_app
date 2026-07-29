import styled from "styled-components";
import Palette from "../../../assets/palette";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-height: 0;

  height: 100%;
  overflow: hidden;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 20px;
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  flex: 1 1 auto;
  gap: 12px;
  min-height: 0;
  
  padding: 10px;
  
  height: auto;
  width: 100%;
`;

interface StepProps {
  color?: string;
}

const Step = styled.div<StepProps>`
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-height: 0;
  
  overflow: hidden;
  
  padding: 10px;
  
  border-top: 3px solid ${props => props.color ?? Palette.gray};
  
  height: 100%;
`;

export {
  Container,
  Step,
  Header,
  Content
}
