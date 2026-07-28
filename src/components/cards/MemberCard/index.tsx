import { RoleBadge } from "@/maps/role-badge";
import type { OrgRole } from "@/utils/enums/OrgRole";
import { ArrowDownIcon, ArrowUpIcon, TrashIcon } from "@heroicons/react/16/solid";
import { Actions, ActionButton, Card } from "./style";
import { User } from "@/components/misc/User";

interface MemberCardProps {
  name: string;
  username: string;
  role: OrgRole;
  disabled?: boolean;
  onPromote?: () => void;
  onDemote?: () => void;
  onRemove?: () => void;
}

export function MemberCard({
  name,
  username,
  role,
  disabled = false,
  onPromote,
  onDemote,
  onRemove,
}: MemberCardProps) {
  return (
    <Card>
      <User
        username={username}
        actorName={name}
        actorUsername={username}
      />
      {RoleBadge[role]}
      {(onPromote || onDemote || onRemove) && (
        <Actions>
          {onPromote && (
            <ActionButton
              type="button"
              onClick={onPromote}
              disabled={disabled}
              title="Promover para gestor"
              aria-label={`Promover ${name} para gestor`}
            >
              <ArrowUpIcon />
            </ActionButton>
          )}
          {onDemote && (
            <ActionButton
              type="button"
              onClick={onDemote}
              disabled={disabled}
              title="Rebaixar para membro"
              aria-label={`Rebaixar ${name} para membro`}
            >
              <ArrowDownIcon />
            </ActionButton>
          )}
          {onRemove && (
            <ActionButton
              type="button"
              onClick={onRemove}
              disabled={disabled}
              $danger
              title="Remover da organização"
              aria-label={`Remover ${name} da organização`}
            >
              <TrashIcon />
            </ActionButton>
          )}
        </Actions>
      )}
    </Card>
  );
}
