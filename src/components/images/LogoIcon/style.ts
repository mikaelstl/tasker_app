import styled from "styled-components";

const Container = styled.div`
  width: fit-content;

  display: grid;
  grid-auto-flow: row;
  gap: 25px;
`;

const Image = styled.img`
  width: 32px; height: 32px;
`;

export {
  Container,
  Image,
}