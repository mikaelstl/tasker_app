import styled from "styled-components";
import Palette from "../../../assets/palette";

const Container = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Input = styled.input`
  width: 100%;

  background: none;

  font-size: 16px;
  font-weight: 500;

  padding: 10px;
  border-radius: 6px;

  background-color: ${Palette.items};

  &::placeholder {
    color: ${Palette.white};
  }
`;

export {
  Container,
  Input
}