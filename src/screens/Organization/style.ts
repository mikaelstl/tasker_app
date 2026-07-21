import styled from "styled-components";
import Palette from "@/assets/palette";

const Container = styled.section`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;
`;

const Content = styled.div`
  display: flex;
  align-items: flex-start;

  padding: 20px;
`;

const EmptyMessage = styled.p`
  color: ${Palette.gray};
  font-size: 14px;
`;

export {
  Container,
  Content,
  EmptyMessage,
};
