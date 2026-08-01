import styled from "styled-components";
import Palette from "@/assets/palette";

const PageShell = styled.main`
  min-height: 100%;
  overflow-y: auto;
  background: ${Palette.tool_bars};
`;

const Container = styled.section`
  width: min(458px, calc(100% - 40px));
  min-height: 100vh;
  margin: 0 auto;
  padding: clamp(54px, 13vh, 118px) 0 48px;

  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 20px;
`;

const Hero = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  margin-bottom: 16px;
  text-align: center;

  img {
    height: auto;
  }
`;

const Heading = styled.h1`
  margin: 0;
  font-size: 24px;
  line-height: 1.25;
  font-weight: 700;
  color: ${Palette.white};

  @media (max-width: 420px) {
    font-size: 21px;
  }
`;

const Description = styled.p`
  margin: 0;
  color: ${Palette.white_50};
  font-size: 15px;
  line-height: 1.5;
`;

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  align-self: flex-start;
  margin-left: auto;
  padding: 3px 7px;
  border-radius: 4px;
  background: ${Palette.blue_50};
  color: ${Palette.white};
  font-size: 12px;
  font-weight: 600;
`;

const IconBubble = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: 66px;
  height: 66px;
  flex: 0 0 auto;
  border-radius: 8px;
  background: ${Palette.blue};
  color: ${Palette.white};
  font-size: 34px;
  font-weight: 600;

  svg {
    width: 30px;
    height: 30px;
  }
`;

const InviteCard = styled.section`
  min-height: 98px;
  padding: 16px;
  border-radius: 12px;
  background: ${Palette.items};

  display: flex;
  align-items: center;
  gap: 18px;

  @media (max-width: 420px) {
    gap: 12px;
    padding: 13px;

    ${IconBubble} {
      width: 58px;
      height: 58px;
      font-size: 30px;
    }
  }
`;

const InviteContent = styled.div`
  min-width: 0;
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 7px;
`;

const OrganizationName = styled.h2`
  overflow: hidden;
  margin: 0;
  color: ${Palette.white};
  font-size: 20px;
  font-weight: 500;
  line-height: 1.3;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const MetaItem = styled.div`
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 7px;

  > svg {
    width: 14px;
    height: 14px;
    flex: 0 0 auto;
    color: ${Palette.gray};
  }
`;

const MetaLabel = styled.span`
  display: block;
  color: ${Palette.gray};
  font-size: 12px;
  line-height: 1.3;
`;

const MetaValue = styled.span`
  display: block;
  overflow: hidden;
  color: ${Palette.white_50};
  font-size: 13px;
  line-height: 1.4;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const HelperText = styled.p`
  margin: 0;
  color: ${Palette.white_50};
  font-size: 13px;
  line-height: 1.45;
  text-align: center;
`;

const StatusNote = styled.div`
  min-height: 80px;
  padding: 16px;
  border-radius: 12px;
  background: ${Palette.items};
  color: ${Palette.white};

  display: flex;
  align-items: center;
  gap: 14px;

  > svg {
    width: 26px;
    height: 26px;
    flex: 0 0 auto;
    color: ${Palette.lightBlue};
  }

  > span {
    min-width: 0;
  }

  strong {
    display: block;
    margin-bottom: 3px;
    font-size: 15px;
    font-weight: 600;
  }

  ${HelperText} {
    text-align: left;
  }

  .spin {
    animation: spin 900ms linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const CardActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 4px;
`;

const BaseButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  width: 100%;
  min-height: 45px;
  padding: 0 16px;
  border-radius: 999px;

  color: ${Palette.white};
  font-size: 15px;
  font-weight: 600;
  transition: filter 120ms ease, opacity 120ms ease, background-color 120ms ease;

  &:hover:not(:disabled) {
    filter: brightness(1.12);
  }

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 2px solid ${Palette.lightBlue};
    outline-offset: 3px;
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

const PrimaryButton = styled(BaseButton)`
  background: ${Palette.blue};
`;

const SecondaryButton = styled(BaseButton)`
  background: ${Palette.items};
`;

export {
  Badge,
  BaseButton,
  CardActions,
  Container,
  Description,
  Heading,
  HelperText,
  Hero,
  IconBubble,
  InviteCard,
  InviteContent,
  MetaItem,
  MetaLabel,
  MetaValue,
  OrganizationName,
  PageShell,
  PrimaryButton,
  SecondaryButton,
  StatusNote,
};
