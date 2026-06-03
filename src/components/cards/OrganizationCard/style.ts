import styled from "styled-components";
import Palette from "../../../assets/palette";

const Container = styled.div`
  display: flex;

  padding: 16px;

  width: 550px;

  border: 1px solid ${Palette.details};
  border-radius: 8px;

  background-color: ${Palette.items};
`;

const Avatar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 52px;
  height: 52px;

  background-color: ${Palette.blue};

  border-radius: 6px;
`;

export {
  Container,
  Avatar
}