import type { AffiliationDTO } from "@/service/types/affiliation/affiliation.dto";
import { useEffect } from "react";
import { ModalCloseButton, ModalContent, ModalDescription, ModalDialog, ModalHeader, ModalOverlay, ModalTitle } from "./style";
import { CloseCircle as XMarkIcon } from "@/components/icons/solar-icons";
import { EmptyState } from "@/components/ImportantDates/style";
import { Scroller } from "@/components/misc/Scroller";
import { ProjectMemberCard } from "@/components/cards/ProjectMemberCard";

function getAffiliationName(member: AffiliationDTO) {
  return member.user?.name ?? member.userkey;
}

export interface ProjectMemberReference {
  readonly id: string;
  readonly userkey: string;
}

interface MemberModalProps {
  open: boolean;
  loading: boolean;
  projectTitle: string;
  members: AffiliationDTO[];
  projectMembers: ProjectMemberReference[];
  onClose: () => void;
  onAddMember: (memberkey: string) => void;
  onRemoveMember: (memberkey: string) => void;
}

export function AddProjectMember({
  open,
  loading,
  projectTitle,
  members,
  projectMembers,
  onClose,
  onAddMember,
  onRemoveMember,
}: MemberModalProps) {
  useEffect(() => {
    if (!open) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [onClose, open]);

  const projectMemberIds = new Set(projectMembers.map((member) => member.userkey));

  if (!open) return null;

  return (
    <ModalOverlay onMouseDown={onClose}>
      <ModalDialog
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-members-modal-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <ModalHeader>
          <ModalTitle id="project-members-modal-title">Editar membros</ModalTitle>
          <ModalCloseButton type="button" onClick={onClose} aria-label="Fechar modal">
            <XMarkIcon />
          </ModalCloseButton>
        </ModalHeader>

        <ModalDescription>
          Adicione ou remova membros da organização no projeto {projectTitle || "selecionado"}.
        </ModalDescription>

        <ModalContent>
          {loading ? (
            <EmptyState>Carregando membros da organização...</EmptyState>
          ) : members.length > 0 ? (
            <Scroller orientation="vertical" gap={16}>
              {members.map((member, index) => {
                const projectMember = projectMembers.find((item) => item.userkey === member.id);
                const isAlreadyAdded = projectMemberIds.has(member.id);

                return (
                  <ProjectMemberCard
                    id={projectMember?.id ?? `proj-member-${index}`}
                    affiliationId={member.id}
                    memberId={projectMember?.id}
                    actorName={getAffiliationName(member)}
                    isAlreadyAdded={isAlreadyAdded}
                    onAdd={onAddMember}
                    onRemove={onRemoveMember}
                  />
                );
              })}
            </Scroller>
          ) : (
            <EmptyState>Nenhum membro encontrado na organização.</EmptyState>
          )}
        </ModalContent>
      </ModalDialog>
    </ModalOverlay>
  );
}
