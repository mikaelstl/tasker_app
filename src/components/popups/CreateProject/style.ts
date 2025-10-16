import styled from "styled-components";
import Palette from "../../../assets/palette";

const Overlay = styled.div`
  position: absolute;

  display: flex;
  flex: 1 1 auto;
  align-items: center;
  justify-content: center;

  background-color: #00000080;

  height: 100%;
  width: 100%;
`;

const Card = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  gap: 16px;
  
  background-color: ${Palette.tool_bars};

  padding: 20px;

  width: 60%;

  border-radius: 6px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;

  border-bottom: 1px solid ${Palette.blue};

  padding-bottom: 8px;
`;

const Close = styled.button`
`;

const Members = styled.div`
  display: flex;
  gap: 8px;
`;

const AddMember = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 32px; width: 32px;

  border-radius: 50%;
  border: 3px solid ${Palette.gray};
`;

export {
  Overlay,
  Card,
  Close,
  Header,
  Members,
  AddMember,
}