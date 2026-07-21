import styled from "styled-components";
import Palette from "../../../assets/palette";

export interface TeamContainerProps {
  $outlineColor?: string;
}

export const Container = styled.div<TeamContainerProps>`
  grid-area: tskr-team;

  display: inline-flex;
  align-items: center;
  isolation: isolate;

  width: fit-content;

  --team-avatar-outline: ${({ $outlineColor }) => $outlineColor ?? Palette.content};

  > * + * {
    margin-left: -8px;
  }
`;

const AvatarBase = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 32px;

  width: 32px;
  height: 32px;

  color: ${Palette.white};
  outline: 2px solid var(--team-avatar-outline);
  border-radius: 50%;

  font-size: 12px;
  font-weight: 700;
  line-height: 1;
  letter-spacing: 0.01em;

  transition: transform 0.15s ease;

  &:hover {
    z-index: 1;
    transform: translateY(-2px);
  }
`;

export const MemberAvatar = styled(AvatarBase)<{ $background: string }>`
  background-color: ${({ $background }) => $background};
`;

export const RemainingMembers = styled(AvatarBase)`
  color: ${Palette.white_50};
  background-color: ${Palette.details};
`;
