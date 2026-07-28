import styled from "styled-components";

interface ScrollerProps {
  gap?: string | number;
}

const Scroller = styled.div.withConfig({
  shouldForwardProp: prop => prop !== "gap",
})<ScrollerProps>`
  display: flex;
  gap: ${props => typeof props.gap === "number" ? `${props.gap}px` : props.gap ?? 0};
  
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
