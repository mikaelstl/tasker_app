import styled from "styled-components";
import Palette from "../../../assets/palette";

const Container = styled.div`
  grid-area: navbar;
  
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 210px;

  background-color: ${Palette.tool_bars};
`;

const Nav = styled.nav`
  display: grid;
  grid-auto-flow: row;
  gap: 10px;
  
  border-bottom: 1px solid ${Palette.items};
  
  padding: 10px 0px;
`;

const NavItem = styled.button`
  display: flex;
  align-items: start;
  gap: 10px;
  
  width: 100%;
  
  padding: 10px 20px;
  
  background: none;
  border: none;
  color: white;
  
  font-size: 16px;
  font-weight: 600;
  
  cursor: pointer;
`;

const Actions = styled.div`
  .log-out {
    color: ${Palette.red}
  }
`;

export {
  Container,
  Nav,
  NavItem,
  Actions
}