import styled from "styled-components";

const Scroller = styled.div`
  display: flex;
  
  &.horizontal {
    width: 100%;
    flex-direction: row;
    overflow-x: auto;
    overflow-x: overlay;
  }

  &.vertical {
    height: 100%;
    flex-direction: column;
    overflow-y: auto;
    overflow-y: overlay;
  }
`;

export {
  Scroller
}
