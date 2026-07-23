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
  gap: 28px;
  width: min(100%, 920px);
  margin: 0 auto;
  padding: 28px 24px 48px;
  overflow-y: auto;
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Identity = styled.section`
  display: grid;
  grid-template-columns: minmax(120px, 180px) 1fr;
  gap: 12px 20px;
  padding: 20px;
  border: 1px solid ${Palette.details};
  border-radius: 12px;
  background: ${Palette.items};

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
    gap: 5px;

    p:nth-of-type(even) {
      margin-bottom: 10px;
    }
  }
`;

const Value = styled.p`
  color: ${Palette.white};
  overflow-wrap: anywhere;
`;

const OrganizationList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 12px;
`;

const OrganizationRow = styled.article`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  padding: 18px;
  border: 1px solid ${Palette.details};
  border-radius: 12px;
  background: ${Palette.items};

  > div:first-child {
    display: flex;
    min-width: 0;
    flex-direction: column;
    gap: 8px;
  }

  h2 {
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const OrganizationMeta = styled.p`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  color: ${Palette.gray};
  font-size: 14px;
`;

const EmptyState = styled.div`
  padding: 20px;
  border: 1px dashed ${Palette.details};
  border-radius: 12px;
  color: ${Palette.gray};
`;

const DangerCard = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 20px;
  border: 1px solid ${Palette.red};
  border-radius: 12px;
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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 22px;
  border: 1px solid ${Palette.details};
  border-radius: 12px;
  background: ${Palette.items};
`;

const Field = styled.label`
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: ${Palette.gray};
  font-size: 14px;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 11px 12px;
  border: 1px solid ${Palette.details};
  border-radius: 7px;
  background: ${Palette.content};
  color: ${Palette.white};
  font: inherit;

  &:focus {
    border-color: ${Palette.lightBlue};
    outline: 2px solid ${Palette.lightBlue_50};
    outline-offset: 1px;
  }
`;

const Hint = styled.p`
  color: ${Palette.gray};
  font-size: 13px;
  line-height: 1.45;
`;

export {
  Container,
  Content,
  DangerCard,
  EmptyState,
  Field,
  Form,
  Hint,
  Identity,
  Input,
  OrganizationList,
  OrganizationMeta,
  OrganizationRow,
  Section,
  Value,
};
