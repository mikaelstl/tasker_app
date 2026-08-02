import styled from "styled-components";
import Palette from "../../../assets/palette";

const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  width: 100%;
  
  padding: 8px 12px;
  
  border-radius: 18px;
  
  background-color: ${Palette.items};
`;

const Header = styled.div`
  display: flex;
  gap: 12px;

  color: ${Palette.gray};
  
  font-size: 14px;
`;

const Content = styled.div`
  padding: 10px;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
`;

export {
  Card,
  Header,
  Content,
  Footer
};
