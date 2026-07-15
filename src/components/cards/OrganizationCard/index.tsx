import { FolderOpenIcon, UserGroupIcon } from "@heroicons/react/20/solid";
import { RoleBadge } from "@/maps/role-badge";
import type { OrgRole } from "@/utils/enums/OrgRole";
import { formatOrgAvatar } from "../../../utils/formatOrgAvatar";
import { Avatar, Container, Meta, MetaDivider, MetaItem, Title } from "./style";

interface OrganizatioCardProps {
  name: string;
  members: number;
  projects: number;
  role: OrgRole;
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
  const IconTypeMap = {
    members: <UserGroupIcon width={16} />,
    projects: <FolderOpenIcon width={16} />,
  };

  return (
    <MetaItem>
      {IconTypeMap[type]}
      <span>{String(value).padStart(2, "0")} {type}</span>
    </MetaItem>
  );
};

export function OrganizationCard({
  name,
  members,
  projects,
  role,
}: OrganizatioCardProps) {
  return (
    <Container>
      <Avatar>
        <span>{formatOrgAvatar(name)}</span>
      </Avatar>
      <Title>{name}</Title>
      {RoleBadge[role]}
      <Meta>
        <OrgCardLabel type="members" value={members} />
        <MetaDivider />
        <OrgCardLabel type="projects" value={projects} />
      </Meta>
    </Container>
  );
}
