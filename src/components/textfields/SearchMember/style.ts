import styled from "styled-components";
import Palette from "../../../assets/palette";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Wrapper = styled.div`
  position: relative;

  display: flex;
  align-items: center;
  gap: 8px;

  border-radius: 50px;
  border: 3px solid ${Palette.gray};
  
  padding: 0px 10px;

  width: fit-content;
`;

const Field = styled.input`
  flex: 100%;
  
  background: none;

  font-size: 16px;
`;

const Close = styled.button`
  display: flex;
  align-items: center;

  border: 1px solid red;
`;

const Members = styled.div`
  display: flex;
  gap: 8px;
`

const AddMember = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 32px; width: 32px;
  
  border-radius: 50%;
  border: 3px solid ${Palette.gray};
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
  transition: background 0.15s;

  &:hover {
    background: ${Palette.grayT};
  }

  span {
    font-size: 0.95rem;
    color: #333;
  }
`;

export {
  Container,
  Wrapper,
  Field,
  Close,
  AddMember,
  Members,
  Options,
  Option
}