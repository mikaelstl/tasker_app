import styled from "styled-components";

interface ScrollerProps {
  orientation: "horizontal" | "vertical";
  gap?: string | number;
}

const Scroller = styled.div.withConfig({
  shouldForwardProp: prop => !["gap", "orientation"].includes(prop),
})<ScrollerProps>`
  display: flex;
  flex-direction: ${({ orientation }) => orientation === "horizontal" ? "row" : "column"};
  gap: ${props => typeof props.gap === "number" ? `${props.gap}px` : props.gap ?? 0};

  width: ${({ orientation }) => orientation === "horizontal" ? "100%" : "auto"};
  height: ${({ orientation }) => orientation === "vertical" ? "100%" : "auto"};
  min-width: 0;
  min-height: 0;
  max-width: 100%;
  max-height: 100%;

  overflow-x: ${({ orientation }) => orientation === "horizontal" ? "auto" : "hidden"};
  overflow-y: ${({ orientation }) => orientation === "vertical" ? "auto" : "hidden"};
  overscroll-behavior: contain;

  > * {
    flex: 0 0 auto;
  }
`;

export {
  Scroller
}

export type {
  ScrollerProps
}
