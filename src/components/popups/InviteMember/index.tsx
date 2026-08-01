import { useEffect } from "react";
import { LinkIcon, XMarkIcon } from "@/components/icons/heroicons";
import {
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
} from "./style";

interface InviteMemberPopupProps {
  open: boolean;
  inviteLink: string | null;
  loading: boolean;
  onClose: () => void;
  onCopy: () => void;
  onGenerate: () => void;
}

export function InviteMemberPopup({
  open,
  inviteLink,
  loading,
  onClose,
  onCopy,
  onGenerate,
}: InviteMemberPopupProps) {
  useEffect(() => {
    if (!open) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [onClose, open]);

  if (!open) return null;

  return (
    <Overlay onMouseDown={onClose}>
      <Dialog
        role="dialog"
        aria-modal="true"
        aria-labelledby="invite-member-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <Header>
          <Title id="invite-member-title">Convidar membro</Title>
          <CloseButton type="button" onClick={onClose} aria-label="Fechar convite">
            <XMarkIcon />
          </CloseButton>
        </Header>

        <Message>
          Novos membros entram na organização exclusivamente por este link e recebem inicialmente o papel de membro.
        </Message>

        {loading ? (
          <Message>Gerando link de convite...</Message>
        ) : inviteLink ? (
          <InviteLinkRow>
            <InviteInput value={inviteLink} readOnly aria-label="Link de convite" />
            <PrimaryButton type="button" onClick={onCopy}>
              <LinkIcon />
              Copiar link
            </PrimaryButton>
          </InviteLinkRow>
        ) : (
          <Message>Não foi possível disponibilizar o link.</Message>
        )}

        <Actions>
          <SecondaryButton type="button" onClick={onClose}>Fechar</SecondaryButton>
          <PrimaryButton type="button" onClick={onGenerate} disabled={loading}>
            {inviteLink ? "Gerar outro link" : "Tentar novamente"}
          </PrimaryButton>
        </Actions>
      </Dialog>
    </Overlay>
  );
}
