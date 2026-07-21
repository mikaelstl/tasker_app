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
  gap: 4px;
  
  border-bottom: 1px solid ${Palette.items};
  
  padding: 10px 4px;
`;

interface NavItemProps {
  $activated?: boolean;
}

const NavItem = styled.button<NavItemProps>`
  display: flex;
  align-items: start;
  gap: 10px;
  
  width: 100%;
  
  padding: 10px 20px;
  
  background-color: ${({ $activated }) => $activated ? Palette.gray_25 : Palette.transparent};
  border: none;
  border-radius: 6px;

  font-size: 14px;
  font-weight: 500;
  
  cursor: pointer;

  transition: background-color 160ms ease;

  &:hover {
    background-color: ${Palette.gray_25};
  }
`;

const ProjectNav = styled.div`
  width: 100%;
  height: 100%;
`;

const Accordion = styled.button`
  display: flex;
  align-items: start;
  justify-content: space-between;
  
  width: 100%;
  
  padding: 10px 20px;

  font-size: 14px;
  font-weight: 600;
`;

const Actions = styled.div`
  padding: 4px;

  .log-out {
    color: ${Palette.red}
  }
  
  .log-out svg {
    fill: ${Palette.red};
  }
`;

const Leading = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export {
  Container,
  Nav,
  NavItem,
  Actions,
  ProjectNav,
  Accordion,
  Leading
}
