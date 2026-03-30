import styled from "styled-components";
import Palette from "../../../assets/palette";

const Container = styled.div`
  background-color: ${Palette.items};
  border-left: 3px solid ${Palette.blue};
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  padding: 15px;

  border-bottom: 1px solid ${Palette.details};
`

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
  Container,
  Header,
  Date,
  DaysTile
}