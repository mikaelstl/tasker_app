import styled from "styled-components"
import Palette from "../../../assets/palette";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;

  padding: 10px;
  border-radius: 6px;

  background-color: ${Palette.items};
`;

const Leading = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  background-color: ${Palette.items};
`;

const Link = styled.a`
  color: ${Palette.lightBlue};
`;

const Close = styled.button``;

export {
  Container,
  Leading,
  Link,
  Close
}