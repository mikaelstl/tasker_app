import { formatOrgAvatar } from "../../../utils/formatOrgAvatar";
import { SectionTitle } from "../../base/SectionTitle";
import { Avatar, Container } from "./style";
import { Subtitle } from "../../base/Subtitle";
import { FolderOpen, Users } from "@/components/icons";

interface OrganizatioCardProps {
  name: string,
  members: number,
  projects: number
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
  name,
  members,
  projects
}: OrganizatioCardProps) {
  return (
    <Container>
      <Avatar>
        <SectionTitle>{formatOrgAvatar(name)}</SectionTitle>
      </Avatar>
      <SectionTitle>{name}</SectionTitle>
      <div>
        <OrgCardLabel type="members" value={members}/>
        <OrgCardLabel type="projects" value={projects}/>
      </div>
    </Container>
  )
}