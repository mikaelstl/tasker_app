import styled from "styled-components";
import Palette from "../../../assets/palette";

const Container = styled.div`
  display: flex;
  gap: 8px;

  padding: 6px 12px;

  background-color: ${Palette.items};
  
  border: 1px solid ${Palette.details};
  border-left: 4px solid ${Palette.blue};
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
`;

export {
  Container
}
