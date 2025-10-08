import styled from "styled-components";
import Palette from "../../../../assets/palette";

const Tag = styled.div`
  display: flex;
  gap: 8px;

  padding: 8px 12px;
  
  margin: 0px 6px;

  border-radius: 4px;

  &.task {
    background-color: ${Palette.blue};
  }

  &.event {
    background-color: ${Palette.light_blue};
  }
`;

export {
  Tag
}