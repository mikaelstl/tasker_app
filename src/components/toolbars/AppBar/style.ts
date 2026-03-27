import styled from "styled-components";
import Palette from "../../../assets/palette";

const Container = styled.div`
  grid-area: appbar;

  display: flex;
  align-items: center;
  justify-content: space-between;
  
  padding: 12px 20px;
  
  background-color: ${Palette.tool_bars};
  
  border-bottom: 1px solid ${Palette.items};
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const UserInfos = styled.div`
  display: grid;
  grid-auto-flow: column;
  gap: 16px;
  
  align-items: center;
`;

export {
  Container,
  Logo,
  UserInfos
}