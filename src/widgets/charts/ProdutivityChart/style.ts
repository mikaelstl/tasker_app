import styled from "styled-components";
import Palette from "../../../assets/palette";

const SelectUser = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  border: 1px solid ${Palette.details};
  border-radius: 6px;

  padding: 8px;
`;

const Select = styled.select`
  background: none;
  border: none;
  outline: none;
`;

const Option = styled.option`
  background: ${Palette.items};
  padding: 4px;
  color: white;
  outline: none;

  &:hover {
    background: ${Palette.details};
  }
`;

export {
  SelectUser,
  Select,
  Option
}