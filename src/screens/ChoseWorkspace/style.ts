import styled from "styled-components";
import Palette from "../../assets/palette";
import { Scroller } from "../../components/misc/Scroller";
import { Button } from "@/components/buttons/Button";

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  
  height: 100%;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const WorkspaceScroller = styled(Scroller)`
  max-height: 70%;
  height: fit-content;

  gap: 12px;
`;

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  width: 30%;
`;

const CreateOrganizationButton = styled(Button)`
  display: flex;
  justify-content: center;

  color: ${Palette.white};
  font-size: 14px;
  font-weight: 500;

  width: 100%;

  background: ${Palette.items};

  cursor: pointer;

  &:hover {
    background: ${Palette.details};
  }
`;

export {
  Content,
  HeaderContainer,
  WorkspaceScroller,
  Actions,
  CreateOrganizationButton,
}
