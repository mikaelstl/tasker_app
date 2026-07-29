import Palette from "@/assets/palette";
import styled from "styled-components";

const Card = styled.div<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;

  padding: 14px 16px;
  border: 1px solid ${Palette.details};
  border-radius: 12px;
  background-color: ${({ $active }) => $active ? Palette.tool_bars : Palette.items};
`

const Infos = styled.div`
  min-width: 0;
  flex: 1 1 auto;
`

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
`

const ActionButton = styled.button<{ $danger?: boolean; $loading?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: 34px;
  height: 34px;
  padding: 0;
  border: 1px solid ${Palette.details};
  border-radius: 10px;

  background-color: ${Palette.transparent};
  color: ${({ $danger }) => $danger ? Palette.red : Palette.white_50};
  cursor: pointer;

  &:hover:not(:disabled) {
    border-color: ${({ $danger }) => $danger ? Palette.red : Palette.lightBlue};
    color: ${({ $danger }) => $danger ? Palette.red : Palette.lightBlue};
  }

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  svg {
    width: 18px;
    height: 18px;
    opacity: ${({ $loading }) => $loading ? 0.65 : 1};
  }
`

export {
  Card,
  Infos,
  Actions,
  ActionButton
}