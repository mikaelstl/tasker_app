import styled from "styled-components";
import Palette from "../../../../assets/palette";

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  width: 330px;

  border-radius: 9999px;
  
  padding: 0px 15px;

  background-color: ${Palette.items};
`;

const Input = styled.input`
  width: 100%;
  color: white;
  outline: none;
  border: none;
  background: none;
  caret-color: ${Palette.white};
  padding: 10px 0px;
  font-size: 16px;

  &:focus {
    outline: none;
    border: none;
    background: none;
  }

  &::placeholder {
    font-size: 16px;
    font-family: 'Montserrat';
    color: ${Palette.white};
  }
`;

const ShowPassword = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: fit-content;
  height: fit-content;
`;

export {
  Container,
  Input,
  ShowPassword
}