import { FolderOpenIcon, UserGroupIcon } from "@heroicons/react/20/solid";
import { RoleBadge } from "@/maps/role-badge";
import type { OrgRole } from "@/utils/enums/OrgRole";
import { formatOrgAvatar } from "@/utils/formatOrgAvatar";
import { Avatar, Container, Meta, MetaDivider, MetaItem, Title } from "./style";

interface OrganizatioCardProps {
  name: string;
  members: number;
  projects: number;
  role: OrgRole;
  onClick?: () => void;
}

interface OrgCardLabelProps {
  value: number;
  type: OrgCardLabelType;
}

type OrgCardLabelType = "members" | "projects";

const OrgCardLabel = ({
  value,
  type,
}: OrgCardLabelProps) => {
  const icon = type === "members"
    ? <UserGroupIcon width={16} />
    : <FolderOpenIcon width={16} />;
  const label = type === "members" ? "membros" : "projetos";

  return (
    <MetaItem>
      {icon}
      <span>{String(value).padStart(2, "0")} {label}</span>
    </MetaItem>
  );
};

export function OrganizationCard({
  name,
  members,
  projects,
  role,
  onClick,
}: OrganizatioCardProps) {
  return (
    <Container type="button" onClick={onClick}>
      <Avatar>
        <span>{formatOrgAvatar(name)}</span>
      </Avatar>
      <Title>{name}</Title>
      {RoleBadge(role)}
      <Meta>
        <OrgCardLabel type="members" value={members} />
        <MetaDivider />
        <OrgCardLabel type="projects" value={projects} />
      </Meta>
    </Container>
  );
}
