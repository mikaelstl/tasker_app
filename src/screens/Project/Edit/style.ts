import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  height: 100%;

  overflow: hidden;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 20px;
`;

const Content = styled.div`
  display: grid;
  grid-template-areas:
    "tskr-proj-infos   tskr-select-member"
    "tskr-members-area tskr-advanced-setting"
    "tskr-proj-links   tskr-advanced-setting"
  ;
  grid-template-columns: 1fr min-content;
  grid-template-rows: min-content fit-content min-content;
  row-gap: 30px;
  column-gap: 20px;

  width: 70%;

  overflow: auto;
`;

const MembersArea = styled.div`
  grid-area: tskr-members-area;

  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const AdvancedSettings = styled.div`
  grid-area: tskr-advanced-setting;

  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export {
  Container,
  Header,
  Content,
  MembersArea,
  AdvancedSettings
}