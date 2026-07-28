import styled from "styled-components";
import Palette from "../../assets/palette";
import { Scroller } from "../misc/Scroller";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;

  padding: 20px 16px 0 20px;

  width: 40%;
  min-width: 360px;
  height: 100%;
  background-color: ${Palette.tool_bars};

  overflow: hidden;
`;

const Timeline = styled(Scroller)`
  gap: 18px;
  padding-right: 4px;
`;

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 4px 0 20px;
`;

const Status = styled.p`
  margin: 0;
  color: ${Palette.red};
  font-size: 13px;
  text-align: center;
`;

export {
  Actions,
  Container,
  Status,
  Timeline,
}
