import styled from "styled-components";
import Palette from "../../../assets/palette";

const Container = styled.div`
  grid-area: tskr-avatar;

  background-color: ${Palette.details};
  padding: 4px;
  
  &.small {
    border-radius: 99999px;
    height: 32px; width: 32px;
  }
  
  &.medium {
    border-radius: 99999px;
    height: 42px; width: 42px;
    padding: 6px;
  }
  
  &.large {
    border-radius: 99999px;
    height: 52px; width: 52px;
  }
`;

const Indicator = styled.div<{ online: boolean }>`
  padding: 2px;
  outline: ${props => props.online ? `2px solid ${Palette.blue}` : `none` };
  border-radius: 9999px;

  width: fit-content;
  height: fit-content;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
`

export {
  Container,
  Image,
  Indicator
}