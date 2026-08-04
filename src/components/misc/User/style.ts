import styled from "styled-components";
import Palette from "../../../assets/palette";

const Actor = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
  
  min-width: 40px;
  width: fit-content;
`;

const ActorAvatar = styled.div<{ $size: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ActorIdentity = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
  color: ${Palette.white};
  font-size: 12px;
`;

const ActorName = styled.strong`
  color: ${Palette.white};
  font-size: 13px;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export { Actor, ActorAvatar, ActorIdentity, ActorName };
