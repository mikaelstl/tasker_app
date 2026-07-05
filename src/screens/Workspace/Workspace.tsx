import type { ComponentType } from "react";
import { Content } from "./style";
import { useOrganization } from "@/hooks/useOrganization";
import { OrgRole } from "@/utils/enums/OrgRole";
import { MemberContent } from "./member/MemberContent";
import { OrganizerContent } from "./organizer/OrganizerContent";
import { ManagerContent } from "./manager/ManagerContent";

const UserProfileContent: Record<OrgRole, ComponentType> = {
  [OrgRole.MEMBER]: MemberContent,
  [OrgRole.OWNER]: OrganizerContent,
  [OrgRole.MANAGER]: ManagerContent,
};

export function Workspace() {
  const { org } = useOrganization();
  const ContentComponent = UserProfileContent[org?.role ?? OrgRole.MEMBER];

  return (
    <Content className="workspace-content">
      <ContentComponent />
    </Content>
  );
}
