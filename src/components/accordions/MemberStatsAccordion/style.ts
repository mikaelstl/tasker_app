import styled from "styled-components";
import Palette from "../../../assets/palette";
import { Badge } from "../../badge/Badge";
import { Subtitle } from "../../base/Subtitle";
import { Title } from "../../base/Title";
import { User } from "../../misc/User";

const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: fit-content;
  border-radius: 8px;
  overflow: hidden;

  background-color: ${Palette.content};
  cursor: pointer;

  transition: background-color 0.15s ease;

  &:hover {
    background-color: ${Palette.items};
  }
`;

const Header = styled.div`
  display: grid;
  grid-template-columns: minmax(160px, 1fr) auto min-content;
  align-items: center;
  gap: 16px;

  width: 100%;
  padding: 12px;

  @media (max-width: 720px) {
    grid-template-columns: 1fr min-content;
  }
`;

const ProjectTitle = styled.p`
  max-width: 100%;
  margin: 12px 12px 0;
  overflow: hidden;

  color: ${Palette.gray};
  font-size: 14px;
  font-weight: 500;
  line-height: 1.25;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const MemberTitle = styled(Title)`
  font-size: 18px;
`;

const MemberSubtitle = styled(Subtitle)`
  font-size: 14px;
`;

const MemberBadge = styled(Badge)`
  font-size: 14px;
`;

const MemberUser = styled(User)`
  & > div:last-child {
    font-size: 13px;
  }

  & > div:last-child strong {
    font-size: 15px;
  }
`;

const Indicator = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  min-width: 64px;

  ${MemberSubtitle} {
    color: ${Palette.gray};
    white-space: nowrap;
  }
`;

const Indicators = styled.div`
  display: grid;
  grid-template-columns: .25fr .25fr .25fr .25fr;
  gap: 10px;

  @media (max-width: 720px) {
    grid-column: 1 / -1;
    grid-row: 2;
  }

  @media (max-width: 440px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Leading = styled.div`
  display: flex;
  width: 100%;
  min-width: 0;
`;

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: 32px;
  height: 32px;
  padding: 0;
  border-radius: 6px;

  color: ${Palette.white_50};
  background-color: ${Palette.transparent};
  cursor: pointer;

  transition: border-color 0.15s ease, color 0.15s ease, background-color 0.15s ease;

  &:hover {
    color: ${Palette.lightBlue};
    background-color: ${Palette.lightBlue_50};
  }

  &:focus-visible {
    outline: 2px solid ${Palette.lightBlue};
    outline-offset: 2px;
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  height: fit-content;
  padding: 8px 12px 12px;
  border-top: 1px solid ${Palette.details};
`;

const StatDetail = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;

  width: 100%;
`;

const Task = styled.div`
  display: flex;
  flex-direction: column;

  padding: 10px 20px;
`;

export {
  Container,
  Indicator,
  Leading,
  Header,
  ProjectTitle,
  MemberTitle,
  MemberSubtitle,
  MemberBadge,
  MemberUser,
  Indicators,
  Button,
  Content,
  StatDetail,
  Task
}
