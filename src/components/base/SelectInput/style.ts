import styled from "styled-components";
import Palette from "../../../assets/palette";

const Container = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 8px;

  padding: 10px 14px;
  
  border-radius: 4px;

  font-weight: 500;
`;

const Select = styled.select`
  width: fit-content;

  text-align: center;

  font-size: 16px;
  font-weight: 700;
  color: white;

  padding: 8px;

  border: none;
  border-radius: 50px;
`;

const Option = styled.option`
  width: 100%;

  background-color: ${Palette.content};
  border-bottom: ${Palette.gray};
`;

export {
  Container,
  Select,
  Option
}