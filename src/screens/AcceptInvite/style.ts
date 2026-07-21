import styled from "styled-components";
import Palette from "@/assets/palette";

const Container = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100%;
  background-color: ${Palette.content};
`;

const Card = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;
  gap: 20px;

  width: min(440px, calc(100% - 40px));
  margin: 56px 20px;
  padding: 32px;
  border: 1px solid ${Palette.details};
  border-radius: 12px;
  background-color: ${Palette.items};
  text-align: center;
`;

const IconArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 64px;
  height: 64px;
  border-radius: 999px;
  background-color: ${Palette.blue_50};
  color: ${Palette.lightBlue};

  svg {
    width: 30px;
  }
`;

const Description = styled.p`
  margin: 0;
  color: ${Palette.white_50};
  font-size: 14px;
  line-height: 1.5;
`;

export { Card, Container, Description, IconArea };
