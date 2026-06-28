import { formatOrgAvatar } from "../../../utils/formatOrgAvatar";
import { SectionTitle } from "../../base/SectionTitle";
import { Avatar, Container } from "./style";
import { Subtitle } from "../../base/Subtitle";
import { FolderOpen, Users } from "@/components/icons";
import type { OrgRole } from "@/utils/enums/OrgRole";
import { RoleBadges } from "@/components/badge/RoleBadge";

interface OrganizatioCardProps {
  orgkey: string,
  role: OrgRole,
  name: string,
  members: number,
  projects: number,
  onSelect?: (orgkey: string, role: OrgRole) => void
}

interface OrgCardLabelProps {
  value: number,
  type: OrgCardLabelType,
}

type OrgCardLabelType = 'members' | 'projects'

type IconTypeMap ={
  [K in OrgCardLabelType]: React.ReactNode
} 

const OrgCardLabel = ({
  value,
  type
}: OrgCardLabelProps) => {
  const IconTypeMap: IconTypeMap = {
    'members': <Users />,
    'projects': <FolderOpen />,
  }

  return (
    <div>
      {IconTypeMap[type]}
      <Subtitle>{value} {`${type.charAt(0).toLocaleUpperCase()}`}</Subtitle>
    </div>
  )
}

export function OrganizationCard({
  orgkey,
  role,
  name,
  members,
  projects,
  onSelect
}: OrganizatioCardProps) {
  return (
    <Container onClick={() => onSelect?.(orgkey, role)}>
      <Avatar>
        <SectionTitle>{formatOrgAvatar(name)}</SectionTitle>
      </Avatar>
      <SectionTitle>{name}</SectionTitle>
      {RoleBadges[role]}
      <div>
        <OrgCardLabel type="members" value={members}/>
        <OrgCardLabel type="projects" value={projects}/>
      </div>
    </Container>
  )
}
