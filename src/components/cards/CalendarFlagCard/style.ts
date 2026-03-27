import styled from "styled-components";
import Palette from "../../../assets/palette";

const Container = styled.div`
  display: flex;
  gap: 8px;

  padding: 6px 12px;

  background-color: ${Palette.items};
  
  border-left: 4px solid ${Palette.blue};
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
`;

export {
  Container
}