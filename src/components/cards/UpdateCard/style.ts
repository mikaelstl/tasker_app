import styled from "styled-components";
import Palette from "../../../assets/palette";

const Card = styled.div`
  display: grid;
  grid-template-columns: 12px minmax(0, 1fr);
  column-gap: 10px;

  width: 100%;
  min-height: 128px;

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
    left: 5px;
    width: 1px;
    background-color: ${Palette.details};
  }

  &::before {
    display: ${({ $hasPrevious }) => $hasPrevious ? "block" : "none"};
    top: 0;
    height: 11px;
  }

  &::after {
    display: ${({ $hasNext }) => $hasNext ? "block" : "none"};
    top: 23px;
    bottom: -18px;
  }
`;

const TrackerDot = styled.span`
  position: absolute;
  z-index: 1;
  top: 11px;
  left: 1px;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background-color: ${Palette.lightBlue};
  box-shadow: 0 0 0 3px ${Palette.tool_bars};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  min-width: 0;
  padding: 14px 16px 16px;

  border: 1px solid ${Palette.details};
  border-radius: 14px;
  background-color: ${Palette.items};
  box-shadow: none;
`;

const Header = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
`;

const UpdateDate = styled.span`
  min-width: 0;
  color: ${Palette.white_50};
  font-size: 12px;
  font-weight: 500;
  line-height: 1.35;
`;

const Description = styled.h3`
  margin: 0;
  color: ${Palette.white};
  font-size: 15px;
  font-weight: 600;
  line-height: 1.4;
  overflow-wrap: anywhere;
`;

const ResourceBadge = styled.span`
  flex: 0 0 auto;
  max-width: 45%;
  padding: 4px 10px;
  border-radius: 999px;
  background: ${Palette.lightBlue_50};
  color: ${Palette.white};
  font-size: 11px;
  font-weight: 600;
  line-height: 1.2;
  text-transform: capitalize;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ActorDetails = styled.div`
  min-width: 0;
  padding-top: 2px;

  .tskr-user {
    max-width: 100%;
  }
`;

const Details = styled.dl`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px 16px;
  margin: 0;
  padding-top: 10px;
  border-top: 1px solid ${Palette.details};

  @media (max-width: 560px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

const Detail = styled.div`
  display: grid;
  grid-template-columns: 16px minmax(0, 1fr);
  gap: 2px 7px;
  align-items: start;
  color: ${Palette.white_50};
  font-size: 12px;
  line-height: 1.4;
  overflow-wrap: anywhere;
`;

const DetailIcon = styled.span`
  grid-row: 1 / span 2;
  color: ${Palette.white_50};

  svg {
    display: block;
    width: 15px;
    height: 15px;
    margin-top: 1px;
    stroke-width: 1.8;
  }
`;

const DetailField = styled.dt`
  color: ${Palette.white};
  font-weight: 600;
`;

const DetailValue = styled.dd`
  margin: 0;
  min-width: 0;
  color: ${Palette.white_50};

  span {
    color: ${Palette.lightBlue};
  }
`;

export {
  ActorDetails,
  Card,
  Content,
  Description,
  Detail,
  DetailField,
  DetailIcon,
  DetailValue,
  Details,
  Header,
  ResourceBadge,
  TrackerDot,
  TimelineMarker,
  UpdateDate,
}
