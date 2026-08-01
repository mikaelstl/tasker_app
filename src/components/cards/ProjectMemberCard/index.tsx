import { User } from "@/components/misc/User";
import { ActionButton, Actions, Card, Infos } from "./style";
import { PlusIcon, TrashIcon } from "@/components/icons/heroicons";

interface ProjectMemberCardProps {
  id: string;
  affiliationId: string;
  memberId?: string;
  username: string;
  actorName: string;
  isAlreadyAdded: boolean;
  disabled?: boolean;
  onRemove: (memberkey: string) => void;
  onAdd: (memberkey: string) => void;
}

export function ProjectMemberCard({
  id,
  affiliationId,
  memberId,
  actorName,
  isAlreadyAdded,
  disabled = false,
  onRemove,
  onAdd
}: ProjectMemberCardProps) {
  const handleAction = () => {
    if (isAlreadyAdded) {
      if (memberId) {
        onRemove(memberId);
      }
      return;
    }

    onAdd(id);
  };

  return (
    <Card key={id} $active={isAlreadyAdded}>
      <Infos>
        <User
          affiliationId={affiliationId}
        />
      </Infos>
      <Actions>
        <ActionButton
          type="button"
          onClick={handleAction}
          disabled={disabled || (isAlreadyAdded && !memberId)}
          $danger={isAlreadyAdded}
          $loading={disabled}
          title={isAlreadyAdded ? "Remover do projeto" : "Adicionar ao projeto"}
          aria-label={isAlreadyAdded
            ? `Remover ${actorName} do projeto`
            : `Adicionar ${actorName} ao projeto`}
        >
          {isAlreadyAdded ? (
            <TrashIcon />
          ) : (
            <PlusIcon />
          )}
        </ActionButton>
      </Actions>
    </Card>
  )
}
