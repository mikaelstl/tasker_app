import styled from "styled-components";
import Palette from "../../assets/palette";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;

  padding: 20px 20px 0px 20px;

  min-width: 320px;
  height: 100%;
  background-color: ${Palette.tool_bars};

  overflow: hidden;
`;

const Month = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Event = styled.div`
  display: flex;
  gap: 12px;
`;

const Day = styled.div`
  text-align: center;
`;

const Name = styled.h5`
  padding: 12px;
  border-left: 2px solid ${Palette.blue};
`;

export {
  Container,
  Month,
  Event,
  Day,
  Name
}