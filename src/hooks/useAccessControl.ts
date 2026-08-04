import { useOrganization } from "./useOrganization";
import { OrgRole } from "../utils/enums/OrgRole";

export type AccessPermission =
  | "viewProjectStats"
  | "generateProjectStatsReport"
  | "editProject"
  | "manageProjectMembers"
  | "createProject"
  | "createTask"
  | "editTask"
  | "deleteTask"
  | "createEvent"
  | "manageOrganization";

interface AccessControl {
  can: (permission: AccessPermission, ownerAffiliationId?: string) => boolean;
  canViewProjectStats: () => boolean;
  canGenerateProjectStatsReport: () => boolean;
  canEditProject: () => boolean;
  canManageProjectMembers: () => boolean;
  canCreateProject: () => boolean;
  canCreateTask: () => boolean;
  canEditTask: (ownerAffiliationId?: string) => boolean;
  canDeleteTask: (ownerAffiliationId?: string) => boolean;
  canCreateEvent: () => boolean;
  canManageOrganization: () => boolean;
}

type PermissionCheck = (ownerAffiliationId?: string) => boolean;

interface PermissionChecks {
  viewProjectStats: PermissionCheck;
  generateProjectStatsReport: PermissionCheck;
  editProject: PermissionCheck;
  manageProjectMembers: PermissionCheck;
  createProject: PermissionCheck;
  createTask: PermissionCheck;
  editTask: PermissionCheck;
  deleteTask: PermissionCheck;
  createEvent: PermissionCheck;
  manageOrganization: PermissionCheck;
}

export function useAccessControl(): AccessControl {
  const { org } = useOrganization();
  const role = org?.role;
  const affiliationId = org?.affiliationId;

  const permissionChecks: PermissionChecks = {
    viewProjectStats: () => role === OrgRole.OWNER || role === OrgRole.MANAGER,
    generateProjectStatsReport: () => role === OrgRole.OWNER || role === OrgRole.MANAGER,
    editProject: () => role === OrgRole.OWNER,
    manageProjectMembers: () => role === OrgRole.OWNER || role === OrgRole.MANAGER,
    createProject: () => role === OrgRole.OWNER,
    createTask: () => Boolean(role),
    editTask: (ownerAffiliationId?: string) => (
      role === OrgRole.OWNER
      || role === OrgRole.MANAGER
      || (role === OrgRole.MEMBER && affiliationId === ownerAffiliationId)
    ),
    deleteTask: (ownerAffiliationId?: string) => (
      role === OrgRole.OWNER
      || role === OrgRole.MANAGER
      || (role === OrgRole.MEMBER && affiliationId === ownerAffiliationId)
    ),
    createEvent: () => role === OrgRole.OWNER || role === OrgRole.MANAGER,
    manageOrganization: () => role === OrgRole.OWNER,
  };

  const can = (permission: AccessPermission, ownerAffiliationId?: string): boolean => (
    permissionChecks[permission](ownerAffiliationId)
  );

  return {
    can,
    canViewProjectStats: () => can("viewProjectStats"),
    canGenerateProjectStatsReport: () => can("generateProjectStatsReport"),
    canEditProject: () => can("editProject"),
    canManageProjectMembers: () => can("manageProjectMembers"),
    canCreateProject: () => can("createProject"),
    canCreateTask: () => can("createTask"),
    canEditTask: (ownerAffiliationId?: string) => can("editTask", ownerAffiliationId),
    canDeleteTask: (ownerAffiliationId?: string) => can("deleteTask", ownerAffiliationId),
    canCreateEvent: () => can("createEvent"),
    canManageOrganization: () => can("manageOrganization"),
  };
}
