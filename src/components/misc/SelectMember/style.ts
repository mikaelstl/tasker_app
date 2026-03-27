import styled from "styled-components";
import Palette from "../../../assets/palette";

const Container = styled.div`
  grid-area: tskr-select-member;

  display: flex;
  flex-direction: column;
  gap: 8px;

  width: 280px;
`;

const Wrapper = styled.div`
  position: relative;
`;

const Selected = styled.div`
  border: 4px solid ${Palette.blue};
  border-radius: 4px;
  padding: 6px 14px;
  background-color: ${Palette.items};

  cursor: pointer;
`;

const Field = styled.input`
  flex: 100%;
  
  background: none;

  font-size: 16px;

  height: 32px;

  &::placeholder {
    color: ${Palette.gray};
    font-weight: 500;
  }
`;

const Close = styled.button`
  display: flex;
  align-items: center;

  border: 1px solid red;
`;

const Options = styled.div`
  position: absolute;
  top: 110%;
  left: 0;
  right: 0;
  background: ${Palette.items};
  border-radius: 8px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 99999999;
`;

const Option = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  cursor: pointer;
  transition: border 0.15s;

  &:hover {
    border-left: 3px solid ${Palette.blue};
  }
`;

export {
  Container,
  Wrapper,
  Field,
  Close,
  Options,
  Option,
  Selected
}