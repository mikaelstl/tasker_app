import { formatOrgAvatar } from "../../../utils/formatOrgAvatar";
import { SectionTitle } from "../../base/SectionTitle";
import { Avatar, Container, SummaryLabel } from "./style";
import { Subtitle } from "../../base/Subtitle";
import { FolderOpen, Users } from "@/components/icons";
import type { OrgRole } from "@/utils/enums/OrgRole";
import { RoleBadges } from "@/components/badge/RoleBadge";
import { formatNumber } from "@/utils/formatNumber";
import Palette from "@/assets/palette";

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
    'members': <Users color={Palette.gray} />,
    'projects': <FolderOpen color={Palette.gray} />,
  }

  return (
    <SummaryLabel className="tskr-org-summary-label">
      {IconTypeMap[type]}
      <Subtitle>{formatNumber(value)} {type}</Subtitle>
    </SummaryLabel>
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
    <Container className="tskr-org-card" onClick={() => onSelect?.(orgkey, role)}>
      <Avatar className="tskr-org-avatar">
        <SectionTitle>{formatOrgAvatar(name)}</SectionTitle>
      </Avatar>
      <SectionTitle>{name}</SectionTitle>
      {RoleBadges[role]}
      <div className="tskr-org-summary-labels">
        <OrgCardLabel type="members" value={members}/>
        <OrgCardLabel type="projects" value={projects}/>
      </div>
    </Container>
  )
}
