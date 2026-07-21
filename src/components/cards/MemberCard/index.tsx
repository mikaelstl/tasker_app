import { Avatar } from "@/components/misc/Avatar";
import { RoleBadge } from "@/maps/role-badge";
import type { OrgRole } from "@/utils/enums/OrgRole";
import { Card, Identity } from "./style";
import { Subtitle } from "@/components/base/Subtitle";
import { Text } from "@/components/base/Text";

interface MemberCardProps {
  name: string;
  username: string;
  role: OrgRole;
}

export function MemberCard({ name, username, role }: MemberCardProps) {
  return (
    <Card>
      <Avatar image="" size="medium" />
      <Identity>
        <Text>{name}</Text>
        <Subtitle>@{username}</Subtitle>
      </Identity>
      {RoleBadge[role]}
    </Card>
  );
}
