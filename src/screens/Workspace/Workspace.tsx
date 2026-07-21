import type { ComponentType } from "react";
import { useOrganization } from "@/hooks/useOrganization";
import { OrgRole } from "@/utils/enums/OrgRole";
import { ManagerContent } from "./manager/ManagerContent";
import { MemberContent } from "./member/MemberContent";
import { OrganizerContent } from "./organizer/OrganizerContent";
import { Content } from "./style";
import { useAuth } from "@/hooks/useAuth";

interface WorkspaceContentProps {
  username: string;
}

const UserProfileContent: Record<OrgRole, ComponentType<WorkspaceContentProps>> = {
  [OrgRole.MEMBER]: MemberContent,
  [OrgRole.OWNER]: OrganizerContent,
  [OrgRole.MANAGER]: ManagerContent,
};

export function Workspace() {
  const { org } = useOrganization();
  const { user } = useAuth();
  const ContentComponent = UserProfileContent[org?.role ?? OrgRole.MEMBER];

  return (
    <Content className="workspace-content">
      <ContentComponent username={user?.username ?? "usuário"} />
    </Content>
  );
}
