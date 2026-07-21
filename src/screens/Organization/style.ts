import styled from "styled-components";
import Palette from "@/assets/palette";

const Container = styled.section`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const Content = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  gap: 28px;

  padding: 24px 20px 40px;
  overflow-y: auto;
`;

const RoleGroup = styled.section`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const GroupHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const GroupTitle = styled.h3`
  margin: 0;

  color: ${Palette.white};
  font-size: 16px;
  font-weight: 600;
`;

const GroupCount = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  min-width: 24px;
  height: 24px;
  padding: 0 7px;
  border-radius: 999px;

  background-color: ${Palette.gray_25};
  color: ${Palette.white_50};
  font-size: 12px;
  font-weight: 600;
`;

const MemberGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
`;

const EmptyMessage = styled.p`
  margin: 0;
  color: ${Palette.gray};
  font-size: 14px;
`;

export {
  Container,
  Content,
  EmptyMessage,
  GroupCount,
  GroupHeader,
  GroupTitle,
  MemberGrid,
  RoleGroup,
};
