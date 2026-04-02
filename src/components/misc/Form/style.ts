import styled from "styled-components";
import Palette from "../../../assets/palette";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  width: fit-content;
`;

const Form = styled.form`
  grid-area: tskr-form;

  display: grid;
  grid-auto-flow: row;
  gap: 25px;

  overflow: auto;
`;

const SubmitButton = styled.button`
  width: 100%;

  padding: 10px;
  
  color: ${Palette.white};
  font-size: 16px;
  font-weight: 500;

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