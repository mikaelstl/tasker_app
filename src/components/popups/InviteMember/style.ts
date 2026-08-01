import styled from "styled-components";
import Palette from "@/assets/palette";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;

  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;

  background-color: rgba(0, 0, 0, 0.65);
`;

const Dialog = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  width: min(560px, 100%);
  padding: 24px;
  border-radius: 12px;

  background-color: ${Palette.content};
  box-shadow: 0 24px 70px rgba(0, 0, 0, 0.4);
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`;

const Title = styled.h2`
  margin: 0;
  color: ${Palette.white};
  font-size: 20px;
  font-weight: 600;
`;

const CloseButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: 32px;
  height: 32px;
  padding: 6px;
  border: 0;
  border-radius: 6px;

  background-color: ${Palette.transparent};
  color: ${Palette.white_50};
  cursor: pointer;

  svg {
    width: 18px;
  }
`;

const Message = styled.p`
  margin: 0;
  color: ${Palette.white_50};
  font-size: 14px;
  line-height: 1.5;
`;

const InviteLinkRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const InviteInput = styled.input`
  flex: 1 1 auto;
  min-width: 0;
  height: 40px;
  padding: 0 12px;
  border-radius: 6px;

  background-color: ${Palette.content};
  color: ${Palette.white};
`;

const PrimaryButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  min-height: 40px;
  padding: 0 14px;
  border: 0;
  border-radius: 6px;

  background-color: ${Palette.blue};
  color: ${Palette.white};
  cursor: pointer;

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }

  svg {
    width: 16px;
  }
`;

const SecondaryButton = styled(PrimaryButton)`
  background-color: ${Palette.items};
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

export {
  Actions,
  CloseButton,
  Dialog,
  Header,
  InviteInput,
  InviteLinkRow,
  Message,
  Overlay,
  PrimaryButton,
  SecondaryButton,
  Title,
};
