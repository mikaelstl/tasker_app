import styled from "styled-components";
import Palette from "../../../assets/palette";

const Container = styled.div`
  grid-area: tskr-select-member;

  display: flex;
  flex-direction: column;
  gap: 10px;

  width: 100%;
`;

const Wrapper = styled.div`
  position: relative;
`;

const Selected = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 44px;
  padding: 0 14px;
  background-color: ${Palette.items};
  border-radius: 12px;
  color: ${Palette.white};
  cursor: pointer;
  outline: none;
  transition: box-shadow 0.15s ease, background-color 0.15s ease;

  &:hover,
  &:focus-within {
    box-shadow: 0 0 0 2px rgba(74, 103, 229, 0.18);
    background-color: ${Palette.details};
  }
`;

const Field = styled.input`
  width: 100%;
  background: none;
  font-size: 14px;
  color: ${Palette.white};
  height: 42px;
  outline: none;

  &::placeholder {
    color: ${Palette.gray};
    font-weight: 400;
  }
`;

const Options = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  background: ${Palette.items};
  border-radius: 12px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 10;
  box-shadow: 0 14px 32px rgba(0, 0, 0, 0.28);
`;

const Option = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 44px;
  padding: 8px 14px;
  cursor: pointer;

  &:hover {
    background: ${Palette.details};
  }
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
  Wrapper,
  Label,
  Field,
  Options,
  Option,
  Selected
}
