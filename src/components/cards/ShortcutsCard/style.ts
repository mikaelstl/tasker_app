import styled from "styled-components";
import Palette from "../../../assets/palette";

const Container = styled.div`
  width: 220px;
  width: max-content;
`;

const Header = styled.div`
  display: inline-flex;
  gap: 8px;
  padding: 8px 0px 8px 14px;
`;

const Action = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  
  padding: 6px 12px;
  border-radius: 4px;

  width: 100%;

  border: 1px solid ${Palette.details};
`;

const Actions = styled.div`
  display: grid;
  gap: 8px;
`

export {
  Container,
  Header,
  Action,
  Actions
}