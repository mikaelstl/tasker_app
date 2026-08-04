import { Navigate, useParams } from "react-router-dom";
import type { AccessPermission } from "../../hooks/useAccessControl";
import { useAccessControl } from "../../hooks/useAccessControl";

interface PermissionRouteProps {
  permission: AccessPermission;
  children: React.ReactNode;
}

export function PermissionRoute({ permission, children }: PermissionRouteProps) {
  const { id } = useParams();
  const { can } = useAccessControl();

  if (!can(permission)) {
    return <Navigate to={id ? `/home/project/${id}/overview` : "/home"} replace />;
  }

  return <>{children}</>;
}
