import styled from "styled-components";
import Palette from "../../../assets/palette";

const Card = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1px;

  padding: 16px;

  min-width: 360px; height: 200px;
  max-width: fit-content;

  border-radius: 6px;

  background-color: ${Palette.items};

  cursor: pointer;
`;

const Leading = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  max-width: 70%;
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