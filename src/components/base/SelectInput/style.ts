import styled from "styled-components";
import Palette from "../../../assets/palette";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Select = styled.select`
  width: 100%;
  height: 44px;
  padding: 0 14px;
  color: ${Palette.white};
  background: ${Palette.items};
  border: 1px solid ${Palette.details};
  border-radius: 12px;
  font-size: 14px;
  outline: none;

  &:focus {
    border-color: ${Palette.blue};
    box-shadow: 0 0 0 2px rgba(74, 103, 229, 0.18);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const Option = styled.option`
  color: ${Palette.white};
  background: ${Palette.tool_bars};
`;

const Label = styled.label`
  color: ${Palette.white_50};
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.04em;
`;

export {
  Container,
  Label,
  Select,
  Option
}
