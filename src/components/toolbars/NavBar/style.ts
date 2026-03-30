import styled from "styled-components";
import Palette from "../../../assets/palette";
import { Project } from "../../../screens/Project";

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

interface NavItemProps {
  activated?: boolean;
}

const NavItem = styled.button<NavItemProps>`
  display: flex;
  align-items: start;
  gap: 10px;
  
  width: 100%;
  
  padding: 10px 20px;
  
  background: none;
  border: none;
  color: ${props => props.activated ? Palette.white : Palette.gray};

  font-size: 16px;
  font-weight: 600;
  
  cursor: pointer;

  svg {
    fill: ${props => props.activated ? Palette.white : Palette.gray};
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

  font-size: 16px;
  font-weight: 600;
`;

const Actions = styled.div`
  .log-out {
    color: ${Palette.red}
  }
  
  svg {
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