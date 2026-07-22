import styled from "styled-components";
import Palette from "../../../assets/palette";
import { Subtitle } from "../../base/Subtitle";
import { Text } from "../../base/Text";

const Card = styled.div`
  display: grid;
  grid-template-columns: 10px minmax(0, 1fr);
  column-gap: 12px;

  width: 100%;
  min-height: 96px;
  padding-bottom: 16px;

  position: relative;
`;

const TimelineMarker = styled.div<{
  $hasPrevious: boolean;
  $hasNext: boolean;
}>`
  position: relative;
  align-self: stretch;

  &::before,
  &::after {
    content: "";
    position: absolute;
    left: 4px;
    width: 2px;
    background-color: ${Palette.details};
  }

  &::before {
    display: ${({ $hasPrevious }) => $hasPrevious ? "block" : "none"};
    top: 0;
    bottom: calc(50% + 5px);
  }

  &::after {
    display: ${({ $hasNext }) => $hasNext ? "block" : "none"};
    top: calc(50% + 5px);
    bottom: -16px;
  }
`;

const TrackerDot = styled.span`
  position: absolute;
  z-index: 1;
  top: 50%;
  left: 0;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${Palette.details};
  transform: translateY(-50%);
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  min-width: 0;
  padding: 12px 14px;

  border: 1px solid ${Palette.details};
  border-radius: 10px;
  background-color: ${Palette.content};
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

const UpdateDate = styled(Subtitle)`
  flex-shrink: 0;
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
`;

const Description = styled(Text)`
  font-size: 14px;
  color: ${Palette.white_50};
  line-height: 1.45;
  overflow-wrap: anywhere;
`;

const ResourceBadge = styled.span`
  align-self: flex-start;
  padding: 3px 8px;
  border-radius: 999px;
  background: ${Palette.purple_25};
  color: ${Palette.purple};
  font-size: 11px;
  text-transform: capitalize;
`;

const Details = styled.dl`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin: 0;
  padding-top: 8px;
  border-top: 1px solid ${Palette.details};
`;

const Detail = styled.div`
  display: grid;
  grid-template-columns: minmax(72px, auto) minmax(0, 1fr);
  gap: 8px;
  color: ${Palette.white_50};
  font-size: 11px;
  overflow-wrap: anywhere;
`;

const DetailField = styled.dt`
  color: ${Palette.white};
  font-weight: 600;
`;

export {
  Card,
  Content,
  Description,
  Detail,
  DetailField,
  Details,
  Header,
  ResourceBadge,
  TrackerDot,
  TimelineMarker,
  UpdateDate,
}
