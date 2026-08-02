import styled from "styled-components";
import Palette from "../../../assets/palette";

const Actor = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
  min-width: 0;
  width: fit-content;
`;

const ActorAvatar = styled.div<{ $size: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 ${({ $size }) => $size}px;
  width: ${({ $size }) => $size}px;
  min-width: ${({ $size }) => $size}px;
  max-width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  min-height: ${({ $size }) => $size}px;
  max-height: ${({ $size }) => $size}px;

  > .tskr-avatar {
    box-sizing: border-box;
    flex: none;
    width: 100%;
    height: 100%;
  }

  > svg {
    flex: none;
    width: 75%;
    height: 75%;
  }
`;

const ActorIdentity = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
  color: ${Palette.white};
  font-size: 12px;

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

export { Actor, ActorAvatar, ActorIdentity, ActorName };
