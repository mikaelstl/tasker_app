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

const Tile = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;

  padding: 8px 0px;
`;

const Content = styled.div`
  padding: 0px 20px;
`;

export {
  Container,
  Header,
  Tile,
  Content
}