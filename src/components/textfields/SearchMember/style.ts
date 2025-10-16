import styled from "styled-components";
import Palette from "../../../assets/palette";

const Container = styled.div`
  flex: 1;
  display: flex;
  align-items: center;

  border-radius: 50px;
  border: 3px solid ${Palette.gray};
  
  padding: 0px 10px;
`;

const Field = styled.select`
  flex: 1;
  
  background: none;

  font-size: 16px;
`;

const Close = styled.button`
  display: flex;
  align-items: center;
`;

export {
  Container,
  Field,
  Close
}