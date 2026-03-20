import styled from "styled-components";
import Palette from "../../../assets/palette";

const Container = styled.div`
  display: flex;
  gap: 10px;
  
  width: 100%;

  background-color: ${Palette.items};
  padding: 10px 15px;
  border-radius: 50px;
`
  
const Field = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  
  width: 100%;
  
  input, input:focus {
    background: none;
    outline: none;
    width: 100%;
  }
  input::placeholder {
    font-size: 16px;
    opacity: 100%;
    color: white;
    font-weight: 500;
    color: ${Palette.gray};
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;

  width: min-content;

  background: none;

  font-weight: 600;
`;

export {
  Container,
  Field,
  Button
}