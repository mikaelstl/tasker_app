import styled from "styled-components";
import Palette from "../../../assets/palette";

export const Screen = styled.main`
  width: 100vw;
  height: 100vh;

  background-color: ${Palette.content};

  &::-webkit-scrollbar {
    width: 8px;
  }

  /* fundo da scrollbar */
  &::-webkit-scrollbar-track {
    background: #1e1e1e;
    border-radius: 10px;
  }

  /* parte que desliza */
  &::-webkit-scrollbar-thumb {
    background: #555;
    border-radius: 10px;
  }

  /* hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #888;
  }
`;