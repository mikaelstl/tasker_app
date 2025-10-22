import styled from "styled-components";
import Palette from "../../assets/palette";

const Container = styled.div`
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
`;

const Button = styled.button`
  display: flex;
  gap: 8px;
  align-items: center;
  
  padding: 10px;
  font-weight: 600;

  border-right: 2px solid ${Palette.gray};
`;

export {
  Button,
  Container
}