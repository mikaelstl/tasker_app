import styled from "styled-components";

const Content = styled.div`
  grid-area: content;

  display: flex;
  align-items: center;
  justify-content: space-around;
  
  width: 100%;
  height: 100%;
`;

const Page = styled.main`
  display: grid;
  grid-template:
    "appbar appbar" min-content
    "navbar content" / auto 1fr auto;

  height: 100%;
  width: 100%;
`;

export {
  Content,
  Page
}