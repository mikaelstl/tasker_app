import styled from "styled-components";
import Palette from "../../../assets/palette";

const Card = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  border-bottom: 1px solid ${Palette.items};
  
  padding: 20px;

  cursor: pointer;
`;



const Leading = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Trailing = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: space-between;

  height: 100%;
`;

const Details = styled.div``;

export {
  Card,
  Leading,
  Trailing,
  Details
}