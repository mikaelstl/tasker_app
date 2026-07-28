import styled from "styled-components";
import Palette from "../../../assets/palette";

const Card = styled.article`
  display: flex;
  align-items: flex-end;
  gap: 12px;
  width: 100%;
  padding: 2px 0;
  box-shadow: none;
  border: 1px solid ${Palette.details};
  border-radius: 18px;
  background: ${Palette.tool_bars};
  position: relative;
`;

const Texts = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  min-width: 0;
  flex: 1;
`;

const Bubble = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  min-width: 0;
  padding: 14px 16px;
  border-radius: 18px 18px 18px 6px;
  background: ${Palette.items};
  border: 1px solid ${Palette.details};
  position: relative;

  &::before {
    content: "";
    position: absolute;
    left: -7px;
    bottom: 18px;
    width: 12px;
    height: 12px;
    background: ${Palette.items};
    border-left: 1px solid ${Palette.details};
    border-bottom: 1px solid ${Palette.details};
    transform: rotate(45deg);
  }
`;

const BubbleHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  min-width: 0;

  h2, h3, p {
    margin: 0;
  }
`;

const Meta = styled.span`
  display: inline-flex;
  align-items: center;
  margin-top: 4px;
  color: ${Palette.gray};
  font-size: 11px;
  font-weight: 500;
`;

const BubbleContent = styled.div`
  min-width: 0;

  p {
    overflow-wrap: anywhere;
    line-height: 1.55;
  }
`;

const Actions = styled.div`
  display: flex;
  gap: 6px;
  flex-shrink: 0;
`;

const ActionButton = styled.button<{ $danger?: boolean }>`
  display: grid;
  width: 30px;
  height: 30px;
  padding: 6px;
  border: 1px solid ${({ $danger }) => $danger ? Palette.red : Palette.details};
  border-radius: 6px;
  color: ${({ $danger }) => $danger ? Palette.red : Palette.white_50};
  background: ${Palette.items};
  cursor: pointer;

  &:disabled { opacity: .5; cursor: not-allowed; }
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-top: 2px;
  border-top: 1px solid ${Palette.details};
`;

export { Actions, ActionButton, Bubble, BubbleContent, BubbleHeader, Card, Details, Meta, Texts };
