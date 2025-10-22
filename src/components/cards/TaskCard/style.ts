import styled from "styled-components";
import Palette from "../../../assets/palette";

const Card = styled.div`
  display: flex;
  flex: 1;
  gap: 18px;

  overflow: hidden;

  border-radius: 0px 6px 6px 0px;
  
  max-width: 360px;
  height: 140px;

  background-color: ${Palette.items};
`;

const Indicator = styled.div`
  background-color: ${Palette.blue};
  width: 4px;
  margin-right: 6px;
`

const Flag = styled.div`
  background-color: ${Palette.blue};
  width: 8px; height: 8px;
  margin-left: 100%;
  clip-path: polygon(100% 0, 0 0, 0 100%);
`;

const Leading = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  
  width: 100%;
  
  padding: 12px 12px 18px 0px;
`;

export {
  Card,
  Leading,
  Content,
  Indicator,
  Flag
}