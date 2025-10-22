import styled from "styled-components";

const Scroller = styled.div`
  display: grid;

  padding: 12px;
  
  &.horizontal {
    width: 100%;
    grid-auto-flow: column;
    overflow-x: scroll;
  }

  &.vertical {
    height: 100%;
    grid-auto-flow: row;
    overflow-y: scroll;
  }
`;

export {
  Scroller
}