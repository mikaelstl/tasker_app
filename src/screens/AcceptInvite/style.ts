import styled from "styled-components";
import Palette from "@/assets/palette";

const PageShell = styled.main`
  min-height: 100%;
  background:
    radial-gradient(circle at top left, rgba(80, 140, 238, 0.18), transparent 34%),
    radial-gradient(circle at top right, rgba(167, 139, 250, 0.14), transparent 30%),
    linear-gradient(180deg, #11101a 0%, ${Palette.content} 100%);
`;

const Container = styled.section`
  width: min(1180px, calc(100% - 32px));
  margin: 0 auto;
  padding: 32px 0 56px;
`;

const Hero = styled.header`
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-bottom: 28px;
`;

const SplitLayout = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(280px, 0.85fr);
  gap: 18px;

  @media (max-width: 920px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.section`
  display: flex;
  flex-direction: column;
  gap: 24px;

  padding: 28px;
  border: 1px solid rgba(80, 140, 238, 0.16);
  border-radius: 24px;
  background: linear-gradient(180deg, rgba(29, 27, 39, 0.98), rgba(15, 14, 20, 0.96));
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.35);
`;

const AsideCard = styled(Card)`
  align-self: start;
  border-color: rgba(244, 114, 182, 0.18);
`;

const CardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
`;

const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const CardFooter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Heading = styled.h1`
  margin: 0;
  font-size: 30px;
  line-height: 1.05;
  letter-spacing: -0.04em;
  color: ${Palette.white};
`;

const Description = styled.p`
  margin: 0;
  color: ${Palette.white_50};
  font-size: 15px;
  line-height: 1.6;
`;

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  width: fit-content;
  padding: 6px 10px;
  border-radius: 999px;
  background: rgba(80, 140, 238, 0.15);
  border: 1px solid rgba(80, 140, 238, 0.25);
  color: ${Palette.lightBlue};
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 10px;
`;

const IconBubble = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: 56px;
  height: 56px;
  flex: 0 0 auto;
  border-radius: 18px;
  background: linear-gradient(180deg, rgba(80, 140, 238, 0.22), rgba(80, 140, 238, 0.08));
  border: 1px solid rgba(80, 140, 238, 0.22);
  color: ${Palette.lightBlue};

  svg {
    width: 28px;
    height: 28px;
  }
`;

const MetaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;

  @media (max-width: 780px) {
    grid-template-columns: 1fr;
  }
`;

const MetaItem = styled.div`
  padding: 14px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
`;

const MetaLabel = styled.span`
  display: block;
  margin-bottom: 8px;
  color: ${Palette.white_50};
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
`;

const MetaValue = styled.span`
  display: block;
  color: ${Palette.white};
  font-size: 14px;
  line-height: 1.45;
  overflow-wrap: anywhere;
`;

const HelperText = styled.p`
  margin: 0;
  color: ${Palette.gray};
  font-size: 13px;
  line-height: 1.5;
`;

const StatusNote = styled.div`
  padding: 16px 18px;
  border-radius: 16px;
  background: rgba(80, 140, 238, 0.08);
  border: 1px solid rgba(80, 140, 238, 0.16);
  color: ${Palette.white};
  font-size: 14px;
  line-height: 1.6;
`;

const CardActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const BaseButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  min-height: 44px;
  padding: 0 16px;
  border-radius: 14px;
  border: 1px solid transparent;

  color: ${Palette.white};
  font-size: 14px;
  font-weight: 700;
  transition: transform 120ms ease, opacity 120ms ease, border-color 120ms ease, background-color 120ms ease;

  &:hover:not(:disabled) {
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
`;

const PrimaryButton = styled(BaseButton)`
  background: linear-gradient(180deg, ${Palette.lightBlue}, ${Palette.blue});
  box-shadow: 0 18px 32px rgba(41, 68, 157, 0.28);
`;

const SecondaryButton = styled(BaseButton)`
  background: rgba(255, 255, 255, 0.03);
  border-color: rgba(255, 255, 255, 0.08);
`;

const LinkButton = styled(SecondaryButton)`
  width: fit-content;
`;

export {
  AsideCard,
  Badge,
  BaseButton,
  Card,
  CardActions,
  CardBody,
  CardFooter,
  CardHeader,
  Container,
  Description,
  Heading,
  HelperText,
  Hero,
  IconBubble,
  LinkButton,
  MetaGrid,
  MetaItem,
  MetaLabel,
  MetaValue,
  PageShell,
  PrimaryButton,
  SecondaryButton,
  SplitLayout,
  StatusNote,
};
