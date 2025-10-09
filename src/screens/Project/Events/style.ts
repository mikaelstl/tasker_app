import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  height: 100%;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 20px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  overflow: hidden;

  margin: 20px 20px 0px 20px;
`;

const CalendarArea = styled.div`
  height: 100%;
  overflow: hidden;
`;

export {
  Container,
  Content,
  Header,
  CalendarArea
}