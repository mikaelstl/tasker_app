import styled from "styled-components";
import Palette from "../../../assets/palette";

const Container = styled.div`
  position: fixed;
  inset: 0;
  z-index: 20;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 20px;
  background: #00000080;
`;

const Dialog = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 0;

  width: min(960px, 100%);
  height: min(720px, 90vh);
  max-height: min(90vh, 900px);

  overflow: hidden;
  border: 1px solid ${Palette.items};
  border-radius: 14px;
  background: ${Palette.tool_bars};
  box-shadow: 0 20px 60px #00000066;
`;

const ModalHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;

  padding: 18px 22px;
  border-bottom: 1px solid ${Palette.items};
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 0 0 auto;
`;

const CloseButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;

  width: 44px;
  height: 44px;
  border: 0;
  border-radius: 999px;
  color: ${Palette.white};
  background: ${Palette.items};
  cursor: pointer;

  &:hover {
    background: ${Palette.gray};
  }
`;

const TaskInfo = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 18px;
  min-width: 0;
  min-height: 0;
  overflow-y: auto;

  padding: 22px;
  border-left: 1px solid ${Palette.items};
  background: ${Palette.items};
`;

const TaskLayout = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 280px;
  flex: 1 1 auto;
  min-height: 0;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
    grid-template-rows: minmax(0, 1fr) auto;

    ${TaskInfo} {
      max-height: 38vh;
      border-top: 1px solid ${Palette.items};
      border-left: 0;
    }
  }
`;

const Description = styled.div`
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
  padding: 20px 22px 28px;
`;

const Links = styled.div`
  grid-area: tskr-task-links;

  display: flex;
`;

const Tags = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const Tag = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  min-width: 0;
`;

const Actions = styled.div`
  grid-area: tskr-button;
  display: flex;
  gap: 8px;
`;

const EditForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 720px;
`;

export {
  Container,
  Dialog,
  ModalHeader,
  HeaderActions,
  CloseButton,
  TaskLayout,
  TaskInfo,
  Description,
  Tags,
  Tag,
  Links,
  Actions,
  EditForm,
};
