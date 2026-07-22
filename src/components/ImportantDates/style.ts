import styled from "styled-components";
import Palette from "../../assets/palette";
import { Scroller } from "../misc/Scroller";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;

  padding: 20px 20px 0px 20px;

  width: 35%;
  min-width: 320px;
  height: 100%;
  background-color: ${Palette.tool_bars};

  overflow: hidden;
`;

const EventsScroller = styled(Scroller)`
  height: 100%;
  flex-direction: column;
  overflow-y: auto;
  overflow-y: overlay;
  padding-right: 4px;
`;

const Groups = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Group = styled.section`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const GroupDivider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${Palette.details};
`;

const GroupHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

const DateInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const DateLabel = styled.p`
  color: ${Palette.white};
  font-size: 14px;
  font-weight: 500;
`;

const EventCount = styled.p`
  color: ${Palette.gray};
  font-size: 14px;
`;

const EventList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const EmptyState = styled.div`
  padding: 24px;
  border: 1px dashed ${Palette.details};
  border-radius: 8px;
  background-color: ${Palette.gray_25};
  text-align: center;
`;

const EmptyTitle = styled.p`
  color: ${Palette.white};
  font-size: 14px;
  font-weight: 500;
`;

const EmptyDescription = styled.p`
  margin-top: 4px;
  color: ${Palette.gray};
  font-size: 14px;
`;

export {
  Container,
  DateInfo,
  DateLabel,
  EmptyDescription,
  EmptyState,
  EmptyTitle,
  EventCount,
  EventList,
  EventsScroller,
  Group,
  GroupDivider,
  GroupHeader,
  Groups,
};
