import Palette from "@/assets/palette";
import { Button } from "@/components/buttons/Button";
import styled from "styled-components";

const Content = styled.div`
  display: flex;
  flex-direction: row;
  
  height: 100%;
  width: 100%;

  overflow: hidden;
`;

const Categories = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;

  gap: 20px;

  overflow-x: hidden;
  overflow-y: auto;
  overflow-y: overlay;
`;

const Greating = styled.div`
  padding-top: 30px;
  padding-left: 20px;
`;

const Items = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  width: 100%;

  padding: 20px 20px;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  gap: 20px;

  width: 100%;

  overflow-y: auto;
`;

const Infos= styled.div`
  display: inline-flex;
  gap: 40px;

  width: 100%;

  padding: 0px 20px;
`;

const SeeMoreBtn = styled(Button)`
  display: flex;
  justify-content: center;

  width: 100%;
  background-color: ${Palette.gray_25};
`;

export {
  Content,
  Categories,
  Greating,
  Items,
  Main,
  Infos,
  SeeMoreBtn
}
