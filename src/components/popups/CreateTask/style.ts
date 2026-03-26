import styled from "styled-components";
import Palette from "../../../assets/palette";

const Overlay = styled.div`
  position: absolute;

  display: flex;
  flex: 1 1 auto;
  align-items: center;
  justify-content: center;

  background-color: #00000095;

  height: 100%;
  width: 100%;

  z-index: 9999;
`;

const Card = styled.div`
  position: relative;

  display: grid;
  grid-template-areas:
    "tskr-content-header tskr-content-header"
    "tskr-form           tskr-search-member"
  ;
  grid-template-rows: min-content auto;
  grid-template-columns: 2fr 1fr;
  gap: 16px;
  
  background-color: ${Palette.content};

  width: 60%;
  min-height: min-content; max-height: 90%;

  padding: 0px 20px 20px 20px;
  border-radius: 6px;

  z-index: 99999;

  overflow: hidden;
`;

const Close = styled.button`
  display: flex;
  align-items: center;

  * {
    border: 1px solid;
  }
`;

export {
  Overlay,
  Card,
  Close,
}