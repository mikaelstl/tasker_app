import type { ComponentType } from "react";
import { useOrganization } from "@/hooks/useOrganization";
import { OrgRole } from "@/utils/enums/OrgRole";
import { MemberContent } from "./member/MemberContent";
import { OwnerContent } from "./owner/OwnerContent";
import { ManagerContent } from "./manager/ManagerContent";

const UserProfileContent: Record<OrgRole, ComponentType> = {
  [OrgRole.MEMBER]: MemberContent,
  [OrgRole.OWNER]: OwnerContent,
  [OrgRole.MANAGER]: ManagerContent,
};

export function Workspace() {
  const { org } = useOrganization();
  const ContentComponent = UserProfileContent[org?.role ?? OrgRole.MEMBER];

  return (
    <div className="size-full h-full workspace-content">
      <ContentComponent />
    </div>
  );
}
