import styled from "styled-components";

interface HealthTileProps {
  background?: string;
}

const HealthTile = styled.div<HealthTileProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 10px;

  width: 100%;

  background-color: ${props => props.background ?? 'none'};
`;

export {
  HealthTile
}