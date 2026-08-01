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
  width: fit-content;
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
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 24px;
  border-radius: 12px;
  background: ${Palette.items};

  @media (max-width: 560px) {
    align-items: flex-start;
    gap: 16px;
    padding: 20px;
  }
`;

const IdentityAvatar = styled.div`
  display: grid;
  place-items: center;
  flex: 0 0 auto;
  width: 88px;
  height: 88px;
  border-radius: 18px;
  background:
    linear-gradient(145deg, ${Palette.content}, ${Palette.items});
  color: ${Palette.white};
  font-size: 2rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`;

const IdentityInfo = styled.div`
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: 4px;
`;

const IdentityHandle = styled.p`
  color: ${Palette.lightBlue};
  font-size: 13px;
  font-weight: 500;
  line-height: 1.2;
`;

const IdentityName = styled.h2`
  margin: 0;
  color: ${Palette.white};
  font-size: 22px;
  font-weight: 600;
  line-height: 1.15;
  overflow-wrap: anywhere;
`;

const IdentityEmail = styled.p`
  font-size: 14px;
  font-weight: 400;
  line-height: 1.3;
  opacity: 0.82;
  overflow-wrap: anywhere;
`;

const OrganizationList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
`;

const EmptyState = styled.div`
  padding: 20px;
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
  border-radius: 7px;
  background: ${Palette.content};
  color: ${Palette.white};
  font: inherit;

  &:focus {
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
  IdentityAvatar,
  IdentityEmail,
  IdentityHandle,
  IdentityInfo,
  IdentityName,
  Identity,
  Input,
  OrganizationList,
  Section,
};
