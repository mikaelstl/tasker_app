import styled from "styled-components";
import Palette from "../../../assets/palette";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  min-height: 0;

  height: 100%;

  overflow: hidden;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  gap: 20px;
  min-height: 0;
  
  width: 100%; height: 100%;
  
  padding: 0px 20px;

  overflow: hidden;
`;

const MembersArea = styled.div`
  flex: 1 1 auto;
  height: auto;
  min-height: 0;
  overflow: hidden;
`

const EmptyState = styled.p`
  padding: 24px 8px;
  color: ${Palette.gray};
  font-size: 13px;
  text-align: center;
`

const MemberCard = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 78px;
  padding: 16px;
  border-radius: 12px;
  background-color: ${Palette.items};
`

export {
  Container,
  Content,
  MembersArea,
  EmptyState,
  MemberCard
}
