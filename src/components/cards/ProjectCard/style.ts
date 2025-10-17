import styled from "styled-components";
import Palette from "../../../assets/palette";

const Card = styled.div`
  display: flex;
  justify-content: space-between;

  padding: 16px;

  min-width: 320px; height: 200px;

  border-radius: 6px;

  background-color: ${Palette.items};

  cursor: pointer;
`;

const Leading = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Trailing = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
`;

export {
  Card,
  Leading,
  Trailing
}