import styled from "styled-components";
import Palette from "../../assets/palette";
import { Scroller } from "../../components/misc/Scroller";

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  
  height: 100%;

  background-color: ${Palette.tool_bars};
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const WorkspaceScroller = styled(Scroller)`
  width: 100%;
  max-height: 70%;
  height: 70%;

  &.vertical {
    overflow-y: auto;
  }
`;

const Actions = styled.div`
  display: grid;
  gap: 14px;
  justify-items: center;
  width: 100%;
`;

const CreateOrganizationButton = styled.button`
  color: ${Palette.white};
  font-size: 14px;
  font-weight: 500;

  background-color: transparent;
  border: 0;
  padding: 0;
  cursor: pointer;
`;

export {
  Content,
  HeaderContainer,
  WorkspaceScroller,
  Actions,
  CreateOrganizationButton,
}
