import styled from "styled-components";

export const Scroller = styled.div`
  display: flex;
  gap: 12px;
  
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
`