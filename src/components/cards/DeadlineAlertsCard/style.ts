import styled from "styled-components";
import Palette from "../../../assets/palette";
import { Badge } from "../../badge/Badge";

const Container = styled.div`
  width: 100%;
`;

const Header = styled.div`
  display: inline-flex;
  gap: 8px;
  border-left: 2px solid ${Palette.red};
  padding: 8px 0 8px 14px;
`;

const Card = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;

  width: 100%;
  padding: 16px;
  color: inherit;
  font: inherit;
  text-align: left;
  background-color: ${Palette.content};
  border-radius: 12px;
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid ${Palette.lightBlue};
    outline-offset: 2px;
  }

  .tskr-title {
    font-size: 15px;
    font-weight: 500;
  }

  .tskr-deadline-date {
    margin-top: 4px;
    color: ${Palette.white_50};
    font-size: 14px;
  }
`;

const CardContent = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  min-width: 0;
`;

const Clock = styled.div`
  display: flex;
  flex: 0 0 36px;
  align-items: center;
  justify-content: center;

  width: 36px;
  height: 36px;
  margin-top: 2px;

  color: ${Palette.white_50};
  background-color: ${Palette.gray_25};
  border-radius: 50%;
`;

const ProjectInfo = styled.div`
  min-width: 0;
`;

interface StatusBadgeProps {
  $color: string;
}

const StatusBadge = styled(Badge)<StatusBadgeProps>`
  flex-shrink: 0;
  color: ${({ $color }) => $color};
`;

const Cards = styled.div`
  display: grid;
  grid-auto-flow: row;
  gap: 8px;
  margin-left: 28px;
`;

export {
  Container,
  Header,
  Card,
  CardContent,
  Cards,
  Clock,
  ProjectInfo,
  StatusBadge,
};
