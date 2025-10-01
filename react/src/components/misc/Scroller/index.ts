import styled from "styled-components";

const Scroller = styled.div`
  display: grid;
  gap: 12px;

  padding: 12px;
  
  &.horizontal {
    width: 100%;
    grid-auto-flow: column;
    overflow-x: scroll;
  }

  &.vertical {
    height: 100%;
    grid-auto-flow: row;
    flex-direction: column;
    overflow-y: scroll;
  }
`;

export {
  Scroller
}