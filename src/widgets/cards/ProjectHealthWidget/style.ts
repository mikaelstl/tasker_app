import styled from "styled-components";

interface HealthTileProps {
  $backgroundColor?: string;
  $borderColor?: string;
}

const HealthTile = styled.div<HealthTileProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 10px;

  width: 100%;

  background-color: ${props => props.$backgroundColor ?? 'none'};
  border: 1px solid ${props => props.$borderColor ?? 'transparent'};
`;

export {
  HealthTile
}
