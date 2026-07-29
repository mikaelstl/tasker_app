import { User } from "@/components/misc/User";
import { ActionButton, Actions, Card, Infos } from "./style";
import { PlusIcon, TrashIcon } from "@heroicons/react/16/solid";

interface ProjectMemberCardProps {
  id: string;
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
  memberId,
  username,
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
          username={username}
          actorName={actorName}
          actorUsername={username}
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
