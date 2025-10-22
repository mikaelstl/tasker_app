import styled from "styled-components";
import Palette from "../../../assets/palette";

const Container = styled.div`
  display: grid;
  grid-auto-flow: row;
  gap: 20px;

  width: fit-content;

  .inputs {
    display: grid;
    grid-auto-flow: row;
    gap: 25px;
  }
`;

const Form = styled.form`
  display: grid;
  grid-auto-flow: row;
  gap: 25px;

  overflow: auto;
`;

const SubmitButton = styled.button`
  width: 100%;

  padding: 17px 0px;
  
  color: ${Palette.white};
  font-size: 16px;
  font-weight: bold;
  font-family: 'Montserrat';

  border: none;
  border-radius: 9999px;
  background-color: ${Palette.blue};
`;

const Inputs = styled.div`
  display: grid;
  grid-auto-flow: row;
  gap: 25px;
`;

export {
  Container,
  Form,
  SubmitButton,
  Inputs
}