import styled from "styled-components";
import Palette from "../../../assets/palette";

const Container = styled.div`
  background-color: ${Palette.gray};
  
  &.small {
    border-radius: 99999px;
    height: 32px; width: 32px;
  }
  
  &.medium {
    border-radius: 99999px;
    height: 52px; width: 52px;
  }
  
  &.large {
    border-radius: 99999px;
    height: 124px; width: 124px;
  }
`;

const Indicator = styled.div<{ online: boolean }>`
  padding: 2px;
  outline: ${props => props.online ? `2px solid ${Palette.blue}` : `none` };
  border-radius: 9999px;
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