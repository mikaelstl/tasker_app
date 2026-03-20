import styled from "styled-components";

const Accordion = styled.div`
  display: grid;
  gap: 12px;
  width: 100%;
  height: min-content;
  overflow: hidden;
`;

const Header = styled.div`
  display: flex;
  gap: 16px;
  height: fit-content;

  cursor: pointer;
`;

const Tasks = styled.div`
  width: 100%;
  height: fit-content;
  overflow: hidden;
`;

export {
  Accordion,
  Header,
  Tasks
}