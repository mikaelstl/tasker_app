import styled from "styled-components";

const Container = styled.div`
  width: fit-content;

  display: grid;
  grid-auto-flow: row;
  gap: 25px;
`;

const Image = styled.img`
  width: 330px; height: 75px;
`;

const Label = styled.span`
  text-align: center;
  letter-spacing: 12px;
`;

export {
  Container,
  Image,
  Label
}