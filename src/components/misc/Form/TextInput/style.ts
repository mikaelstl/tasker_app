import styled from "styled-components";
import Palette from "../../../../assets/palette";

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  color: ${Palette.gray};
  font-size: 14px;
  font-weight: 600;
`;

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
  font-size: 14px;

  &:focus {
    outline: none;
    border: none;
    background: none;
  }

  &::placeholder {
    font-size: 14px;
    font-family: 'Poppins';
    color: ${Palette.gray};
    font-weight: 400;
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
  Field,
  Label,
  Container,
  Input,
  ShowPassword
}
