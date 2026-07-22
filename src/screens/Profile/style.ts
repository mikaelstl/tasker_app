import styled from "styled-components";
import Palette from "@/assets/palette";

const Container = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
  overflow-y: auto;
`;

const Identity = styled.section`
  display: grid;
  grid-template-columns: minmax(120px, 180px) 1fr;
  gap: 10px 20px;
  padding: 20px;
  border: 1px solid ${Palette.details};
  border-radius: 10px;
  background: ${Palette.items};

  h2 { grid-column: 1 / -1; margin-bottom: 6px; }
`;

const Value = styled.p`
  color: ${Palette.white};
  overflow-wrap: anywhere;
`;

const DangerCard = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 20px;
  border: 1px solid ${Palette.red};
  border-radius: 10px;
  background: ${Palette.red_25};

  > div:first-child {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  @media (max-width: 680px) {
    align-items: flex-start;
    flex-direction: column;
  }
`;

export { Container, Content, DangerCard, Identity, Value };
