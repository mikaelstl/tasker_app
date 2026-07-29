import styled from "styled-components";
import Palette from "../../../assets/palette";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 0;
  height: 100%;
  overflow: hidden;
`;

const Content = styled.div`
  width: 100%;
  flex: 1;
  min-height: 0;
  overflow: auto;
  padding: 18px 24px 24px;
`;

const Layout = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.55fr) minmax(320px, 0.95fr);
  gap: 20px;
  align-items: start;
  width: 100%;
  max-width: 1320px;
  margin: 0 auto;

  @media (max-width: 1080px) {
    grid-template-columns: 1fr;
  }
`;

const MainColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-width: 0;
`;

const SideColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-width: 0;
`;

const Panel = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const PanelHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const PanelTitle = styled.h3`
  color: ${Palette.white};
  font-size: 18px;
  font-weight: 600;
  letter-spacing: -0.01em;
`;

const PanelDescription = styled.p`
  color: ${Palette.white_50};
  font-size: 13px;
  line-height: 1.5;
`;

const FormGrid = styled.form`
  display: grid;
  gap: 16px;
`;

const FieldsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

const FullWidth = styled.div`
  grid-column: 1 / -1;
`;

const StageField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StagePreview = styled.div`
  display: flex;
  align-items: center;
  min-height: 32px;
`;

const SelectBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ManagerField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 4px;
`;

const ManagerCurrent = styled.div`
  padding: 12px 14px;
  border-radius: 12px;
  background: ${Palette.items};
  border: 1px solid ${Palette.details};
`;

const ManagerSelect = styled.select`
  width: 100%;
  height: 44px;
  padding: 0 14px;
  color: ${Palette.white};
  background: ${Palette.items};
  border: 1px solid ${Palette.details};
  border-radius: 12px;
  font-size: 14px;
  outline: none;

  &:focus {
    border-color: ${Palette.blue};
    box-shadow: 0 0 0 2px rgba(74, 103, 229, 0.18);
  }

  option {
    color: ${Palette.white};
    background: ${Palette.tool_bars};
  }
`;

const InfoLabel = styled.span`
  color: ${Palette.white_50};
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.04em;
`;

const MembersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const MembersMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

const MembersCount = styled.span`
  color: ${Palette.white_50};
  font-size: 12px;
  white-space: nowrap;
`;

const MembersEmpty = styled.p`
  color: ${Palette.white_50};
  font-size: 13px;
  line-height: 1.5;
  padding: 14px;
  border-radius: 12px;
  background: ${Palette.items};
  border: 1px dashed ${Palette.details};
`;

export {
  Container,
  Content,
  Layout,
  MainColumn,
  SideColumn,
  Panel,
  PanelHeader,
  PanelTitle,
  PanelDescription,
  FormGrid,
  FieldsGrid,
  FullWidth,
  StageField,
  StagePreview,
  SelectBlock,
  ManagerField,
  ManagerCurrent,
  ManagerSelect,
  InfoLabel,
  MembersList,
  MembersMeta,
  MembersCount,
  MembersEmpty,
};
