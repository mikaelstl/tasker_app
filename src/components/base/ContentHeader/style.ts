import styled from "styled-components";
import Palette from "../../../assets/palette";

const Container = styled.div`
  grid-area: tskr-content-header;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  
  padding: 20px 40px 10px 20px;
  
  border-bottom: 1px solid ${Palette.items};
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

export {
  Container,
  Actions
}