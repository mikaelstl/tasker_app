import styled from "styled-components";
import Palette from "../../../assets/palette";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;

  padding: 16px;
  border: 1px solid ${Palette.details};
  border-radius: 6px;
`;

const Leading = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export {
  Container,
  Leading
}
