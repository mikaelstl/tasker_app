import styled from "styled-components";
import Palette from "../../../assets/palette";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 20;

  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;

  background: #00000080;
`;

const Card = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  gap: 20px;
  width: min(560px, 100%);
  max-height: min(640px, 90vh);
  min-height: 0;
  padding: 0 20px 20px;

  border: 1px solid ${Palette.items};
  border-radius: 14px;
  background: ${Palette.tool_bars};
  box-shadow: 0 20px 60px #00000066;
  overflow: hidden;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;

  border-bottom: 1px solid ${Palette.blue};

  padding-bottom: 8px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-y: auto;
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
`;

export {
  Overlay,
  Card,
  Close,
  Header,
  Members,
  AddMember,
  Content,
}
