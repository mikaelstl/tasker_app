import styled from "styled-components";

interface MarginProps {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
}

export const Margin = styled.div<MarginProps>`
  margin-top: ${props => props.top ?? 0};
  margin-bottom: ${props => props.bottom ?? 0};
  margin-left: ${props => props.left ?? 0};
  margin-right: ${props => props.right ?? 0};
`