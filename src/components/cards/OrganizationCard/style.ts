import styled from "styled-components";
import Palette from "../../../assets/palette";

const Container = styled.button`
  display: grid;
  grid-template-areas:
    "avatar title tskr-badge"
    "avatar meta .";
  column-gap: 16px;
  row-gap: 8px;
  align-items: center;

  padding: 16px;

  width: fit-content;
  min-height: 98px;
  box-sizing: border-box;

  border-radius: 12px;

  background-color: ${Palette.items};
  color: inherit;
  font: inherit;
  text-align: left;
  cursor: pointer;

  transition:
    border 160ms ease,
    background-color 160ms ease;

  &:hover {
    border: 1px solid ${Palette.lightBlue_50};
    background-color: #201d2b;
  }
`;

const Avatar = styled.div`
  grid-area: avatar;
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: stretch;

  width: 64px;
  min-height: 64px;
  border-radius: 10px;

  background-color: ${Palette.blue};
  color: ${Palette.white};
  font-size: 22px;
  font-weight: 700;
  letter-spacing: 0.04em;
`;

const Title = styled.h3`
  grid-area: title;
  margin: 0;
  min-width: 0;

  color: ${Palette.white};
  font-size: 18px;
  font-weight: 600;
  line-height: 1.2;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Meta = styled.div`
  grid-area: meta;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  min-width: 0;

  color: ${Palette.gray};
  font-size: 14px;
  font-weight: 500;
`;

const MetaItem = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;

  color: ${Palette.gray};
  white-space: nowrap;

  svg {
    flex: 0 0 auto;
    color: ${Palette.gray};
  }
`;

const MetaDivider = styled.span`
  width: 4px;
  height: 4px;
  border-radius: 999px;
  background-color: ${Palette.gray};
`;

export {
  Container,
  Avatar,
  Title,
  Meta,
  MetaItem,
  MetaDivider,
};
