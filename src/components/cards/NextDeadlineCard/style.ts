import styled from "styled-components";
import Palette from "../../../assets/palette";

const Container = styled.div`
  width: max-content;
`;

const Header = styled.div`
  display: inline-flex;
  justify-content: space-between;

  border-left: 2px solid ${Palette.red};
  
  padding: 8px 0px 8px 14px;

  width: 100%;
`;

const Infos = styled.div`
  display: inline-flex;
  flex-direction: column;
  gap: 6px;
  
  margin-left: 20px;

  width: fit-content;
`;

const Date = styled.p`
  font-size: 24px;
  display: inline-flex;
`;

export {
  Container,
  Header,
  Infos,
  Date
}