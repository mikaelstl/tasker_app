import { useOrganization } from "@/hooks/useOrganization";
import { OrgRole } from "@/utils/enums/OrgRole";
import { ManagerContent } from "./manager/ManagerContent";
import { MemberContent } from "./member/MemberContent";
import { OrganizerContent } from "./organizer/OrganizerContent";
import { Content } from "./style";
import { useAuth } from "@/hooks/useAuth";

function userProfileContent(role: OrgRole) {
  switch (role) {
    case OrgRole.OWNER: return OrganizerContent;
    case OrgRole.MANAGER: return ManagerContent;
    case OrgRole.MEMBER:
    default:
      return MemberContent;
  }
}

export function Workspace() {
  const { org } = useOrganization();
  const { user } = useAuth();
  const ContentComponent = userProfileContent(org?.role ?? OrgRole.MEMBER);

  return (
    <Content className="workspace-content">
      <ContentComponent username={user?.username ?? "usuário"} />
    </Content>
  );
}
