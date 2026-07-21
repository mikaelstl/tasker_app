import { Avatar } from "@/components/misc/Avatar";
import { RoleBadge } from "@/maps/role-badge";
import type { OrgRole } from "@/utils/enums/OrgRole";
import { Subtitle } from "@/components/base/Subtitle";
import { Text } from "@/components/base/Text";
import { ArrowDownIcon, ArrowUpIcon, TrashIcon } from "@heroicons/react/16/solid";
import { Actions, ActionButton, Card, Identity } from "./style";

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
      <Avatar image="" size="medium" />
      <Identity>
        <Text>{name}</Text>
        <Subtitle>@{username}</Subtitle>
      </Identity>
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
