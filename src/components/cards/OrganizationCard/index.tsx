import { FolderOpenIcon, UserGroupIcon } from "@heroicons/react/20/solid";
import { RoleBadge } from "@/maps/role-badge";
import type { OrgRole } from "@/utils/enums/OrgRole";
import { formatOrgAvatar } from "@/utils/formatOrgAvatar";
import { Avatar, Container, Meta, MetaDivider, MetaItem, Title } from "./style";
import { useEffect } from "react";

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
  onClick,
}: OrganizatioCardProps) {
  useEffect(() => console.log("ROLE >>>>>> ", role), [])
  return (
    <Container type="button" onClick={onClick}>
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
