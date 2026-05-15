import styled from "styled-components";
import Palette from "../../assets/palette";

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4%;
  
  height: 100%;

  background-color: ${Palette.tool_bars};
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const StageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 25px;

  width: fit-content;

  .task-stage-inputs {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .tskr-use-system-stage-btns {
    display: flex;
    gap: 10px;
  }
`;

const StageButton = styled.button`
  grid-area: tskr-stage-button;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  background-color: ${props => props.color ?? Palette.blue};

  padding: 10px 16px;
  border-radius: 50px;

  width: 100%;
  height: fit-content;

  cursor: pointer;
`;

const BackButton = styled.button`
  grid-area: tskr-stage-back-button;

  display: flex;
  justify-content: center;
  gap: 10px;

  padding: 10px 16px;

  width: 100%;
  height: fit-content;

  cursor: pointer;
`;

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 10px;
`;

export {
  Content,
  StageContainer,
  StageButton,
  HeaderContainer,
  Actions,
  BackButton
}