import styled from "styled-components";
import Palette from "../../../assets/palette";

const Date = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;

  padding: 20px;

  border-bottom: 1px solid ${Palette.details};
`;

const DaysTile = styled.div`
  padding: 14px;
`;

export {
  Date,
  DaysTile
}