import styled from "styled-components";
import Palette from "../../../assets/palette";

const Container = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 8px;

  padding: 10px 14px;
  
  border-radius: 4px;
  
  background-color: ${Palette.content};

  font-weight: 500;
`;

const TextArea = styled.textarea`
  width: 100%;

  background: none;

  font-size: 16px;
  font-weight: 500;

  padding: 4px;

  border: none;
  resize: none;
`;

export {
  Container,
  TextArea
}