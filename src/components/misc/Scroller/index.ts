import styled from "styled-components";

const Scroller = styled.div`
  display: flex;

  padding: 12px;
  
  &.horizontal {
    width: 100%;
    flex-direction: row;
    overflow-x: scroll;
  }

  &.vertical {
    height: 100%;
    flex-direction: column;
    overflow-y: scroll;
  }
`;

export {
  Scroller
}