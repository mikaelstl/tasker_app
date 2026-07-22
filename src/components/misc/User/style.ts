import styled from "styled-components";
import Palette from "../../../assets/palette";

const Actor = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
  min-width: 0;
  width: fit-content;
`;

const ActorIdentity = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
  color: ${Palette.white_50};
  font-size: 11px;

  span {
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const ActorName = styled.strong`
  color: ${Palette.white};
  font-size: 13px;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export { Actor, ActorIdentity, ActorName };
