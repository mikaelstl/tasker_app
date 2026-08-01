import styled from "styled-components";
import Palette from "../../../assets/palette";

const Container = styled.article`
  width: 100%;
  overflow: hidden;
  border-radius: 12px;
  background-color: ${Palette.content};
`;

const Header = styled.button`
  display: grid;
  grid-template-columns: minmax(190px, 1fr) auto 24px;
  align-items: center;
  gap: 24px;
  width: 100%;
  padding: 14px 18px;
  border: 0;
  color: ${Palette.white};
  background-color: ${Palette.content};
  text-align: left;
  cursor: pointer;
  transition: background-color 0.15s ease;

  &:hover {
    background-color: ${Palette.items};
  }

  &:focus-visible {
    outline: 2px solid ${Palette.lightBlue};
    outline-offset: -2px;
  }

  @media (max-width: 760px) {
    grid-template-columns: 1fr 24px;
    gap: 14px;
  }
`;

const HeaderIdentity = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  min-width: 0;

  .tskr-user {
    flex-shrink: 0;
  }

  @media (max-width: 520px) {
    align-items: flex-start;
    flex-direction: column;
    gap: 8px;
  }
`;

const ProjectName = styled.span`
  min-width: 0;
  overflow: hidden;
  color: ${Palette.white_50};
  font-size: 12px;
  line-height: 1.4;
  text-overflow: ellipsis;
  white-space: nowrap;

  &::before {
    content: "•";
    margin-right: 14px;
    color: ${Palette.gray};
  }

  @media (max-width: 520px) {
    padding-left: 41px;

    &::before {
      display: none;
    }
  }
`;

const HeaderMetrics = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 18px;

  @media (max-width: 760px) {
    grid-column: 1 / -1;
    grid-row: 2;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding-left: 41px;
  }

  @media (max-width: 520px) {
    padding-left: 0;
  }
`;

const HeaderMetric = styled.span`
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 76px;
`;

const SummaryLabel = styled.span`
  color: ${Palette.gray};
  font-size: 11px;
  font-weight: 500;
`;

const SummaryValue = styled.strong`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: ${Palette.white};
  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;

  svg {
    width: 15px;
    height: 15px;
    color: ${Palette.lightBlue};
  }
`;

const StatusBadge = styled.span<{ $background: string; $color: string }>`
  display: inline-flex;
  align-items: center;
  width: fit-content;
  padding: 5px 10px;
  border-radius: 999px;
  color: ${({ $color }) => $color};
  background-color: ${({ $background }) => $background};
  font-size: 11px;
  font-weight: 700;
  white-space: nowrap;
`;

const ToggleIcon = styled.span<{ $open: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${Palette.white_50};
  transform: rotate(${({ $open }) => ($open ? "180deg" : "0deg")});
  transition: color 0.15s ease, transform 0.2s ease;

  svg {
    width: 20px;
    height: 20px;
  }
`;

const Content = styled.div`
  border-top: 1px solid ${Palette.details};
  background-color: ${Palette.tool_bars};
`;

const TaskList = styled.div`
  width: 100%;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: minmax(240px, 1.6fr) minmax(120px, 0.6fr) minmax(130px, 0.7fr) minmax(110px, 0.5fr);
  gap: 16px;
  padding: 10px 18px;
  border-bottom: 1px solid ${Palette.details};
  color: ${Palette.gray};
  background-color: ${Palette.items};
  font-size: 11px;
  font-weight: 600;

  @media (max-width: 720px) {
    display: none;
  }
`;

const TaskRow = styled.div`
  display: grid;
  grid-template-columns: minmax(240px, 1.6fr) minmax(120px, 0.6fr) minmax(130px, 0.7fr) minmax(110px, 0.5fr);
  align-items: center;
  gap: 16px;
  min-height: 68px;
  padding: 12px 18px;
  border-bottom: 1px solid ${Palette.items};

  &:last-child {
    border-bottom: 0;
  }

  @media (max-width: 720px) {
    grid-template-columns: 1fr auto;
    align-items: start;
    gap: 12px 16px;
  }

  @media (max-width: 440px) {
    grid-template-columns: 1fr;
  }
`;

const TaskInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
`;

const TaskName = styled.strong`
  overflow: hidden;
  color: ${Palette.white};
  font-size: 13px;
  font-weight: 600;
  line-height: 1.4;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 440px) {
    white-space: normal;
  }
`;

const TaskMeta = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  color: ${Palette.white_50};
  font-size: 12px;
  white-space: nowrap;

  svg {
    flex-shrink: 0;
    width: 15px;
    height: 15px;
    color: ${Palette.lightBlue};
  }
`;

const EmptyState = styled.p`
  padding: 24px 18px;
  color: ${Palette.gray};
  font-size: 13px;
  text-align: center;
`;

export {
  Container,
  Content,
  EmptyState,
  Header,
  HeaderIdentity,
  HeaderMetric,
  HeaderMetrics,
  ProjectName,
  StatusBadge,
  SummaryLabel,
  SummaryValue,
  TableHeader,
  TaskInfo,
  TaskList,
  TaskMeta,
  TaskName,
  TaskRow,
  ToggleIcon,
};
